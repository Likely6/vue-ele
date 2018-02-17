<template>
	<div class="shopCar_warp">
		<div class="shopCar">
			<div class="shopCar_panel">
				<div class="shopCar_info" @click="openList()">
					<div class="info_logo_panel">
						<div class="info_logo" :class="{'active':totalCount!=0}">
							<span class="icon-shopping_cart"></span>
						</div>
						<div class="info_count" v-show="totalCount!=0">
							<h6>{{totalCount}}</h6>
						</div>
					</div>
					<div class="info_detail">
						<div class="detail_panel">
							<h6 class="detail_price" :class="{'active':totalPrice!=0}">￥{{totalPrice}}</h6>
							<h6 class="detail_desc">另需配送费￥{{sellerData.deliveryPrice}}元</h6>
						</div>
					</div>
				</div>
				<div class="shopCar_btn" :class="{'active':payClass}">
					<h6 v-text="payDesc"></h6>
				</div>
			</div>
			<div class="shopCar_ball">
				<transition
					name="drop" 
					v-on:before-enter="beforeEnter"
				  v-on:enter="enter"
				  v-on:after-enter="afterEnter"
				  v-for="(item,index) in balls"
				  :key="index"
				>
					<div class="ball_item" v-show="item.show">
						<div class="ball_inner inner-hook"></div>
					</div>
				</transition>
			</div>
			<transition	name="foodlist">
				<div class="shopCar_list" v-show="showlist">
					<div class="list_title">
						<h1>购物车</h1>
						<h6>清空</h6>
					</div>
					<ul class="list_panel">
						<li class="list_item" v-for="(item,index) in selectFood">
							<div class="item_content">
								<h2 v-text="item.name"></h2>
								<h3 v-text="'￥'+item.price*item.count"></h3>
							</div>
							<div class="item_control">
								<v-carControl :food="item" @getAddDom="emitShopCar"></v-carControl>
							</div>
						</li>
					</ul>
				</div>
			</transition>
		</div>
		<transition name="foodmask">
			<div class="shopCar_mask" v-show="showlist" @click="hideList()"></div>
		</transition>
	</div>
</template>

<script>
import carControl from "../carControl/carControl"

export default {
	data() {
		return {
			balls:[
				{
					show:false
				},
				{
					show:false
				},
				{
					show:false
				},
				{
					show:false
				},
				{
					show:false
				},
				{
					show:false
				}
			],
			dropBall: [],
			showlist: false
		}
	},
	props:{
		sellerData:{

		},
		selectFood: {
			// 父组件product选择的food的数据
			type: Array,
			default() {
				return []
			}
		}
	},
	components:{
		"v-carControl": carControl
	},
	computed:{
		// 计算总价
		totalPrice() {
			let total = 0
			this.selectFood.forEach(function(food){
				total += food.price * food.count
			})
			return total
		},
		// 总数
		totalCount() {
			let count = 0
			this.selectFood.forEach(function(food){
				count += food.count
			})
			return count
		},
		// 支付描述
		payDesc() {
			if(this.totalPrice === 0){
				return `￥${this.sellerData.minPrice}元起送`
			}else if(this.totalPrice<this.sellerData.minPrice){
				return `还差￥${this.sellerData.minPrice-this.totalPrice}元起送`
			}else{
				return '去结算'
			}
		},
		//支付按钮样式
		payClass(){
			if(this.totalPrice<this.sellerData.minPrice){
				return false
			}else{
				return true
			}
		},
	},
	methods: {
		//显示或隐藏购物车详情
		openList() {
			if(this.selectFood.length>0){
				this.showlist = !this.showlist
			}
		},
		hideList(){
			this.showlist = false
		},
		//触发
		emitShopCar(target){
			this.drop(target)
		},
		drop(target) {
			// console.log(target)
	    for(let i = 0; i< this.balls.length; i++ ){
		  	let ball = this.balls[i]
		  	if(!ball.show){
		  		ball.show = true
		  		ball.el = target
		  		this.dropBall.push(ball)
		  		return
		  	}
		  }
		},
		beforeEnter: function (el) {
			console.log("开始前")
	    let count = this.balls.length;
	    while (count--){
	    	let ball = this.balls[count]
	    	if(ball.show){
	    		let rect = ball.el.getBoundingClientRect()
	    		let x = rect.left - 32 + 4
	    		let y = -(window.innerHeight - rect.top - 22 -16 - 4)
	    		console.log(x+"==="+y)
	    		el.style.display = ''
	    		el.style.webkitTransform = `translate3d(0,${y}px,0)`
	    		el.style.transform = `translate3d(0,${y}px,0)`
	    		let inner = el.getElementsByClassName('inner-hook')[0]
	    		inner.style.webkitTransform = `translate3d(${x}px,0,0)`
	    		inner.style.transform = `translate3d(${x}px,0,0)`
	    	}
	    }
	  },
	  /*
			1.函数里没有调用done参数这里就不要传done
			不然afterEnter不会执行
			2.传了done且调用了done()afterEnter会被立马执行(未知原因)
			2017年11月1日16:57:01
			问题2已被解决
			需要el监听transitionend事件回调done
			（transitionend事件--当css完成过渡后触发）
	  */	
	  enter: function (el,done) {
	  	console.log("过渡中")
	  	/*
				因为浏览器引擎对重拍和重绘做了优化 比如说对元素的改变达到了一定的次数才会发生，那想要立即获得准确的DOM元素，就要手动的触发浏览器重绘，有很多方法都可以触发，比如：offsetHieght、offsetTop、offsetLeft、 offsetWidth、scrollTop、scrollLeft、scrollWidth等等都是可以的
	  	*/ 
	    el.offsetTop
	    el.scrollLeft
	    this.$nextTick(function(){
	    		el.style.webkitTransform = 'translate3d(0,0,0)'
	    		el.style.transform = 'translate3d(0,0,0)'
	    		let inner = el.getElementsByClassName('inner-hook')[0]
	    		inner.style.webkitTransform = 'translate3d(0,0,0)'
	    		inner.style.transform = 'translate3d(0,0,0)'
	    })
	    el.addEventListener('transitionend',done)
	  },
	  afterEnter: function (el) {
	  	console.log("过渡后")
	  	let _this = this
	    let ball = _this.dropBall.shift()
		    if(ball){
		    	ball.show = false
		    	el.style.display = 'none'
		    }
	  },
	},
	mounted(){
		
	}
}
</script>

