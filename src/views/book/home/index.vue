<template>
	<div>
		<!-- <reader-tabs
			:tabList="tabList"> -->
			<router-view class="home-content"></router-view>
		<!-- </reader-tabs> -->
	</div>
</template>

<script>
import readerTabs from '../components/reader-tabs.vue'
export default {
	components: {
		readerTabs
	},
	
	data () {
		return {
			tabList: [
				{ name: '精选', path: '/book/home/index' },
				{ name: '榜单', path: '/book/home/rank' },
				{ name: '分类', path: '/book/home/classify' }
			]
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.home-content{
		height: 100%;
		position: relative;
	}
</style>
