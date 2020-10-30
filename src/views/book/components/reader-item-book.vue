<template>
	<div class="module-book" @click="goPage">
		<img class="module-book-pic" :src="bookBasic.bookImg" />
		<div class="module-book-content">
			<h1>{{bookBasic.bookName}}</h1>
			<div>{{bookBasic.bookDesc}}</div>
			<div class="module-book-content-bot">
				<div>作者：{{bookBasic.bookAuthor}}</div>
				<div class="book-tag">
					<span>{{bookBasic.bookType}}</span>
					<span class="boot-tag-rate">{{bookBasic.bookRate}}分</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		bookBasic: {
			type: Object,
			default: () => {}
		}
	},
	
	methods: {
		goPage () {
			this.$emit('click')
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.module-book{
		display: flex;
		padding: 10px 0;
		.module-book-pic{
			width: 80px;
			height: 100px;
			border-radius: 3px;
		}
		.module-book-content{
			padding-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			h1{
				color: #363636;
				margin-bottom: 13px;
			}
			div{
				color: #949494;
				font-size: 12px;
				line-height: 15px;
			}
			.module-book-content-bot{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 10px;
				.book-tag{
					span{
						display: inline-block;
						padding: 3px 5px;
						margin-right: 8px;
						border-radius: 10px;
						background-color: #F0F0F2;
					}
					.boot-tag-rate{
						color: #F4AFB2;
						background-color: #FCECEC;
					}
				}
			}
		}
	}
</style>
