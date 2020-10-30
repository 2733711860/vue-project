<template>
	<div class="book-head" :style="navBarStyle">
		<van-icon name="arrow-left" />
		<div class="head-middle">
			<slot>
				<h6>{{title}}</h6>
			</slot>
		</div>
		<van-icon name="share-o" />
	</div>
</template>

<script>
export default {
	props: {
		navBarStyle: {
			type: Object,
			default: function () {
				return {
					background: '#ffffff',
					color: 'inherit'
				}
			}
		},
		title: {
			type: String,
			default: ''
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.book-head{
		width: 100%;
		height: 40px;
		padding: 0 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 10;
	}
</style>
