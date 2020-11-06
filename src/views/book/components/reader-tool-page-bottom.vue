<template>
	<div :class="['tool-page-bottom', showTool ? 'show' : '']">
		<div class="slider-div">
			<span @click="nextChapters">上一章</span>
			<van-slider
				class="slider"
				v-model="currentPaging"
				min='0'
				:max="resultPaging"
				@change="onChange"
			>
				<template #button>
					<div class="custom-button"></div>
				</template>
			</van-slider>
			<span @click="prevChapters">下一章</span>
		</div>
		
		<div class="tool-btn-div">
			<div class="item-tool">
				<i class="iconfont mulu icon1"></i>
				<div>目录</div>
			</div>
			<div class="item-tool">
				<i class="iconfont yejian icon"></i>
				<div>夜间</div>
			</div>
			<div class="item-tool">
				<i class="iconfont download icon"></i>
				<div>缓存</div>
			</div>
			<div class="item-tool">
				<i class="iconfont huan icon"></i>
				<div>换源</div>
			</div>
			<div class="item-tool" @click="openSetting">
				<i class="iconfont ziti icon"></i>
				<div>设置</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			showTool: this.value
		}
	},
	
	computed: {
		thisBook () {
			let cacheBooks = this.$store.getters.cacheBooks
			return cacheBooks.find(item => item.bookSourceId == this.$route.query.bookSourceId)
		}
	},
	
	props: {
		value: false,
		resultPaging: { // 本章总页数
			type: [Number, String],
			default: 0
		},
		currentPaging: { // 当前页
			type: [Number, String],
			default: 0
		}
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
		onChange (val) { // 切换页数
			console.log('敬请期待')
		},
		
		prevChapters () { // 下一章
			this.$emit('prevChapter', true)
		},
		
		nextChapters () { // 上一章
			this.$emit('nextChapter')
		},
		
		openSetting () { // 设置
			this.$emit('openSetting')
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.tool-page-bottom{
		position: absolute;
		height: 100px;
		width: 100%;
		color: #FFFFFF;
		bottom: 0;
		background-color: rgba(50, 51, 52, 0.9);
		padding: 15px;
		transform: translateY(100px);
		transition: transform 0.5s;
		display: flex;
		flex-direction: column;
		font-size: 12px;
		.slider-div{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.slider{
				flex: 1;
				margin: 0 20px;
				.custom-button{
					width: 10px;
					height: 10px;
					background-color: #FFFFFF;
					border-radius: 100%;
				}
			}
		}
		
		.tool-btn-div{
			flex: 1;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			.item-tool{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				div{
					margin-top: 10px;
				}
				.icon{
					font-size: 20px;
				}
				.icon1{
					font-size: 18px;
				}
			}
		}
	}
	.tool-page-bottom.show{
		transform: translateY(0);
	}
</style>
