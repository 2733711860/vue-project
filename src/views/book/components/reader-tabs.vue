<template>
	<van-tabs v-model="active" swipeable sticky>
	  <van-tab v-for="(item, index) in tabList" :key="index" :title="item.name">
			<slot>{{item.name}}</slot>
	  </van-tab>
	</van-tabs>
</template>

<script>
export default {
	props: {
		tabList: {
			type: Array,
			default: () => []
		},
		defaultActive: { // 默认显示第几个tab
			type: [Number, String],
			default: 0
		}
	},
	
	data () {
		return {
			active: this.defaultActive
		}
	}
}
</script>

<style>
</style>
