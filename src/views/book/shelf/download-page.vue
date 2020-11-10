<template>
	<div class="download-page">
		<reader-header-two title="缓存管理"></reader-header-two>
		
		<div class="download-list">
			<div class="item-book" v-for="(item, index) in cacheBooks" :key="index + 'cache'">
				<div class="item-top">
					<div>{{item.bookName}}（{{item.cacheStartOrigin + 1}} - {{item.chaptersCount}}章）</div>
					<div>{{item.cacheStart + 1}}/{{item.cacheEnd + 1}}</div>
				</div>
				<van-slider v-model="value" active-color="#ee0a24">
					<template #button>
						<div class="custom-button"></div>
					</template>
				</van-slider>
			</div>
		</div>
	</div>
</template>

<script>
import readerHeaderTwo from '../components/reader-header-two.vue'
export default {
	components: {
		readerHeaderTwo
	},
	
	data () {
		return {
			value: 10
		}
	},
	
	computed: {
		cacheBooks () { // 有缓存记录的书
			return this.$store.getters.cacheBooks.filter(item => item.cacheStartOrigin != -1)
		}
	},
	
	mounted() {
		console.log(this.cacheBooks)
	}
}
</script>

<style scoped="scoped" lang="less">
	.download-page{
		display: flex;
		height: 100%;
		flex-direction: column;
		.download-list{
			margin-top: 10px;
			overflow-y: auto;
			.item-book{
				padding: 20px;
				margin-bottom: 10px;
				background-color: #FFFFFF;
				.item-top{
					display: flex;
					justify-content: space-between;
					margin-bottom: 20px;
					color: #333333;
					div:last-child{
						font-size: 12px;
						color: #999;
					}
				}
				.custom-button{
					width: 8px;
					height: 8px;
					border-radius: 100%;
					background-color: #ee0a24;
				}
			}
		}
	}
</style>
