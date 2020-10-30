<template>
	<div>
		<div class="item-module">
			<div class="module-top">
				<div class="module-top-left">
					<span></span>
					<div>猜你喜欢</div>
				</div>
				<div class="module-top-right">
					<span>更多</span>
					<van-icon name="arrow" />
				</div>
			</div>
			
			<reader-item-book
				v-for="(item, index) in bookList"
			  :key="index + 'book'"
				:bookBasic="item"
			></reader-item-book>
		</div>
		
		<div class="item-module">
			<div class="module-top">
				<div class="module-top-left">
					<span></span>
					<div>男频热榜</div>
				</div>
				<div class="module-top-right">
					<span>更多</span>
					<van-icon name="arrow" />
				</div>
			</div>
			
			<reader-item-book
				v-for="(item, index) in bookList"
			  :key="index + 'book'"
				:bookBasic="item"
			></reader-item-book>
		</div>
		
		<div class="item-module">
			<div class="module-top">
				<div class="module-top-left">
					<span></span>
					<div>女频热榜</div>
				</div>
				<div class="module-top-right">
					<span>更多</span>
					<van-icon name="arrow" />
				</div>
			</div>
			
			<reader-item-book
				v-for="(item, index) in bookList"
			  :key="index + 'book'"
				:bookBasic="item"
			></reader-item-book>
		</div>
		
		<div class="item-module">
			<div class="module-top">
				<div class="module-top-left">
					<span></span>
					<div>火热新书</div>
				</div>
				<div class="module-top-right">
					<span>更多</span>
					<van-icon name="arrow" />
				</div>
			</div>
			
			<reader-item-book
				v-for="(item, index) in bookList"
			  :key="index + 'book'"
				:bookBasic="item"
			></reader-item-book>
		</div>
		
		<div class="item-module">
			<div class="module-top">
				<div class="module-top-left">
					<span></span>
					<div>完结精选</div>
				</div>
				<div class="module-top-right">
					<span>更多</span>
					<van-icon name="arrow" />
				</div>
			</div>
			
			<reader-item-book
				v-for="(item, index) in bookList"
			  :key="index + 'book'"
				:bookBasic="item"
				@click="goDetail(item)"
			></reader-item-book>
		</div>
	</div>
</template>

<script>
import readerItemBook from '../../components/reader-item-book.vue'
export default {
	components: {
		readerItemBook
	},
	
	data () {
		return {
			bookList: [
				{
					bookName: '红楼梦',
					bookAuthor: '曹雪芹',
					bookType: '古典文学',
					bookRate: '9.1',
					bookDesc: '红楼梦大观园，贾宝玉、林黛玉、薛宝钗等人之间的故事。',
					bookImg: require('../../../../assets/img/wgsd.jpg')
				}, {
					bookName: '红楼梦',
					bookAuthor: '曹雪芹',
					bookType: '古典文学',
					bookRate: '9.1',
					bookDesc: '红楼梦大观园，贾宝玉、林黛玉、薛宝钗等人之间的故事。',
					bookImg: require('../../../../assets/img/wgsd.jpg')
				}
			]
		}
	},
	
	methods: { // "vue-router": "^3.0.6",
		goDetail(item) {
			console.log(12)
			this.$router.push({
				path: '/book/bookRelate/detail'
			})
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.item-module{
		background-color: #FFFFFF;
		padding: 10px;
		margin-top: 10px;
		.module-top{
			height: 40px;
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
				color: #7b7c7d;
				font-size: 12px;
			}
		}
	}
</style>
