<template>
	<transition name="food">
		<div class="food" v-show="showFlag">
			<div class="food_head">
				<div class="head_img">
					<img :src="foodData.image" alt="img" />
					<div class="icon_panel">
						<i @click="_hide()" class="icon-arrow_lift"></i>						
					</div>
				</div>
			</div>
			<div class="food_content">
				<h1 class="content_title">{{foodData.name}}</h1>
				<div class="content_detail">
					<h2 class="sell">月售{{foodData.sellCount}}份</h2>
					<h2 class="rating">好评率{{foodData.rating}}%</h2>
				</div>
				<div class="content_price">
					<h1 class="new_price">￥{{foodData.price}}</h1>
					<h2 class="old_price" v-show="foodData.oldPrice">￥{{foodData.oldPrice}}</h2>
				</div>

				<transition name="btn">
					<div class="btn" v-show="foodData.count">
						<v-carControl :food="foodData" ref="addCar" @getAddDom="emitShopCar"></v-carControl>
					</div>
				</transition>
				<transition name="btn">
					<div class="addCarBtn" v-show="!foodData.count">
						<span @click.stop="_addCar($event)">加入购物车</span>
					</div>
				</transition>
			</div>
			<div class="split"></div>
			<div class="food_brief">
				<h1>商品介绍</h1>
				<p>{{foodData.info}}</p>
			</div>
			<div class="split"></div>
			<div class="food_rating">
					<h1 class="rating_title">商品评价</h1>
					<div class="rating_nav">
						<v-selectRating 
							:selectType="selectType" 
							:onlyContent="onlyContent" 
							:desc="desc" 
							:ratings="foodData.ratings" 
							@changeOnlyContent="receiveOnly"@changeSelectType="receiveSelect"></v-selectRating>
					</div>
					<div class="rating_content">
						<div class="rating_once" v-for="(item,index) in foodData.ratings" v-show="needShow(item.rateType,item.text)">
							<div class="once_top">
								<div class="once_time">
									<span class="time_date">{{item.rateTime | formatDates}}</span>
								</div>
								<div class="once_userinfo">
									<span>{{item.username}}</span>
									<img :src="item.avatar" alt="avatar">
								</div>
							</div>
							<div class="once_bottom">
								<span :class="item.rateType==0?'icon-thumb_up':'icon-thumb_down'"></span>
								<h1>{{item.text || '暂无评价'}}</h1>
							</div>
						</div>
						<div class="rating_none" v-show="!foodData.ratings || !foodData.ratings.length">
							暂无评价
						</div>
					</div>
			</div>
		</div>
	</transition>
