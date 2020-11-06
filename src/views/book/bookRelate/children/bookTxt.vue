<template>
	<div class="read-page">
		<div ref="wrapper" class="content-page" @click="setRead($event)">
			<!-- 整页 -->
			<div class="book-content" ref="content" v-if="pagingPattern===0">
			  <h1 class="book-title">{{bookContent.title}}</h1>
			  <div class="book-inner" v-html="bookContent.content"></div>
				<div class="book-button">
					<div @click="prevChapter">上一章</div>
					<div @click="nextChapter">下一章</div>
				</div>
			</div>
			
			<!-- 平滑 -->
			<v-touch 
				v-on:panleft="panleft($event)" 
				v-on:panright="panright($event)" 
				v-on:panend="panend($event)"
				class="read-content" 
				v-if="pagingPattern==1 || pagingPattern==2 || pagingPattern==3"
			>
				<p class="book-title1" style="padding: 10px">{{bookContent.title}}</p>
				<div class="read-article" style="padding: 0 10px;">
				  <section class="read-section" :style="styleObject">
				    <div class="read-section-inner" :style="{columns: clWidth-20+'px', columnGap: 10+'px'}" ref="bookInner" id="bookInner">
				      <h1 class="book-title">{{bookContent.title}}</h1>
				      <div class="book-inner" v-html="bookContent.content"></div>
				    </div>
				  </section>
				</div>
				<p class="article-page">{{currentPaging + '/' + resultPaging}}</p>
			</v-touch>
		</div>
		
		<reader-tool-page-top v-model="showTool"></reader-tool-page-top>
		<reader-tool-page-bottom
			v-model="showTool"
			:resultPaging="resultPaging"
			:currentPaging="currentPaging"
			@prevChapter="prevChapter"
			@nextChapter="nextChapter"
			@openSetting="openSetting"></reader-tool-page-bottom>
		<reader-setting v-model="showSetting"></reader-setting>
	</div>
</template>

