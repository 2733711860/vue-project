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
		
		<div class="detail-brief">{{bookDetail.bookDesc}}</div>
	</div>
</template>

<script>
import readerHeaderTwo from '../../components/reader-header-two.vue'
const ANCHOR_SCROLL_TOP = 160
export default {
	components: {
		readerHeaderTwo
	},
	
	data () {
		return {
			navBarStyle: { // 顶部样式
				backgroundColor: '',
				position: 'fixed',
				color: '#ffffff'
			},
			scrollTopValue: -1, // 滚动距顶部的距离
			title: '',
			
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
				this.title = '';
			else 
				this.navBarStyle.color = "inherit",
				this.title = this.bookDetail.bookName;
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.detail-page{
		overflow: scroll;
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
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
