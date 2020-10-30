<template>
	<div>
		<reader-tabs
			:tabList="tabList">
			<router-view class="home-content"></router-view>
		</reader-tabs>
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
				{ name: '精选' },
				{ name: '榜单' },
				{ name: '分类' }
			]
		}
	}
}
</script>

<style>
</style>
