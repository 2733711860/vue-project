<template>
	<div>
		<keep-alive v-if="$route.meta.keepAlive">
			<router-view class="book-relate"></router-view>
		</keep-alive>
		<router-view class="book-relate" v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
</script>

<style scoped="scoped" lang="less">
	.book-relate{
		height: 100%;
	}
</style>
