<template>
	<div :class="['tool-page-menu', showMenu ? 'show' : '']">
		<div class="menu-div">
			<div class="menu-top">
				<div>官居一品</div>
				<i class="iconfont paixu"></i>
			</div>
			
			<div class="menu-content">
				<div class="item-chapter">
					<i class="iconfont dian"></i>
					<div>第一张第一张第一张第一张第一张第一张第一张第一张第一张</div>
				</div>
			</div>
		</div>
		
		<div class="menu-bg" @click="closeMenu"></div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			showMenu: this.value,
		}
	},
	
	props: {
		value: false
	},
	
	watch: {
		showMenu () {
			this.$emit('input', this.showMenu)
		},
		value () {
			this.showMenu = this.value
		}
	},
	
	methods: {
		closeMenu () { // 关闭目录
			this.showMenu = false
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.tool-page-menu{
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		transform: translateX(-100%);
		transition: transform 0.5s;
		.menu-div{
			position: absolute;
			z-index: 11;
			width: 70%;
			height: 100%;
			background-color: #FFFFFF;
			box-shadow: 2px 0 10px 4px #d0d0d0;
			background-color: rgba(224, 232, 229, 1);
			display: flex;
			flex-direction: column;
			.menu-top{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20px 10px;
				border-bottom: 1px solid #d5d5d5;
			}
			.menu-content{
				flex: 1;
				overflow-y: auto;
				.item-chapter{
					height: 40px;
					line-height: 40px;
					padding: 0 10px;
					border-bottom: 1px solid #d5d5d5;
					display: flex;
					.dian{
						color: #d5d5d5; // #07C160
						margin-right: 5px;
					}
					div{
						flex: 1;
						font-size: 12px;
						color: #999999;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}
			}
		}
		.menu-bg{
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			z-index: 10;
		}
	}
	.tool-page-menu.show{
		transform: translateX(0);
	}
</style>
