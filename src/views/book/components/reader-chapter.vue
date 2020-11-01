<template>
	<div class="chapter-page">
		<div class="chapter-top"></div>
		<div class="chapter-div">
			<div class="item-chapter" v-for="(item, index) in chapters" :key="index + 'chapter'" @click="getContent(item)">{{item.title}}</div>
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
		bookSourceId () {
			return this.$store.getters.bookSourceId
		}
	},
	
	watch: {
		bookSourceId () {
			this.getChapter()
		}
	},
	
	mounted () {
		this.getChapter()
	},
	
	methods: {
		getChapter () {
			getChapters(this.bookSourceId).then(res => {
				this.chapters = res.chapters
			})
		},
		
		getContent (item) {
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
		
		//字符串解析
		bookChaptersBody(books){
		  if (books) {
		    let c = /[\u4E00-\u9FA5\uF900-\uFA2D]/g;
		    let _book = JSON.stringify(books).replace(/^"|"$/g, '');
		    this.loading = false;
		    if (c.test(_book)) {
		      _book = '<p>' + _book.replace(/\s*/g, '').replace(/\\n/g, '</p><p>') + '</p>';
		      return _book
		    } else {
		      return 'vip章节，请购买或者换源阅读！' //换源功能已经实现
		    }
		  }
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.chapter-page{
		width: 50%;
		height: 100%;
		border-right: 1px solid #ebebeb;
		display: flex;
		flex-direction: column;
		.chapter-top{
			font-weight: bold;
			height: 60px;
			padding: 0 10px;
			border-bottom: 1px solid #ebebeb;
		}
		.chapter-div{
			flex: 1;
			overflow-y: auto;
			.item-chapter{
				font-size: 12px;
				color: #999;
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
</style>