<style scoped lang="scss">
	.shopCar_warp{
		.shopCar{
			position: fixed;
			bottom:0;
			left:0;
			height: 48px;
			width: 100%;
			color: rgba(255,255,255,0.4);
			z-index: 100;
			.shopCar_panel{
				background: #141d27;
				height: 100%;
				display: flex;
				.shopCar_info{
					flex:1;
					font-size: 0;
					padding: 0 12px;
					.info_logo_panel{
						display: inline-block;
						position: relative;
						padding: 6px;
						border-radius: 50%;
						top: -10px;
						width: 56px;
						height: 56px;
						background: #141d27;
						margin-right: 18px;
						.info_logo{
							width: 100%;
							height: 100%;
							border-radius: 50%;
							background-color: #2b343c;
							text-align: center;
							span{
								font-size: 24px;
								color: #80858a;
								display: inline-block;
								width: 24px;
								height: 24px;
								line-height: 44px;
							}
							&.active{
								background-color: #00a0dc;
								span{
									color: #fff;
								}
							}
						}
						.info_count{
							position: absolute;
							right: 0;
							top: 0;
							width: 24px;
							height: 16px;
							background-color: #f01414;
							border-radius: 16px;
							box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
							text-align: center; 
							h6{
								font-size: 10px;
								line-height: 16px;
								color: #fff;
							}
						}
					}
					.info_detail{
						display: inline-block;
						vertical-align: top;
						width: calc(100% - 56px - 18px);
						height: 100%;
						.detail_panel{
							height: 100%;
							overflow: auto;
							white-space: nowrap;
							-webkit-overflow-scrolling:touch;
							.detail_price{
								margin-top: 12px;
								display: inline-block;
								vertical-align: top;
								font-size: 16px;
								font-weight: 700;
								line-height: 24px;
								border-right: 1px solid rgba(255,255,255,0.1);
								padding-right: 12px;
								&.active{
									color: #fff;
								}
							}
							.detail_desc{
								margin-top: 12px;
								display: inline-block;
								font-size: 12px;
								line-height: 24px;
								padding-left: 12px;
							}
						}
					}
				}
				.shopCar_btn{
					flex:0 0 105px;
					background: #2b333b;
					h6{
						font-size: 12px;
						font-weight: 700;
						line-height: 48px;
						text-align: center;
					}
					&.active{
						background-color: #00b43c;
						h6{
							color: #fff;
						}
					}
				}
			}
			.shopCar_ball{
				.ball_item{
					position: absolute;
					left: 32px;
					bottom: 22px;
					transition: all 0.5s cubic-bezier(.49,-0.29,.75,.41);
					.ball_inner{
						width: 16px;
						height: 16px;
						border-radius: 50%;
						background: rgb(0,160,220);
						transition: all 0.5s linear;
					}
				}
			}
			.shopCar_list{
				position: absolute;
				z-index: -1;
				top: 0;
				left: 0;
				width: 100%;
				transform: translate(0,-100%);
				background-color: #fff;
				color: #07111b;
				&.foodlist-enter,&.foodlist-leave-active{
					transform: translate(0,0);
				}
				&.foodlist-enter-active,&.foodlist-leave-active{
					transition: all 0.5s;
				}
				.list_title{
					display: flex;
					justify-content:space-between;
					padding: 0 18px;
					height: 40px;
					line-height: 40px;
					background-color: #f3f5f7;
					@include border-1px(rgba(7,17,27,0.1),bottom);
					h1{
						font-size: 14px;
					}
					h6{
						font-size: 12px;
						color: #00a0dc;
					}
				}
				.list_panel{
					max-height: 218px;
					overflow: auto;
					.list_item{
						height: 48px;
						width: calc(100% - 2 * 18px);
						margin: 0 auto;				
						@include border-1px(rgba(7,17,27,0.1),bottom);
						-webkit-overflow-scrolling: touch;
						.item_content{
							width:calc(100% - 84px);
							display: flex;
							justify-content:space-between;
							float: left;
							h2{
								height: 48px;
								line-height: 48px;
								font-size: 14px;
								font-weight: 700;
								white-space: nowrap;
								overflow: hidden;
								text-overflow:ellipsis;
							}
							h3{
								height: 48px;
								line-height: 48px;
								font-size: 14px;
								font-weight: 700;
								color: #f01414;
								padding:0 12px 0 18px;
							}
						}
						.item_control{
							float: right;
							height: 48px;
							display: flex;
							align-items:center;
						}
					}
				}
			}
		}
		.shopCar_mask{
			position: fixed;
			z-index: 99;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(7,17,27,0.6); 
			backdrop-filter: blur(3px);
			&.foodmask-enter-active,&.foodmask-leave-active{
				transition: all 0.3s;
			}
			&.foodmask-enter,&.foodmask-leave-active{
				opacity:0;
			}
		}
	}
	
</style>