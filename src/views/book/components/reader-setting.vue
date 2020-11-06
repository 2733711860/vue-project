<template>
	<div :class="['tool-page-setting', showS ? 'show' : '']">
	</div>
</template>

<script>
export default {
	data () {
		return {
			showS: this.value
		}
	},
	
	props: {
		value: false
	},
	
	watch: {
		value () {
			this.showS = this.value
		},
		showS () {
			this.$emit('input', this.showS)
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.tool-page-setting{
		position: absolute;
		height: 300px;
		width: 100%;
		color: #FFFFFF;
		bottom: 0;
		background-color: rgba(50, 51, 52, 0.9);
		padding: 10px;
		transform: translateY(300px);
		transition: transform 0.5s;
	}
	.tool-page-setting.show{
		transform: translateY(0);
	}
</style>
