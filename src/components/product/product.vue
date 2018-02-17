<template>
	<div class="product">
		<div class="product_menu">
			<ul class="menu_panel">
				<li class="menu_item " v-for="(item,index) in product" :class="{'menu_item_active':currentIndex==index}" @click="selectArea(index)">
					<div class="menu_item_panel border-1px">
						<span v-if="item.type!=-1" :class="classMap[item.type]"></span>
						{{item.name}}
					</div>
				</li>
			</ul>
		</div>
		<div class="product_food" ref="productFood">
			<ul class="food_one">
				<li class="food_one_item food_one_hook" v-for="(bigClass,index) in product">
					<h1 class="one_title" v-text="bigClass.name"></h1>
					<ul class="food_two">
						<li class="food_two_item border-1px" v-for="(smallClass,index) in bigClass.foods" @click="selectedFood(smallClass)">
							<div class="two_img">
								<img :src="smallClass.image" :alt="smallClass.name">
							</div>
							<div class="two_content">
								<div class="content_title">
									<h2 v-text="smallClass.name"></h2>
								</div>
								<div class="content_desc" v-if="smallClass.description">
									<h3 v-text="smallClass.description"></h3>
								</div>
								<div class="content_info">
									<h3 v-text="'月售'+smallClass.sellCount+'份'"></h3>
									<h3 v-text="'好评率'+smallClass.rating+'%'"></h3>
								</div>
								<div class="content_price">
									<span class="newPrice" v-text="smallClass.price"></span>
									<span class="oldPrice" v-text="smallClass.oldPrice" v-if="smallClass.oldPrice"></span>
									<div class="btn">
										<!-- 触发事件执行emitShopCar函数 -->
										<v-carControl :food="smallClass" @getAddDom="emitShopCar"></v-carControl>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<v-shopCar :sellerData="seller" :selectFood="selectFood" ref="shopCar"></v-shopCar>
		<v-food :foodData="foodData" ref="showFood" @foodDispatch="emitShopCar"></v-food>
	</div>
</template>

<script>
	import shopCar from "../shopCar/shopCar"
	import carControl from "../carControl/carControl"
	import food from "../food/food"

	export default{
		props:{
			seller:{
				
			}
		},
		data() {
			return {
				product:[],
				classMap:[
					"decrease",
					"discount",
					"special",
					"invoice",
					"guarantee"
				],
				areaHeight:[0],
				currentScroll: 0,
				foodData:{}
			}
		},
		components:{
			"v-shopCar": shopCar,
			"v-carControl": carControl,
			"v-food": food
		},
		computed: {
			currentIndex(){
				for(let i=0;i<this.areaHeight.length;i++){
					let height1 = this.areaHeight[i]-2
					let height2 = this.areaHeight[i+1]-2
					if(!height2 || (this.currentScroll >= height1 && this.currentScroll < height2)){
						return i
					}
				}
				return 0
			},
			selectFood(){
				let foods = []
				this.product.forEach(function(product){
					product.foods.forEach(function(food){
						if(food.count){
							foods.push(food)
						}
					})
				})
				return foods
			}
		},
		methods:{
			computedArea(_this){
				let height = 0
				let foodArray = _this.$refs.productFood.getElementsByClassName('food_one_hook')
				for(let i=0;i<foodArray.length;i++){
					height += foodArray[i].clientHeight
					_this.areaHeight.push(height)
				}	

				let foodDom = _this.$refs.productFood
				foodDom.onscroll = function(){
					_this.currentScroll = foodDom.scrollTop
				}	
			},
			selectArea(index){
				let foodArray = this.$refs.productFood
				$(foodArray).stop(true).animate({"scrollTop":this.areaHeight[index]})
			},
			//调用shopCar里方法用的
			emitShopCar(target) {
				/*
					第一次点击+按钮时会同时触发两个动画,
					所以这里用$nextTick让-按钮动画与小球动画异步
				*/ 
				this.$nextTick(function(){
					this.$refs.shopCar.drop(target)
				})
			},
			selectedFood(food){
				this.foodData = food
				this.$refs.showFood.show()
			}
		},
		mounted() {
			let _this = this
			this.$http.get("api/goods")
				.then(function(res){
					console.log(res)
					let json = res.data
					if(json.error == _this.GValue.RES_OK){
						_this.product = json.data

						_this.$nextTick(function(){
							let myScroll = new IScroll('.product_menu');
							_this.$options.methods.computedArea(_this)
						})
					}else{
						alert("数据请求错误！")
					}
				})
				.catch(function(err){

				})
		}
	}
