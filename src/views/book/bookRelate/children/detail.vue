<template>
	<div class="detail-page" @scroll="onScrollChange($event)">
		<reader-header-two :navBarStyle="navBarStyle" :title="title"></reader-header-two>
		
		<div class="detail-top">
			<img :src="bookDetail.bookImg" />
			<div class="detail-top-content">
				<div class="book-title">{{bookDetail.bookName}}</div>
				<div class="book-author">作者：{{bookDetail.bookAuthor}}</div>
				<div class="book-type">类型：{{bookDetail.bookType}}</div>
				<div class="book-type">{{bookDetail.wordCount}}  |  {{bookDetail.isSerial ? '连载' : '完结'}}</div>
			</div>
		</div>
		
		<div class="like-div">
			<div class="module-top">
				<div class="module-top-left">
					<span></span>
					<div>故事简介</div>
				</div>
				<div class="module-top-right" @click="showAll = !showAll">
					<van-icon :name="showAll ? 'arrow-up' : 'arrow-down'" />
				</div>
			</div>
			<div class="detail-brief">
				<div :class="{'moreClass' : !showAll}">{{bookDetail.bookDesc}}</div>
			</div>
		</div>
		
		<div class="chapter-msg">
			<span class="chapter-title" @click="getChapter">查看目录</span>
			<span class="newest">
				<span class="chapter-name">最新：{{bookDetail.lastChapter}}</span>
				<span class="chapter-btn">{{bookDetail.updatedTime}}<van-icon name="arrow" /></span>
			</span>
		</div>
		
		<div class="chapter-msg-two">
			<div class="book-rate">
				<div>读者留存率</div>
				<div class="book-rate-value">{{bookDetail.retentionRatio}}%</div>
			</div>
			<div class="book-rate">
				<div>评分（{{bookDetail.bookRate ? bookDetail.bookRate.tip : ''}}）</div>
				<div class="book-rate-value">{{bookDetail.bookRate ? bookDetail.bookRate.score : ''}}</div>
			</div>
		</div>
		
		<div class="like-div">
			<div class="module-top">
				<div class="module-top-left">
					<span></span>
					<div>热门书评</div>
				</div>
				<div class="module-top-right">
					<van-icon name="edit" />
					<span>写书评</span>
				</div>
			</div>
			
			<div class="book-comment">
				<reader-comment></reader-comment>
				<reader-comment></reader-comment>
				<div class="book-comment-btn">全部书评22条</div>
			</div>
		</div>
		
		<div class="like-div">
			<div class="module-top">
				<div class="module-top-left">
					<span></span>
					<div>作者的其他作品</div>
				</div>
				<div class="module-top-right">
					<span>更多</span>
					<van-icon name="arrow" />
				</div>
			</div>
			
			<div class="book-list">
				<reader-item-book-two class="item-book" :bookDetail="bookDetail"></reader-item-book-two>
				<reader-item-book-two class="item-book" :bookDetail="bookDetail"></reader-item-book-two>
				<reader-item-book-two class="item-book" :bookDetail="bookDetail"></reader-item-book-two>
			</div>
		</div>
		
		<div class="like-div">
			<div class="module-top">
				<div class="module-top-left">
					<span></span>
					<div>猜你喜欢</div>
				</div>
				<div class="module-top-right">
					<span>换一换</span>
				</div>
			</div>
			
			<div class="book-list">
				<reader-item-book-two class="item-book" :bookDetail="bookDetail"></reader-item-book-two>
				<reader-item-book-two class="item-book" :bookDetail="bookDetail"></reader-item-book-two>
				<reader-item-book-two class="item-book" :bookDetail="bookDetail"></reader-item-book-two>
				<reader-item-book-two class="item-book" :bookDetail="bookDetail"></reader-item-book-two>
			</div>
		</div>
		
		<div class="detail-bottm">
			<div class="btn-one">加入书架</div>
			<div class="btn-two">开始阅读</div>
		</div>
	</div>
</template>

