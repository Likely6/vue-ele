<template>
	<div class="carControl">
		<transition name="removeFade">
			<div class="decrease" v-show="food.count>0" @click.stop="decreaseNum()">
				<span class="icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="count">
			<h6 v-show="food.count>0">{{food.count}}</h6>
		</div>
		<div class="add" @click.stop="addNum($event)">
			<span class="icon-add_circle"></span>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			food: {

			}
		},
		methods:{
			addNum(event){
				if(!this.food.count){
					this.$set(this.food,'count',1)
				}else{
					this.food.count++
				}
				//发出请求（相当于自定义的事件）
				this.$emit("getAddDom",event.target)
			},
			decreaseNum(){
				if(this.food.count>=1){
					this.food.count--
				}
			}
		},
		mounted(){
			// console.log(this.food)
		}
	}
</script>

<style scoped lang="scss">
	.carControl{
		display: flex;
		.decrease{
			padding: 6px 0 6px 6px;
			span{
				display: block;
				font-size: 24px;
				line-height: 24px;
				color: #00a0dc;
			}
		}
		.count{
			width: 24px;
			padding: 6px 0;
			h6{
				text-align: center;
				font-size: 10px;
				color: rgb(147,153,159);
				line-height: 24px;
			}
		}
		.add{
			padding: 6px 6px 6px 0;
			span{
				display: block;
				font-size: 24px;
				line-height: 24px;
				color: #00a0dc;
			}
		}
	}

	.removeFade-enter{
		transform: translateX(48px);
		span{
			opacity: 0;
			transform: rotate(360deg);
		}
	}
	.removeFade-leave-to{
		transform: translateX(48px);
		span{
			opacity: 0;
			transform: rotate(360deg);
		}
	}
	.removeFade-enter-active,.removeFade-leave-active{
		transition: all 0.5s;
		span{
			transition: all 0.5s;
		}
	}

</style>