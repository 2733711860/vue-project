<template>
	<div class="shelf-page">
		<van-empty description="书架空空如也~~~" v-if="shelfBooks.length == 0" />
		<reader-shelf-item-book
			class="book-shelf"
			v-for="(item, index) in shelfBooks"
			:key="index + 'shelf'"
			:bookBasic="item"
			@click="goRead(item)"></reader-shelf-item-book>
	</div>
</template>

<script>
import readerShelfItemBook from '../components/reader-shelf-item-book.vue'
export default {
	components: {
		readerShelfItemBook
	},
	
	computed: {
		shelfBooks () {
			return this.$store.getters.shelfBooks
		}
	},
	
	mounted () {
	},
	
	methods: {
		goRead (item) {
			this.$router.push({
				path: '/book/bookRelate/bookTxt',
				query: {
					bookId: item.bookId
				}
			})
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.shelf-page{
		padding-top: 10px;
	}
	.book-shelf{
		background-color: #FFFFFF;
	}
</style>
