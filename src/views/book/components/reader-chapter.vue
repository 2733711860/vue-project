<template>
	<div class="al-page">
		<div class="chapter-page">
			<div class="chapter-top">
				<div class="book-name">{{bookSource.bookSourceName}}</div>
				<div class="chapter-reserve"><van-icon name="exchange" /></div>
			</div>
			<div class="chapter-div">
				<div class="item-chapter" v-for="(item, index) in chapters" :key="index + 'chapter'" @click="getContent(item)">{{item.title}}</div>
			</div>
		</div>
		
		<div class="right-page">
			<van-icon name="close" class="nav-close" @click="closeChapter" />
		</div>
	</div>
</template>

<script>
import { getChapters, getChapterContent } from '../../../api/index.js'
import { Book } from '../../../utils/bookUtil.js'
export default {
	data () {
		return {
			chapters: [],
			bookContent: {
			  title: '',
			  content: ''
			},
		}
	},
	
	computed: {
		bookSource () {
			return this.$store.getters.bookSource
		}
	},
	
	watch: {
		bookSource () {
			this.getChapter()
		},
		chapters () {
			console.log('章节变了')
		}
	},
	
	mounted () {
	},
	
	methods: {
		getChapter () { // 获取章节
			getChapters(this.bookSource.bookSourceId).then(res => {
				this.chapters = res.chapters
			})
		},
		
		getContent (item) { // 获取每章内容
			getChapterContent(encodeURIComponent(item.link)).then(res => {
				if (res.ok) {
				  if (res.chapter.cpContent) {
				    this.bookContent = this._nromalBook(res.chapter.title, res.chapter.cpContent)
						console.log(this.bookContent)
				  } else {
				    this.bookContent = this._nromalBook(res.chapter.title, res.chapter.body)
				  }
				}
			})
		},
		
		_nromalBook (title, content) { // 构建book类
			let _this = this
		  let book = new Book({
		    title: title,
		    content: _this.bookChaptersBody(content)
		  });
		  return book
		},
		
		bookChaptersBody (books) { // 字符串解析
		  if (books) {
		    let c = /[\u4E00-\u9FA5\uF900-\uFA2D]/g
		    let _book = JSON.stringify(books).replace(/^"|"$/g, '')
		    this.loading = false
		    if (c.test(_book)) {
		      _book = '<p>' + _book.replace(/\s*/g, '').replace(/\\n/g, '</p><p>') + '</p>'
		      return _book
		    } else {
		      return 'vip章节，请购买或者换源阅读！' // 换源功能已经实现
		    }
		  }
		},
		
		closeChapter () { // 关闭章节弹窗
			this.$store.commit('SET_ISSHOWMENU', false)
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.al-page{
		height: 100%;
		display: flex;
		.chapter-page{
			width: 50%;
			height: 100%;
			border-right: 1px solid #ebebeb;
			display: flex;
			flex-direction: column;
			.chapter-top{
				height: 60px;
				padding: 0 10px;
				border-bottom: 1px solid #ebebeb;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.book-name{
					font-weight: bold;
				}
				.chapter-reserve{
					color: #999999;
					display: flex;align-items: center;
				}
			}
			.chapter-div{
				flex: 1;
				overflow-y: auto;
				.item-chapter{
					font-size: 12px;
					color: #999999;
					height: 40px;
					line-height: 40px;
					padding: 0 10px;
					border-bottom: 1px solid #ebebeb;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
			}
		}
		.right-page{
			.nav-close{
				font-size: 20px;
				color: #999999;
				margin: 20px;
			}
		}
	}
</style>
