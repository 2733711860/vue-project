<template>
	<div :class="['tool-page-top', showTool ? 'show' : '']">
		<div class="top-left">
			<van-icon name="arrow-left" @click="goBack" />
			<span>{{this.thisBook.bookName}}</span>
		</div>
		<van-icon name="bookmark-o" @click="addMark()" />
	</div>
</template>

<script>
import { Toast } from 'vant'
export default {
	data () {
		return {
			showTool: this.value
		}
	},
	
	computed: {
		thisBook () {
			return this.$store.getters.cacheBooks.find(item => item.bookId == this.$route.query.bookId)
		}
	},
	
	props: {
		value: false
	},
	
	watch: {
		showTool () {
			this.$emit('input', this.showTool)
		},
		value () {
			this.showTool = this.value
		}
	},
	
	methods: {
		goBack () {
			history.go(-1)
		},
		
		addMark () {
			Toast('敬请期待！')
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.tool-page-top{
		position: absolute;
		height: 40px;
		width: 100%;
		color: #FFFFFF;
		top: 0;
		background-color: rgba(50, 51, 52, 0.9);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
		transform: translateY(-40px);
		transition: transform 0.5s;
		.top-left{
			flex: 1;
			display: flex;
			align-items: center;
			span{
				margin-left: 5px;
			}
		}
	}
	.tool-page-top.show{
		transform: translateY(0);
	}
</style>
