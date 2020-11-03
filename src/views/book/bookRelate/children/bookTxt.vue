<template>
	<div ref="wrapper">
		<div class="book-content" ref="content" v-if="pagingPattern===0">
		  <h1 class="book-title">{{bookContent.title}}</h1>
		  <div class="book-inner" v-html="bookContent.content"></div>
		</div>
		
		<div class="read-content" v-if="pagingPattern===1">
		  <p class="book-title1" style="padding: 10px">{{bookContent.title}}</p>
		  <div class="read-article">
		    <section class="read-section" :style="styleObject">
		      <div class="read-section-inner" :style="{columns: clWidth-20+'px', columnGap: 10+'px'}" ref="bookInner" id="bookInner">
		        <h1 class="book-title">{{bookContent.title}}</h1>
		        <div class="book-inner" v-html="bookContent.content"></div>
		      </div>
		    </section>
		
		  </div>
		  <p class="article-page">{{currentPaging + '/' + resultPaging}}</p>
		</div>
	</div>
</template>

<script>
// 护眼：rgb(200, 232, 200)；默认：rgb(238, 230, 221)；rgba(50,51,52,0.9)
import { _nromalBook } from '../../../../utils/bookUtil.js'
import { getChapterContent, getChapters } from '../../../../api/index.js'
export default {
	data () {
		return {
			bookContent: {
			  title: '',
			  content: ''
			},
			pagingPattern: 0, // 翻页模式
			styleObject: '',
			clWidth: document.documentElement.clientWidth || document.body.clientWidth,
			currentPaging: 1,
			resultPaging: 1,
		}
	},
	
	mounted () {
		this.getChapter()
		this.getContent()
	},
	
	methods: {
		getChapter () { // 获取章节
			getChapters(this.$route.query.bookSourceId).then(res => {
				// this.chapters = res.chapters
			})
		},
		
		getContent () { // 获取每章内容
			getChapterContent(encodeURIComponent(this.$route.query.link)).then(res => {
				if (res.ok) {
				  if (res.chapter.cpContent) {
				    this.bookContent = _nromalBook(res.chapter.title, res.chapter.cpContent)
						console.log(this.bookContent)
				  } else {
				    this.bookContent = _nromalBook(res.chapter.title, res.chapter.body)
				  }
				}
			})
		},
	}
}
</script>

<style scoped="scoped" lang="less">
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
			padding: 0 10px; 
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
