<template>
	<div class="search-page">
		<reader-search @getSearch="getSearch"></reader-search>
		<div class="search-badge" v-if="searchResult.length == 0">
			<reader-hot-search
			  :hotList="hotList"
				title="搜索热词"
				@searchHot="getSearch"></reader-hot-search>
				
			<reader-hot-search
			  :hotList="historyList"
				title="搜索历史"
				@deleteHistory="deleteHistory"
				@searchHot="getSearch"></reader-hot-search>
		</div>
		
		<div class="search-result" v-else>
			<reader-item-book
				v-for="(item, index) in searchResult"
				:key="index"
			  :bookBasic="item"
				@click="goDetail(item)"
			></reader-item-book>
		</div>
	</div>
</template>

<script>
import readerSearch from '../components/reader-search.vue'
import readerHotSearch from '../components/reader-hot-search.vue'
import readerItemBook from '../components/reader-item-book.vue'
import { search, getHotWords } from '../../../api/index.js'
import { getBook } from '../../../utils/bookUtil.js'
export default {
	components: {
		readerSearch, readerHotSearch, readerItemBook
	},
	
	data () {
		return {
			hotList: [], // 热搜列表
			searchResult: [], // 搜索结果
		}
	},
	
	computed: {
		historyList () { // 搜索历史
			return this.$store.getters.historyList
		}
	},
	
	mounted () {
		this.getHotWord() // 获取热搜列表
	},
	
	methods: {
		getHotWord () { // 获取热搜列表
			getHotWords().then(res => {
				this.hotList = res.searchHotWords.slice(0, 16)
			})
		},
		
		getSearch (value) { // 搜索接口
			this.$store.dispatch('setHistory', value) // 保存搜索历史
			search(value == '' ? '圣墟' : value).then(res => {
				let books = [
					{
						"_id":"5816b415b06d1d32157790b1",
						"title":"圣墟",
						"author":"辰东",
						"cover":"/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F1228859_f4dc55cf31b14ea1a28bb4dacd79f463.jpg%2F",
						"shortIntro":"在破败中崛起，在寂灭中复苏。\n沧海成尘，雷电枯竭，那一缕幽雾又一次临近大地，世间的枷锁被打开了，一个全新的世界就此揭开神秘的一角……",
						"majorCate":"玄幻",
						"minorCate":"东方玄幻",
						"site":"zhuishuvip",
						"allowMonthly":false,
						"banned":0,
						"latelyFollower":994,
						"retentionRatio":
						"10.82"
					}
				]
				this.searchResult = books.map(getBook)
			})
		},
		
		deleteHistory () { // 删除搜索历史
			this.$store.dispatch('setHistory', {deleteType: true}) // 保存搜索历史
		},
		
		goDetail(item) {
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
	.search-page{
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: #FFFFFF;
		.search-badge{
			flex: 1;
			overflow-y: auto;
		}
		.search-result{
			flex: 1;
			overflow-y: auto;
			padding: 10px;
		}
	}
</style>
