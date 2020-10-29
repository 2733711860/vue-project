<template>
	<div class="book-page">
		<reader-header></reader-header>
		<router-view class="book-content"></router-view>
		<reader-footer></reader-footer>
	</div>
</template>

<script>
import readerHeader from './components/reader-header.vue'
import readerFooter from './components/reader-footer.vue'
export default {
	components: {
		readerHeader, readerFooter
	}
}
</script>

<style scoped="scoped">
	.book-page{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.book-content{
		flex: 1;
		overflow-y: auto;
		background-color: #F6F7F9;
	}
</style>
