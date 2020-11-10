<template>
	<div class="book-page">
		<reader-header v-if="$route.meta.showTop"></reader-header>
		<router-view class="book-content"></router-view>
		<reader-footer v-if="$route.meta.showTop"></reader-footer>
	</div>
</template>

<script>
import readerHeader from './components/reader-header.vue'
import readerFooter from './components/reader-footer.vue'
export default {
	components: {
		readerHeader, readerFooter
	},
	mounted() {
	}
}
</script>

<style scoped="scoped" lang="less">
	.book-page{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.book-content{
		flex: 1;
		overflow-y: auto;
		background-color: #F6F7F9;
		position: relative;
	}
</style>