<script>
// 护眼：rgb(200, 232, 200)；默认：rgb(238, 230, 221)；rgba(50,51,52,0.9)
import { _nromalBook } from '../../../../utils/bookUtil.js'
import { getChapterContent } from '../../../../api/index.js'
import { Toast, Dialog } from 'vant'
import readerToolPageTop from '../../components/reader-tool-page-top.vue'
import readerToolPageBottom from '../../components/reader-tool-page-bottom.vue'
import readerSetting from '../../components/reader-setting.vue'
export default {
	components: {
		readerToolPageTop, readerToolPageBottom, readerSetting
	},
	
	data () {
		return {
			bookContent: {
			  title: '',
			  content: ''
			},
			pagingPattern: 3, // 翻页模式 0:整页   1:平滑   2:点滑   3:无   4:仿真
			styleObject: '',
			clWidth: document.documentElement.clientWidth || document.body.clientWidth,
			currentPaging: 1, // 当前页
			resultPaging: 1, // 总页数
			offsetX: 0,
			bookSourceLinks: [], // 书籍link列表
			currentIndex: 0, // 当前章节索引
			isPrevChapter: false, // 是否上一章
			showTool: false, // 是否显示工具栏
			showSetting: false
		}
	},
	
	computed: {
		cacheBooks () {
			return this.$store.getters.cacheBooks
		}
	},
	
	mounted () {
		this.getChapter()
	},
	
	watch: {
		bookContent () {
			this.$refs.wrapper.scrollTop = 0
			if (this.pagingPattern == 1 || this.pagingPattern == 2 || this.pagingPattern == 3) {
				this.$nextTick(function () {
				  let scrollW = this.$refs.bookInner.scrollWidth
				  let clientW = this.$refs.bookInner.clientWidth
				  this.resultPaging = Math.floor(scrollW / clientW)
					if (this.isPrevChapter) { // 上一章，默认最后一页
						this.isPrevChapter = false
						this.currentPaging = this.resultPaging
						this.styleObject = {
							transform: 'translateX(' + (-(this.currentPaging - 1) * (this.clWidth - 10)) + 'px' + ')'
						}
					} else {
						this.currentPaging = 1
						this.styleObject = {
							transform: 'translateX(' + '0px' + ')'
						}
					}
				})
			}
		},
		currentIndex () {
			this.$store.dispatch('setCacheBooks', { // 保存章节信息
				bookSourceId: this.$route.query.bookSourceId,
				currentChapterIndex: this.currentIndex
			})
		}
	},
	
	methods: {
		getChapter () { // 获取章节
			let thisBook = this.cacheBooks.find(item => item.bookSourceId == this.$route.query.bookSourceId)
			thisBook.chapters.forEach(item => {
				this.bookSourceLinks.push(item.link)
			})
			this.currentIndex = thisBook.currentChapterIndex
			this.getContent()
		},
		
		getContent () { // 获取每章内容
			let thisBook = this.cacheBooks.find(item => item.bookSourceId == this.$route.query.bookSourceId)
			let hasThisChapter = thisBook.hasReadChapterList.find(item => item.chapterIndex == this.currentIndex)
			if (hasThisChapter) { // 如果本章已经缓存过了
				this.bookContent = _nromalBook(hasThisChapter.chapterName, hasThisChapter.chapterContent)
			} else {
				this.$loading.show()
				getChapterContent(encodeURIComponent(this.bookSourceLinks[this.currentIndex])).then(res => {
					this.$loading.hide()
					if (res.ok) {
					  if (res.chapter.cpContent) {
					    this.bookContent = _nromalBook(res.chapter.title, res.chapter.cpContent)
					  } else {
					    this.bookContent = _nromalBook(res.chapter.title, res.chapter.body)
					  }
						this.$store.dispatch('setCacheBooks', { // 保存章节信息
							bookSourceId: this.$route.query.bookSourceId,
							currentChapterIndex: this.currentIndex,
							newReadChapter: {
								chapterIndex: this.currentIndex,
								chapterName: res.chapter.title,
								chapterContent: res.chapter.cpContent ? res.chapter.cpContent : res.chapter.body
							}
						})
					} else {
						Toast(res.desc)
					}
				})
			}
		},
		
		nextChapter () { // 下一章
			if (this.currentIndex == this.bookSourceLinks.length -1) { // 最后一章
				Toast('最后一章最后一页')
			} else {
				this.currentIndex++
				this.getContent()
			}
		},
		
		prevChapter (isTool) { // 上一章
			if (this.currentIndex == 0) { // 第一章
				Toast('第一章第一页')
			} else {
				this.currentIndex--
				if (this.pagingPattern == 1 || this.pagingPattern == 2 || this.pagingPattern == 3) {
					let thisBook = this.cacheBooks.find(item => item.bookSourceId == this.$route.query.bookSourceId)
					let hasThisChapter = thisBook.hasReadChapterList.find(item => item.chapterIndex == this.currentIndex)
					if (hasThisChapter) { // 如果上一章已经缓存过，则显示上一章最后一页
						this.isPrevChapter = isTool ? false : true
					}
				}
				this.getContent()
			}
		},
		
		setRead (e) { // 点击操作
			if (this.pagingPattern == 2 || this.pagingPattern == 3) { // 点滑/无
				let currentX = e.pageX
				let offsetX = this.clWidth / 3
				if (currentX <= offsetX) { // 用户点击左边1/3，上一章
					if (this.currentPaging != 1) { // 不是第一页
						this.currentPaging--
						if (this.pagingPattern == 2) {
							this.styleObject = {
								transform: 'translateX(' + ((1 - this.currentPaging) * (this.clWidth - 10)) + 'px' + ')',
								transitionDuration: '0.5s'
							}
						} else if (this.pagingPattern == 3) {
							this.styleObject = {
								transform: 'translateX(' + ((1 - this.currentPaging) * (this.clWidth - 10)) + 'px' + ')'
							}
						}
					} else {
						this.prevChapter()
					}
				} else if (offsetX <= currentX && currentX <= offsetX * 2) { // 用户点击中间1/3，弹出选择框
					this.showTool = !this.showTool
				} else { // 用户点击右边1/3，下一章
					if (this.resultPaging == this.currentPaging) { // 最后一页
						this.nextChapter()
					} else { // 不是最后一页，则平滑下一页
						this.currentPaging++
						if (this.pagingPattern == 2) {
							this.styleObject = {
								transform: 'translateX(' + ((1 - this.currentPaging) * (this.clWidth - 10)) + 'px' + ')',
								transitionDuration: '0.5s'
							}
						} else if (this.pagingPattern == 3) {
							this.styleObject = {
								transform: 'translateX(' + ((1 - this.currentPaging) * (this.clWidth - 10)) + 'px' + ')'
							}
						}
					}
				}
			}
		},
		
		panleft (e) { // 左滑
			if (this.pagingPattern === 1) {
				this.offsetX = e.deltaX
				if (this.resultPaging > this.currentPaging) { // 不是最后一页
					if (Math.abs(this.offsetX) < this.clWidth) {
						this.styleObject = {
							transform: 'translateX(' + (this.offsetX + (1 - this.currentPaging) * (this.clWidth - 10)) + 'px' + ')'
						}
					}
				}
			}
		},
		
		panend (e) { // 滑动结束
			if (this.pagingPattern === 1) {
				if (this.offsetX < 0) { // 左滑
					if (this.resultPaging == this.currentPaging) { // 最后一页
						this.nextChapter()
					} else {
						if (Math.abs(this.offsetX) > this.clWidth/4) { // 左滑距离小于四分之一，则不翻页
							this.currentPaging++
						}
						this.styleObject = {
							transform: 'translateX(' + ((1 - this.currentPaging) * (this.clWidth - 10)) + 'px' + ')',
							transitionDuration: '0.5s'
						}
					}
				} else { // 右滑
					if (this.currentPaging != 1) { // 不是第一页
						if (Math.abs(this.offsetX) > this.clWidth/4) { // 右滑距离小于四分之一，则翻页
							this.currentPaging--
						}
						this.styleObject = {
							transform: 'translateX(' + ((1 - this.currentPaging) * (this.clWidth - 10)) + 'px' + ')',
							transitionDuration: '0.5s'
						}
					} else {
						this.prevChapter()
					}
				}
				this.offsetX = 0
			}
		},
		
		panright (e) { // 右滑
			if (this.pagingPattern == 1) {
				if (this.currentPaging > 1) {
					this.offsetX = e.deltaX
					if (Math.abs(this.offsetX) < this.clWidth) {
						this.styleObject = {
							transform: 'translateX(' + (this.offsetX - (this.currentPaging - 1) * (this.clWidth - 10)) + 'px' + ')'
						}
					}
				}
			}
		},
		
		openSetting () { // 打开设置
			this.showTool = false
			this.showSetting = true
		}
	},
	
	beforeRouteLeave (to, from, next) {
		let thisBook = this.cacheBooks.find(item => item.bookSourceId == this.$route.query.bookSourceId)
		if (thisBook.isOnShelf == '0') { // 还没有加入书架，则离开页面时删除缓存书籍
			Dialog.confirm({
			  title: '标题',
			  message: '将本书加入书架？',
			}).then(() => {
				this.$store.dispatch('setCacheBooks', {
					bookSourceId: this.$route.query.bookSourceId,
					isOnShelf: '1'
				})
				next()
			}).catch(() => {
				this.$store.dispatch('deleteCasheBooks', {
					bookSourceId: this.$route.query.bookSourceId
				})
				next()
			})
		} else {
			next()
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.read-page{
		height: 100%;
		position: relative;
		background-color: rgba(238, 230, 221, 1);
		filter: brightness(1); // 设置亮度 // $(".div").css('filter','brightness('+temp+')');
	}
	.content-page{
		overflow-y: auto;
		height: 100%;
	}
	.book-content{
		padding: 30px 10px 50px 10px;
		.book-inner{
			text-align: justify;
			line-height: 30px;
			text-indent: 2em;
		}
		.book-title{
			line-height: 30px;
			font-weight: 400;
			margin-bottom: 25px;
		}
		.book-button{
			display: flex;
			justify-content: space-around;
			margin-top: 30px;
			div{
				font-size: 13px;
				padding: 7px 20px;
				border-radius: 5px;
				border: 1px solid #999999;
			}
		}
	}
	    
	.read-content{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		.book-title1{
			line-height: 20px;
			font-size: 12px;
			color: #585858;
		}
		.read-article{
			position: absolute;
			overflow: hidden;
			text-align: justify;
			bottom: 20px;
			top: 50px;
			.read-section{
				height: 100%;
				.read-section-inner{
					overflow: visible;
					height: 100%;
					.book-inner{
						line-height: 30px; /*no*/
						text-indent: 2em;
					}
				}
				.book-title{
					line-height: 30px;
					font-weight: 400;
					margin-bottom: 25px;
				}
			}
		}
		.article-page{
			color: #585858;
			font-size: 12px;
			position: absolute;
			left: 10px;
			bottom: 10px ;
		}
	}
	    
	   
	    
</style>
