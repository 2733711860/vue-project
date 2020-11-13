<template>
	<div class="center-page">
		<van-notice-bar
			class="center-notice"
			background="#ecf9ff"
			color="#1989fa"
			left-icon="volume-o"
		  wrapable
		  :scrollable="false"
		  text="没找到书籍？试试自主爬取书籍吧!"
		/>
		
		<van-cell is-link title="爬取网站" :value="chooseNet.name" @click="showAction = true" />
		
		<van-field
		  v-model="link"
		  center
		  clearable
		  label="书籍链接"
		  placeholder="请输入书籍链接"
		>
		  <template #button>
		    <van-button size="small" type="default">获取</van-button>
		  </template>
		</van-field>
		
		<van-action-sheet
		  v-model="showAction"
		  :actions="actions"
		  cancel-text="取消"
		  description="选择要爬取书籍的网站"
		  close-on-click-action
			@select="onSelect"
		/>
	</div>
</template>

<script>
export default {
	data () {
		return {
			link: '', // 爬取的书籍url
			showAction: false,
			chooseNet: {}, // 选择的网站
			actions: [ // 支持的网站列表
				{ name: '皮皮小说网', value: '' }, 
				{ name: '风雨小说网（移动端）', value: '' }, 
				{ name: '风雨小说网（PC端）', value: '' },
				{ name: '520小说网', value: '' },  // 女频小说
				{ name: '88小说网', value: '' },
				{ name: '新笔下文学', value: '' }
			]
		}
	},
	
	methods: {
		onSelect (item) {
			this.chooseNet = item
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.center-page{
		padding: 10px 0;
		.center-notice{
			margin-bottom: 10px;
		}
	}
</style>
