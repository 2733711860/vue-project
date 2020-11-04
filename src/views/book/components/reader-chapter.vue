<template>
	<div class="al-page">
		<div class="chapter-page">
			<div class="chapter-top">
				<div class="book-name">{{bookSource.bookSourceName}}</div>
				<div class="chapter-reserve"><van-icon name="exchange" /></div>
			</div>
			<div class="chapter-div">
				<div class="item-chapter" v-for="(item, index) in chapters" :key="index + 'chapter'" @click="getContent(item, index)">{{item.title}}</div>
			</div>
		</div>
		
		<div class="right-page">
			<van-icon name="close" class="nav-close" @click="closeChapter" />
		</div>
	</div>
</template>

<script>
import { getChapters } from '../../../api/index.js'
export default {
	data () {
		return {
			chapters: [],
		}
	},
	
	computed: {
		cacheBooks () {
			return this.$store.getters.cacheBooks
		},
		bookSource () {
			return this.$store.getters.bookSource
		}
	},
	
	watch: {
		bookSource () {
			this.getChapter()
		}
	},
	
	mounted () {
	},
	
	methods: {
		getChapter () { // 获取章节
			let thisBook = this.cacheBooks.find(item => item.bookSourceId == this.bookSource.bookSourceId && item.chapters && item.chapters.length > 0)
			if (thisBook) {
				this.chapters = thisBook.chapters
			} else {
				getChapters(this.bookSource.bookSourceId).then(res => {
					this.chapters = res.chapters
					this.$store.dispatch('setCacheBooks', { // 保存目录
						chapters: this.chapters,
						bookSourceId: this.bookSource.bookSourceId
					})
				})
			}
		},
		
		getContent (item, index) { // 获取每章内容
			this.$store.dispatch('setCacheBooks', { // 保存当前章节索引
				chapters: this.chapters,
				currentChapterIndex: index
			})
			this.closeChapter()
			this.$router.push({
				path: '/book/bookRelate/bookTxt',
				query: {
					bookSourceId: this.bookSource.bookSourceId
				}
			})
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
