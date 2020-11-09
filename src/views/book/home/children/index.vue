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
				v-for="(item, index) in likeBooks"
			  :key="index + 'book'"
				:bookBasic="item"
				@click="goDetail(item)"
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
				v-for="(item, index) in maleHots"
			  :key="index + 'book'"
				:bookBasic="item"
				@click="goDetail(item)"
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
				v-for="(item, index) in femaleHots"
			  :key="index + 'book'"
				:bookBasic="item"
				@click="goDetail(item)"
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
				v-for="(item, index) in newBooks"
			  :key="index + 'book'"
				:bookBasic="item"
				@click="goDetail(item)"
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
				v-for="(item, index) in endBooks"
			  :key="index + 'book'"
				:bookBasic="item"
				@click="goDetail(item)"
			></reader-item-book>
		</div>
	</div>
</template>

<script>
import readerItemBook from '../../components/reader-item-book.vue'
import { getBookList } from '../../../../api/index.js'
import { getBook } from '../../../../utils/bookUtil.js'
export default {
	components: {
		readerItemBook
	},
	
	data () {
		return {
			likeBooks: [], // 猜你喜欢列表
			maleHots: [], // 男频热榜
			femaleHots: [], // 女频热榜
			newBooks: [], // 新书榜
			endBooks: [], // 完结榜
		}
	},
	
	mounted () {
		this.getYouLike() // 猜你喜欢
		this.getMailHots() // 男频热榜
		this.getFemaleHots() // 女频热榜
		this.getNewBooks() // 新书榜
		this.getEndBooks() // 完结榜
	},
	
	methods: {
		getYouLike () { // 猜你喜欢，默认起点月票榜
			getBookList({
				page: '1',
				pageSize: '4',
				bookType: '1'
			}).then(res => {
				this.likeBooks = res.list.slice(0, 3)
			})
		},
		
		getMailHots () { // 男频热榜，默认追书最热榜 Top100
			getBookList({
				page: '1',
				pageSize: '4',
				bookType: '2'
			}).then(res => {
				this.maleHots = res.list.slice(0, 3)
			})
		},
		
		getFemaleHots () { // 女频热榜，默认追书最热榜 Top100
			getBookList({
				page: '1',
				pageSize: '4',
				bookType: '3'
			}).then(res => {
				this.femaleHots = res.list.slice(0, 3)
			})
		},
		
		getNewBooks () { // 新书榜，默认新书榜
			getBookList({
				page: '1',
				pageSize: '4',
				bookType: '4'
			}).then(res => {
				this.newBooks = res.list.slice(0, 3)
			})
		},
		
		getEndBooks () { // 完结榜，默认完结榜
			getBookList({
				page: '1',
				pageSize: '4',
				bookType: '5'
			}).then(res => {
				this.endBooks = res.list.slice(0, 3)
			})
		},
		
		goDetail(item) {
			this.$store.dispatch('setCacheBooks', item) // 保存书籍信息
			
			this.$router.push({
				path: '/book/bookRelate/detail',
				query: {
					bookId: item.bookId
				}
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
				color: #999999;
				font-size: 12px;
			}
		}
	}
</style>
