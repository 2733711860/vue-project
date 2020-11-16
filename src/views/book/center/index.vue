<template>
	<div class="center-page">
		<van-notice-bar
			class="center-notice"
			background="#ecf9ff"
			color="#1989fa"
			left-icon="volume-o"
		  wrapable
		  :scrollable="false"
		  text="没找到书籍？试试自主爬取书籍吧!"
		/>
		
		<van-cell is-link title="爬取网站" :value="chooseNet.name" @click="showAction = true" />
		
		<van-field
		  v-model="link"
		  center
		  clearable
		  label="书籍链接"
		  placeholder="请输入书籍链接"
		>
		  <template #button>
		    <van-button size="small" type="default" @click="getCrawlBook">获取</van-button>
		  </template>
		</van-field>
		
		<reader-item-book
			class="crawl-book"
			v-for="(item, index) in crawlBooks"
			:key="index"
		  :bookBasic="item"
		></reader-item-book>
		
		<van-action-sheet
		  v-model="showAction"
		  :actions="actions"
		  cancel-text="取消"
		  description="选择要爬取书籍的网站"
		  close-on-click-action
			@select="onSelect"
		/>
	</div>
</template>

<script>
import { getBookDetail } from '../../../api/index.js'
import readerItemBook from '../components/reader-item-book.vue'
import { Toast } from 'vant'
export default {
	components: {
		readerItemBook
	},
	
	data () {
		return {
			link: '', // 爬取的书籍url
			showAction: false,
			chooseNet: { name: '风雨小说网（移动端）', value: '' }, // 选择的网站
			actions: [ // 支持的网站列表
				{ name: '皮皮小说网', value: 'pp' }, 
				{ name: '风雨小说网（移动端）', value: '' }, 
				{ name: '风雨小说网（PC端）', value: 'fy' },
				{ name: '520小说网', value: 'wel' },  // 女频小说
				{ name: '88小说网', value: 'bb' },
				{ name: '新笔下文学', value: 'xbx' }
			],
			crawlBooks: [] // 手动爬取的小说
		}
	},
	
	methods: {
		onSelect (item) {
			this.chooseNet = item
			this.$store.dispatch('setApiSource', item.value)
		},
		
		getCrawlBook () {
			this.$loading.show()
			if (this.chooseNet.value == '2') { // 风雨小说网移动端
				getBookDetail({
					links: ['https://m.44pq.cc/book_67352/']
				}).then(res => {
					this.$loading.hide()
					this.crawlBooks = res.data.books
					if (this.crawlBooks.length == 0) {
						Toast('未找到相关书籍')
					}
				})
			}
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.center-page{
		padding: 10px 0;
		.center-notice{
			margin-bottom: 10px;
		}
		.crawl-book{
			background-color: #FFFFFF;
			margin-top: 10px;
			padding: 10px;
		}
	}
</style>
