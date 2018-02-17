<template>
	<div class="rating">
		<div class="rating_wrap">
		 	<div class="rating_star">
		 		<div class="rating_left">
		 			<h1>{{seller.score}}</h1>
		 			<h2>综合评分</h2>
		 			<p>高于周边商家{{seller.rankRate}}%</p>
		 		</div>
		 		<div class="rating_right">
			 		<div class="rating_stara">
			 			<h1>服务态度</h1>
			 			<v-star :size="36" :score="seller.serviceScore"></v-star>
			 			<p>{{seller.serviceScore}}</p>
			 		</div>
			 		<div class="rating_starb">
			 			<h1>商品评分</h1>
			 			<v-star :size="36" :score="seller.foodScore"></v-star>
			 			<p>{{seller.foodScore}}</p>
			 		</div>
			 		<div class="rating_arrive">
			 			<h1>送达时间</h1>
			 			<span>{{seller.deliveryTime}}分钟</span>
			 		</div>
		 		</div>
		 	</div>
		 	<div class="split"></div>
		 	<div class="rating_content">
		 		<div class="rating_nav">
		 			<v-selectRating 
		 				:selectType="selectType" 
		 				:onlyContent="onlyContent" 
		 				:desc="desc" 
		 				:ratings="ratings"
		 				@changeOnlyContent="receiveOnly" 
		 				@changeSelectType="receiveSelect"
		 				></v-selectRating>
		 		</div>
		 		<div class="rating_detail">
		 			<div 
		 				class="detail_once" 
		 				v-for="(item,index) in ratings"
		 				v-show="needShow(item.rateType,item.text)"
		 				>
		 				<div class="once_top">
		 					<div class="once_top_left">
		 						<img :src="item.avatar" alt="avatar">
		 						<div class="left_info">
		 							<p>{{item.username}}</p>
		 							<div>
		 								<v-star :size="24" :score="item.score"></v-star>
		 								<span>{{item.deliveryTime||10}}分钟送达</span>
		 							</div>
		 						</div>
		 					</div>
		 					<div class="once_top_right">
		 						<p>{{item.rateTime}}</p>
		 					</div> 
		 				</div>
		 				<div class="once_middle">
		 					<p>{{item.text||'暂无评价'}}</p>
		 				</div>
		 				<div class="once_bottom">
		 					<ul class="label_panel" v-show="item.recommend&&item.recommend.length">
		 						<span class="icon" :class="item.rateType==0?'icon-thumb_up':'icon-thumb_down'"></span>
		 						<li 
		 							v-for="(label,index) in item.recommend">{{label}}</li>
		 					</ul>
		 				</div>
		 			</div>
		 		</div>
		 	</div>
		</div> 
	</div>
</template>

<script>
	import star from "../star/star"
	import selectRating from "../selectRating/selectRating"
	const [NORMAL,BAD,ALL] = [0,1,2]
	export default {
		props:{
			seller:{
			
			}
		},
		data(){
			return {
				ratings:[],
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: "全部",
					normal: "满意",
					bad: "不满意" 
				}
			}
		},
		components:{
			"v-star" : star,
			"v-selectRating" : selectRating
		},
		methods:{
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
			console.log(this.seller)
			let _this = this
			this.$http.get("api/ratings")
				.then(function(res){
					console.log(res)
					let json = res.data
					if(json.error == _this.GValue.RES_OK){
						_this.ratings = json.data
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
	.rating{
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: auto;
		-webkit-overflow-scrolling:touch;
		.split{
			@extend %split;
		}
		.rating_wrap{
			.rating_star{
				display: flex;
				align-items:center;
				padding: 18px 24px 18px 0;
				.rating_left{
					margin-right: 24px;
					flex:0 0 36.78%;
					text-align: center;
					border-right: 1px solid rgba(7,17,27,0.1);
					h1{
						font-size: 24px;
						color: rgb(255,153,0);
						line-height: 28px;
						margin-bottom: 6px;
					}
					h2{
						font-size: 12px;
						color: rgb(7,17,27);
						line-height: 12px;
						margin-bottom: 8px;
					}
					p{
						font-size: 10px;
						line-height: 10px;
						color: rgb(147,153,159);
						margin-bottom: 6px;
					}
				}
				.rating_right{
					flex:1;
					>div{
						display: flex;
						margin-bottom: 8px;
						>h1{
							font-size: 12px;
							color: rgb(7,17,27);
							line-height: 16px;
							margin-right: 12px;
						}
						>p{
							font-size: 12px;
							color: rgb(255,153,0);
							line-height: 18px;
							margin-left: 12px;
						}
					}
					.rating_stara{
						
					}
					.rating_starb{
						
					}
					.rating_arrive{
						margin-bottom: 0;
						span{
							color: rgb(147,153,159);
							font-size: 12px;
							line-height: 18px;
						}
					}
				}
			}
			.rating_content{
				.rating_nav{
					padding: 6px 18px 0;
					@include border-1px(rgba(7,17,27,0.1),bottom);
				}
				.rating_detail{
					.detail_once{
						padding: 18px 18px 0;
						.once_top{
							display: flex;
							align-items:center;
							justify-content:space-between;
							margin-bottom: 6px;
							.once_top_left{
								display: flex;
								align-items:center;
								>img{
									border-radius: 50%;
									width: 28px;
									height: 28px;
									margin-right: 12px;
								}
								.left_info{
									p{
										font-size: 10px;
										color: rgb(7,17,27);
										line-height: 12px;
									}
									>div{
										display: flex;
										align-items:center;
										span{
											margin-left: 6px;
											font-size: 10px;
											color: rgb(147,153,159);
										}
									}
								}
							}
							.once_top_right{
								>p{
									font-size: 10px;
									color: rgb(147,153,159);
								}
							}
						}
						.once_middle{
							margin:0 0 8px 40px;
							>p{
								font-size: 12px;
								line-height: 18px;
								color: rgb(7,17,27);
							}
						}
						.once_bottom{
							padding-bottom: 18px;
							@include border-1px(rgba(7,17,27,0.1),bottom);
							.label_panel{
							padding-left: 40px; 	
								font-size: 0;
								.icon{
									font-size: 12px;
									color: rgb(0,160,220);
									line-height: 16px;
									margin-right: 8px;
									&.icon-thumb_down{
										color: rgb(183,187,191)!important;
									}
								}
								li{
									display: inline-block;
									border: 1px solid rgba(7,17,27,0.1);
									padding: 0 6px;
									border-radius: 2px;
									font-size: 9px;
									color: rgb(147,153,159);
									line-height: 16px;
									margin-right: 8px;
									margin-bottom: 6px;
									&:nth-last-child(1){
										margin-right: 0;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	
	@media screen and (min-width: 320px) and (max-width: 375px){
		.rating_star{
			padding-right: 10px!important;
			.rating_left{
				margin-right: 10px!important;
				flex:0 0 34%!important;
			}
		}
	}
</style>