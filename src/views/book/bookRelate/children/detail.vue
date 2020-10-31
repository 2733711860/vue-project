<template>
	<div class="detail-page" @scroll="onScrollChange($event)">
		<reader-header-two :navBarStyle="navBarStyle" :title="title"></reader-header-two>
		
		<div class="detail-top">
			<img :src="bookDetail.bookImg" />
			<div class="detail-top-content">
				<div class="book-title">{{bookDetail.bookName}}</div>
				<div class="book-author">作者：{{bookDetail.bookAuthor}}</div>
				<div class="book-type">类型：{{bookDetail.bookType}}</div>
				<div class="book-type">224.22万字  |  完结</div>
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
			<span class="chapter-title">查看目录</span>
			<span class="newest">
				<span class="chapter-name">最新：第三千九百一十三章  终局终局终局终局</span>
				<span class="chapter-btn">已完结<van-icon name="arrow" /></span>
			</span>
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
			
			bookDetail: {
				bookName: '红楼梦',
				bookAuthor: '曹雪芹',
				bookType: '古典文学',
				bookRate: '9.1',
				bookDesc: '小说以贾、史、王、薛四大家族的兴衰为背景，以富贵公子贾宝玉为视角，以贾宝玉与林黛玉、薛宝钗的爱情婚姻悲剧为主线，描绘了一批举止见识出于须眉之上的闺阁佳人的人生百态，展现了真正的人性美和悲剧美，可以说是一部从各个角度展现女性美以及中国古代社会世态百相的史诗性著作。',
				bookImg: require('../../../../assets/img/wgsd.jpg')
			}
		}
	},
	
	methods: {
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
		color: #ffffff;
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
			border-bottom: 1px solid #EDEDED;
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
					color: #000000;
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
