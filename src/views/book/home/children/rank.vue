<template>
	<div class="rank-page">
		<div class="rank-side">
			<div class="rank-title">男频</div>
			<van-sidebar v-model="maleActivity">
			  <van-sidebar-item v-for="(item, index) in maleRankTypeList" :key="index + 'male'" :title="item.text" @click="onChange(item)" />
			</van-sidebar>
			
			<div class="rank-title">女频</div>
			<van-sidebar v-model="femaleActivity">
			  <van-sidebar-item v-for="(item, index) in femaleRankTypeList" :key="index + 'female'" :title="item.text" @click="onChange(item)" />
			</van-sidebar>
		</div>
		
		<div class="rank-content">
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
import { getBookList } from '../../../../api/index.js'
import { maleRankTypeObj, femaleRankTypeObj } from '../../../../utils/bookUtil.js'
export default {
	components: {
		readerItemBook
	},
	
	data () {
		return {
			maleActivity: 0,
			femaleActivity: -1,
			bookList: [],
			maleRankTypeList: [], // 男频排行分类列表
			femaleRankTypeList: [], // 女频排行分类列表
		}
	},
	
	watch: {
		maleActivity () {
			if (this.maleActivity >= 0) this.femaleActivity = -1;
		},
		femaleActivity () {
			if (this.femaleActivity >= 0) this.maleActivity = -1;
		}
	},
	
	created () {
		this.maleRankTypeList = Object.keys(maleRankTypeObj).map(el => {
			return {
				text: maleRankTypeObj[el],
				value: el
			}
		})
		this.femaleRankTypeList = Object.keys(femaleRankTypeObj).map(el => {
			return {
				text: femaleRankTypeObj[el],
				value: el
			}
		})
	},
	
	mounted () {
		this.getBook()
	},
	
	methods: {
		getBook () {
			getBookList({
				page: '1',
				pageSize: '4',
				bookType: '1'
			}).then(res => {
				this.bookList = res.list
			})
		},
		
		goDetail (item) {
			this.$store.dispatch('setCacheBooks', item) // 保存书籍信息
			
			this.$router.push({
				path: '/book/bookRelate/detail',
				query: {
					bookId: item.bookId
				}
			})
		},
		
		onChange (item) {
			console.log(item)
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.rank-page{
		height: 100%;
		overflow-y: hidden;
		position: relative;
		display: flex;
		justify-content: space-between;
		.rank-side{
			position: absolute;
			width: 85px;
			overflow-y: auto;
			height: 100%;
			.rank-title{
				color: #999999;
				padding: 15px;
				font-size: 14px;
			}
		}
		.rank-content{
			position: absolute;
			overflow-y: auto;
			right: 0;
			width: calc(100vw - 85px);
			background-color: #FFFFFF;
			height: 100%;
			padding: 0 10px;
		}
	}
</style>

<style lang="less">
	.rank-page{
		.rank-side{
			.van-sidebar-item{
				background-color: #F6F7F9;
			}
			.van-sidebar-item--select{
				background-color: #FFFFFF;
			}
		}
	}
</style>

