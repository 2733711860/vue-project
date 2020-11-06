<template>
	<div :class="['tool-page-setting', showS ? 'show' : '']">
		<div class="brights">
			<i class="iconfont bright"></i>
			<van-slider
				class="slider"
				v-model="currentBright"
				min='0'
				max='100'
				@change="onChange"
			>
				<template #button>
					<div class="custom-button"></div>
				</template>
			</van-slider>
			<span>默认</span>
		</div>
		
		<div class="fontSet">
			<div class="font-btn">
				<i class="iconfont ziti"></i>
				<span>-</span>
			</div>
			<span class="font-value">66</span>
			<div class="font-btn">
				<i class="iconfont ziti"></i>
				<span>+</span>
			</div>
			<span class="defau">默认</span>
		</div>
		
		<div class="column-cls">
			<div>紧凑</div>
			<div>舒适</div>
			<div>松散</div>
			<div>默认</div>
		</div>
		
		<div class="column-cls">
			<div>整页</div>
			<div>平移</div>
			<div>点移</div>
			<div>仿真</div>
			<div>默认</div>
		</div>
		
		<div class="set-bg">
			<div class="bg-div">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			showS: this.value,
			currentBright: 10
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
	},
	
	methods: {
		onChange () {
			
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.tool-page-setting{
		position: absolute;
		height: 270px;
		width: 100%;
		color: #FFFFFF;
		bottom: 0;
		background-color: rgba(50, 51, 52, 0.9);
		padding: 10px;
		transform: translateY(270px);
		transition: transform 0.5s;
		font-size: 12px;
		.brights{
			display: flex;
			align-items: center;
			margin-bottom: 20px;
			.slider{
				flex: 1;
				margin: 0 10px;
				.custom-button{
					width: 10px;
					height: 10px;
					background-color: #FFFFFF;
					border-radius: 100%;
				}
			}
			span{
				display: inline-block;
				padding: 7px 10px;
				border: 1px solid #999999;
				border-radius: 5px;
			}
		}
		.fontSet{
			display: flex;
			align-items: center;
			margin-bottom: 20px;
			.font-btn{
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 7px 10px;
				border: 1px solid #999999;
				border-radius: 5px;
			}
			.font-value{
				padding: 0 20px;
			}
			.defau{
				display: inline-block;
				padding: 7px 10px;
				border: 1px solid #999999;
				border-radius: 5px;
				margin-left: 10px;
			}
		}
		.column-cls{
			display: flex;
			align-items: center;
			margin-bottom: 20px;
			div{
				flex: 1;
				text-align: center;
				padding: 7px 10px;
				border: 1px solid #999999;
				border-radius: 5px;
			}
			div:not(:last-child){
				margin-right: 15px;
			}
		}
		.set-bg{
			width: 100%;
			height: 40px;
			position: relative;
			overflow-x: auto;
			.bg-div{
				position: absolute;
				width: auto;
				overflow-x: auto;
				display: flex;
				div{
					width: 45px;
					height: 40px;
					background-color: #D2E0E6;
				}
				div:not(:last-child){
					margin-right: 20px;
				}
			}
		}
	}
	.tool-page-setting.show{
		transform: translateY(0);
	}
</style>
