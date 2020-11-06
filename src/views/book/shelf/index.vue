<template>
	<div>
		<reader-shelf-item-book
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
					bookSourceId: item.bookSourceId
				}
			})
		}
	}
}
</script>

<style>
</style>