</template>
<script>
	import carControl from "../carControl/carControl"
	import selectRating from "../selectRating/selectRating"
	import {formatDate} from "../../common/js/function"

	const [NORMAL,BAD,ALL] = [0,1,2]

	export default {
		props: {
			foodData: {},
		},
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: "全部" ,
					normal: "推荐",
					bad: "吐槽"
				}
			}
		},
		components:{
			"v-carControl": carControl,
			"v-selectRating": selectRating
		},
		computed:{
			
		},
		filters:{
			formatDates(time){
				let date = new Date(time)
				return formatDate(date,'yyyy-MM-dd hh:mm')
			}
		},
		methods:{
			show() {
				this.showFlag = true
			},
			_hide() {
				this.showFlag = false
			},
			_addCar(event) {
				this.$refs.addCar.addNum(event)
				/*
					点击加入购物车时会触发carControl的+按钮,
					然后在carControl发出事件,food里要接收事件触发,
					执行触发后的函数emitShopCar,
					emitShopCar再发出事件,product里接收事件触发调用
					shopCar的drop函数
				*/ 
			},
			emitShopCar(target) {
				this.$emit('foodDispatch',target)
			},
			receiveOnly(value){
				this.onlyContent = value
			},
			receiveSelect(value){
				this.selectType = value
			},
			needShow(type,text) {
				if(this.onlyContent && !text){
					return false
				}
				if(this.selectType === ALL){
					return true
				}else{
					return type === this.selectType
				}
			}
		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
	.food{
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		position: fixed;
		width: 100%;
		left: 0px;
		top: 0px;
		bottom: 48px;
		z-index: 98;
		background-color: #f3f5f7;
		&.food-enter,&.food-leave-active{
			transform: translateX(750px);
		}	
		&.food-enter-active,&.food-leave-active{
			transition: all 0.5s linear;
		}	
		.food_head{
			.head_img{
				position: relative;
				width: 100%;
				height: 0;
				padding-top: 100%;
				img{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
				.icon_panel{
					position: absolute;
					top: 0px;
					left: 0px;
					width: 100%;
					height: 58px;
					line-height: 58px;
					background:linear-gradient(top,rgba(0,0,0,0.4),rgba(0,0,0,0.01));
					i{
						display: inline-block;
						padding: 10px;
						color: #fff;
						font-size: 20px;
					}
				}
			}
		}
		.food_content{
			background-color: #fff;
			position: relative;
			padding: 18px;
			.content_title{
				margin-bottom: 8px;
				font-size: 14px;
				font-weight: 700;
				color: rgb(7,17,27);
				line-height: 14px;
			}
			.content_detail{
				margin-bottom: 18px;
				font-size: 0px;
				.sell,.rating{
					display: inline-block;
					font-size: 10px;
					color: rgb(147,153,159);
				}
				.rating{
					margin-left: 12px;
				}
			}
			.content_price{
				font-size: 0;
				.new_price{
					display: inline-block;
					font-size: 14px;
					color: rgb(240,20,20);
					font-weight: 700;
					line-height: 24px;
				}
				.old_price{
					vertical-align: top;
					display: inline-block;
					margin-left: 4px;
					font-size: 10px;
					color: rgb(147,153,159);
					font-weight: 700;
					line-height: 24px;
					text-decoration: line-through;
				}
			}
			.btn{
				position: absolute;
				bottom: 12px;
				right: 18px;
				&.btn-enter,&.btn-leave-active{
					opacity:0;
				}
				&.btn-enter-active,&.btn-leave-active{
					transition: all 0.5s;
				}
			}
			.addCarBtn{
				position: absolute;
				bottom: 18px;
				right: 18px;
				&.btn-enter,&.btn-leave-active{
					opacity:0;
				}
				&.btn-enter-active,&.btn-leave-active{
					transition: all 0.5s;
				}
				span{
					display: inline-block;
					width: 74px;
					height: 24px;
					background-color: rgb(0,160,220);
					color: #fff;
					font-size: 10px;
					border-radius: 12px;
					text-align: center;
					line-height: 12px;
					padding: 6px 0;
				}
			}
		}
		.split {
			@extend %split;
		}
		.food_brief {
			padding: 18px;
			background-color: #fff; 
			h1{
				margin-bottom: 6px;
				color: rgb(7,17,27);
				font-size: 14px;
			}
			p{
				padding:0px 8px;
				font-size: 12px;
				color: rgb(77,85,93);
				line-height: 24px;
			}
		}
		.food_rating{
			background-color: #fff;
			padding: 18px 0 0;
			.rating_title{
				padding: 0 18px;
				font-size: 14px;
				color: #07111b;
			}
			.rating_nav{
				padding: 0 18px;
				@include border-1px(rgba(7,17,27,0.1),bottom);
			}
			.rating_content{
				padding: 0 18px;
				.rating_once{
					padding: 16px 0;
					@include border-1px(rgba(7,17,27,0.1),bottom);
					.once_top{
						margin-bottom: 6px;
						display: flex;
						justify-content:space-between;
						.once_time{
							.time_date{
								font-size: 10px;
								color: rgb(147,153,157);
							}
						}
						.once_userinfo{
							display: flex;
							align-items:center;
							span{
								font-size: 10px;
								color: rgb(147,153,159);
								line-height: 12px;
								margin-right: 6px;
							}
							img{
								border-radius: 50%;
								width: 12px;
								height: 12px;
							}
						}
					}
					.once_bottom{
						display: flex;
						align-items:center;
						span{
							margin-right: 4px;
							line-height: 24px;
							font-size: 12px;
							&.icon-thumb_up{
								color: rgb(0,160,220);
							}
							&.icon-thumb_down{
								color: rgb(147,153,159);
							}
						}
						h1{
							font-size: 12px;
							line-height: 16px;
							color: rgb(147,153,159);
						}
					}
				}
				.rating_none{
					padding: 16px 0;
					font-size: 12px;
					color: rgb(147,153,159);
				}
			}
		}
	}
</style>