<script>
import readerHeaderTwo from '../../components/reader-header-two.vue'
import readerItemBookTwo from '../../components/reader-item-book-two.vue'
import readerComment from '../../components/reader-comment.vue'
import { getBookDetail, getBookSource } from '../../../../api/index.js'
import { getBook } from '../../../../utils/bookUtil.js'
import moment from 'moment'
const ANCHOR_SCROLL_TOP = 160
export default {
	components: {
		readerHeaderTwo, readerItemBookTwo, readerComment
	},
	
	data () {
		return {
			navBarStyle: { // 顶部样式
				backgroundColor: '',
				position: 'fixed',
				color: '#ffffff'
			},
			scrollTopValue: -1, // 滚动距顶部的距离
			title: '书籍信息',
			showAll: false, // 简介是否显示全部
			bookDetail: {}
		}
	},
	
	created () {
		this.getDetail()
	},
	
	methods: {
		getDetail () { // 获取书籍详情
			getBookDetail(this.$route.query.bookId).then(res => {
				let bookMsg = getBook(res)
				bookMsg.updatedTime = moment(bookMsg.updatedTime).format('YYYY年MM月DD日 HH:mm:ss')
				this.getBookSources(bookMsg)
			})
		},
		
		getBookSources (bookMsg) { // 获取小说源
			getBookSource(this.$route.query.bookId).then(res => {
				bookMsg.bookId = res[0]._id
				this.bookDetail = bookMsg
				this.$store.dispatch('setBookSource', {bookSourceId: bookMsg.bookId, bookSourceName: bookMsg.bookName})
			})
		},
		
		getChapter () { // 获取目录
			this.$store.dispatch('setIsShowMenu', true)
		},
		
		onScrollChange ($event) { // 监听页面滚动
			this.scrollTopValue = $event.target.scrollTop
			let opacity = this.scrollTopValue / ANCHOR_SCROLL_TOP
			if (opacity <= 1) 
				this.navBarStyle.backgroundColor = "rgba(255, 255, 255, " + opacity + ")",
				this.navBarStyle.color = "#ffffff",
				this.title = '书籍信息';
			else 
				this.navBarStyle.backgroundColor = "rgba(255, 255, 255, 1)",
				this.navBarStyle.color = "inherit",
				this.title = this.bookDetail.bookName;
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.detail-page{
		height: 100vh;
		overflow: scroll;
		padding-bottom: 50px;
		.detail-bottm{
			width: 100%;
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: space-around;
			position: fixed;
			bottom: 0;
			border-top: 1px solid #EFEDEF;
			background-color: #FFFFFF;
			div{
				height: 30px;
				line-height: 30px;
				width: 150px;
				text-align: center;
				border-radius: 30px;
				font-size: 14px;
			}
			.btn-one{
				color: #F48E4E;
				background-color: #FFDEC6;
			}
			.btn-two{
				color: #FFEAE1;
				background-color: #F24747;
			}
		}
	}
	.detail-top{
		width: 100%;
		background: url(../../../../assets/img/14.jpg) no-repeat;
		background-size: 100% 100%;
		display: flex;
		padding: 50px 10px 10px;
		color: #FFFFFF;
		img{
			width: 100px;
			height: 120px;
			margin-right: 20px;
			border-radius: 5px;
		}
		.detail-top-content{
			display: flex;
			flex-direction: column;
			justify-content: center;
			.book-title{
				font-weight: bold;
			}
			.book-author{
				font-size: 14px;
				margin-top: 15px;
				line-height: 20px;
			}
			.book-type{
				font-size: 14px;
				line-height: 20px;
				margin-top: 5px;
			}
		}
	}
	.detail-brief{
		font-size: 12px;
		line-height: 18px;
		text-indent: 28px;
		padding: 10px;
		position: relative;
		background-color: #FFFFFF;
		.more-btn{
			position: absolute;
			width: 100px;
			text-align: right;
			bottom: 10px;
			right: 10px;
			background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
			color: #1989fa;
		}
	}
	.moreClass{
		word-break: break-all;
		display: -webkit-box; /**对象作为伸缩盒子模型展示**/
		-webkit-box-orient: vertical; /**设置或检索伸缩盒子对象的子元素的排列方式**/
		-webkit-line-clamp: 3; /**显示的行数**/
		overflow: hidden; /**隐藏超出的内容**/
	}
	
	.chapter-msg-two{
		font-size: 12px;
		margin-top: 10px;
		padding: 10px;
		background-color: #FFFFFF;
		display: flex;
		.book-rate:first-child{
			border-right: 1px solid #b3b3b3;
		}
		.book-rate{
			width: 50%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.book-rate-value{
				font-size: 15px;
				margin-top: 7px;
			}
		}
	}
	
	.chapter-msg{
		font-size: 12px;
		height: 30px;
		line-height: 30px;
		margin-top: 10px;
		background-color: #FFFFFF;
		display: flex;
		.chapter-title{
			color: #1989fa;
			padding: 0 10px;
		}
		.newest{
			flex: 1;
			display: flex;
			justify-content: space-between;
			.chapter-name{
				flex: 1;
				display:inline-block;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.chapter-btn{
				display: flex;
				align-items: center;
				padding-right: 10px;
			}
		}
	}
	
	.like-div{
		margin-top: 10px;
		background-color: #FFFFFF;
		.book-list{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 10px;
			.item-book{
				margin: 5px 0;
			}
		}
		.module-top{
			height: 40px;
			padding: 0 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #EFEDEF;
			.module-top-left, .module-top-right{
				display: flex;
				align-items: center;
			}
			.module-top-left{
				span{
					display: inline-block;
					width: 4px;
					height: 14px;
					margin-right: 5px;
					border-radius: 1px;
					background-color: #1989fa;
				}
				div{
					font-weight: 550;
				}
			}
			.module-top-right{
				color: #1989fa;
				font-size: 12px;
			}
		}
		
		.book-comment{
			.book-comment-btn{
				height: 40px;
				line-height: 40px;
				font-size: 14px;
				text-align: center;
				color: #1989fa;
			}
		}
	}
</style>
