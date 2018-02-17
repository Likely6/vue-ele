<template>
	<div class="star" :class="starType">
		<span v-for="(item,index) in itemClasses" :class="[item,'star-item']"></span>
	</div>
</template>

<script>
	const LENGTH = 5,
				ClS_ON = "on",
				CLS_HALF = "half",
				CLS_OFF = "off";

	export default{
		props:{
			size:{
				type:Number
			},
			score:{
				type: Number,
				//undefin时用默认值
				default: 0
			}
		},
		data(){
			return{

			}
		},
		computed: {
			starType(){
				return 'star-' + this.size
			},
			itemClasses() {
				let result = []
				//将3.2,4.7这样的分数转换为3.0,4.5
				let score = Math.floor(this.score*2) / 2
				//看是否为整数判断是否为全星
				let hasHalf = score % 1 != 0
				let manyStar = Math.floor(score)
				for(let i=0;i<manyStar;i++){
					result.push(ClS_ON)
				}
				if(hasHalf){
					result.push(CLS_HALF)
				}
				while (result.length < LENGTH){
					result.push(CLS_OFF)
				}
				return result
			}
		}
	}
</script>

<style scoped lang="scss">
	.star{
		.star-item{
			display: inline-block;
			background: no-repeat;
			&:nth-last-child(1){
				margin-right: 0!important;
			}
		}
		&.star-24{
			.star-item{
				width: 10px;
				height: 10px;
				margin-right: 3px;
				background-size: 10px 10px;
				&.on{
					@include bg-image("star24_on");
				}
				&.half{
					@include bg-image("star24_half");
				}
				&.off{
					@include bg-image("star24_off");
				}
			}
		}
		&.star-36{
			.star-item{
				width: 15px;
				height: 15px;
				margin-right: 6px;
				background-size: 15px 15px;
				&.on{
					@include bg-image("star36_on");
				}
				&.half{
					@include bg-image("star36_half");
				}
				&.off{
					@include bg-image("star36_off");
				}
			}
		}
		&.star-48{
			.star-item{
				width: 20px;
				height: 20px;
				margin-right: 22px;
				background-size: 20px 20px;
				&.on{
					@include bg-image("star48_on");
				}
				&.half{
					@include bg-image("star48_half");
				}
				&.off{
					@include bg-image("star48_off");
				}
			}
		}
	}
</style>