</script>

<style scoped lang="scss">
	.product{
		display: flex;
		position: absolute;
		top: 174px;
		left: 0;
		bottom: 46px;
		width: 100%;
		overflow: hidden;
		.product_menu{
			flex:0 0 80px;
			background: #f3f5f7;
			// overflow: auto;
			// -webkit-overflow-scrolling: touch;
			.menu_panel{
				.menu_item{
					padding: 0 12px;
					width: 100%;
					height: 54px;
					display: table;
					.menu_item_panel{
						display: table-cell;
						vertical-align: middle;
						width: 100%;
						font-size: 12px;
						line-height: 14px;
						@include border-1px(rgba(7,17,27,0.1),bottom);
						span{
							display: inline-block;
							width: 12px;
							height: 12px;
							vertical-align: top;
							background-size: 12px 12px;
							background-repeat: no-repeat;
							margin-right: 0px;
							@extend %support_icon_3;
						}
					}
					&.menu_item_active{
						position: relative;
						top: -1px;
						background-color: #fff;
						.menu_item_panel{
							font-weight: 700;
							@include border-none;
						}
					}
					&:nth-last-child(1) {
						.menu_item_panel{
							@include border-none;
						}
					}
				}
			}
		}
		.product_food{
			flex:1;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			.food_one{
				.food_one_item{
					.one_title{
						padding: 0 14px;
						height: 26px;
						line-height: 26px;
						font-size: 12px;
						color: rgb(147,153,159);
						background-color: #f3f5f7;
						border-left: 2px solid #d9dde1;
					}
					.food_two{
						.food_two_item{
							width: calc(100% - 18px * 2);
							padding: 18px 0;
							margin: 0 auto;
							display: flex;
							@include border-1px(rgba(7,17,27,0.1),bottom);
							.two_img{
								flex:0 0 58px;
								margin-right: 10px;
								img{
									width: 58px;
									height: 58px;
								}
							}
							.two_content{
								padding-top: 2px;
								width: calc(100% - 58px - 10px);
								.content_title{
									margin-bottom: 8px;		
									h2{
										color: rgb(7,17,27);
										line-height: 14px;
										font-size: 14px;
									}							
								}
								.content_desc{
									margin-bottom: 8px;
									h3{
										color: rgb(147,153,159);
										line-height: 12px;
										font-size: 10px;
										overflow: hidden;
										white-space: nowrap;
										text-overflow:ellipsis;
									}
								}
								.content_info{
									display: flex;
									align-items:center;
									h3{
										line-height: 10px;
										font-size: 10px;
										color: rgb(147,153,159);
										&:nth-child(1){
											margin-right: 12px;
										}
									}
								}
								.content_price{
									position: relative;
									font-size: 0;
									.newPrice{
										color: rgb(240,20,20);
										font-size: 14px;
										line-height: 24px;
										font-weight: 700;
										margin-right: 4px;
										&:before{
											content: '￥';
											font-size: 10px;
										}
									}
									.oldPrice{
										text-decoration: line-through;
										vertical-align: top;
										color: rgb(147,153,159);
										font-size: 10px;
										line-height: 24px;
										font-weight: 700;
										&:before{
											vertical-align: top;
											content: '￥';
										}
									}
									.btn{
										position: absolute;
										top: 0;
										right: -6px;
									}
								}
							}
							&:nth-last-child(1){
								@include border-none;
							}
						}							
					}
				}
			}
		}
	}

	//12px
	%support_icon_3{
		&.decrease{//减
			@include bg-image("decrease_3")
		}
		&.discount{//折
			@include bg-image("discount_3")
		}
		&.special{//特
			@include bg-image("special_3")
		}
		&.invoice{//票
			@include bg-image("invoice_3")
		}
		&.guarantee{//保
			@include bg-image("guarantee_3")
		}
	}
	//16px
	%support_icon_4{
		&.decrease{//减
			@include bg-image("decrease_4")
		}
		&.discount{//折
			@include bg-image("discount_4")
		}
		&.special{//特
			@include bg-image("special_4")
		}
		&.invoice{//票
			@include bg-image("invoice_4")
		}
		&.guarantee{//保
			@include bg-image("guarantee_4")
		}
	}
</style>