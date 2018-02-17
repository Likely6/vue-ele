<template>
	<div class="seller">
		<div class="seller_wrap">
			<div class="seller_head">
				<div class="head_star">
					<div class="star_left">
						<h1 class="left_title">{{seller.name}}</h1>
						<div class="left_star">
							<v-star :score="seller.score" :size="36"></v-star>
							<p>({{seller.ratingCount}})</p>
							<span>月售{{seller.sellCount}}单</span>
						</div>
					</div>
					<div class="star_right" @click="selectFavorite">
						<span class="icon-favorite" :class="{'active':favorite}"></span>
						<p>{{favorite?'已收藏':'收藏'}}</p>
					</div>
				</div>
				<div class="head_info">
					<ul class="info_panel">
						<li class="info_panel_once price">
							<p>起送价</p>
							<span>{{seller.minPrice}}</span>
						</li>
						<li class="info_panel_once price">
							<p>商家配送</p>
							<span>{{seller.deliveryPrice}}</span>
						</li>
						<li class="info_panel_once time">
							<p>平均配送时间</p>
							<span>{{seller.deliveryTime}}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="split"></div>
			<div class="seller_activity">
				<h1 class="activity_title">公告与活动</h1>
				<p class="activity_breif">{{seller.bulletin}}</p>
				<ul class="activity_supports">
					<li class="support_once" v-for="(item,index) in seller.supports">
						<span :class="classMap[item.type]"></span>
						<p>{{item.description}}</p>
					</li>
				</ul>
			</div>
			<div class="split"></div>
			<div class="seller_scene">
				<h1 class="scene_title">商家实景</h1>
				<div class="scene_content swiper-container">
					<ul class="content_panel swiper-wrapper">
						<li class="content_once swiper-slide" v-for="(item,index) in seller.pics">
							<img :src="item" alt="scene">
						</li>
					</ul>
				</div>
			</div>
			<div class="split"></div>
			<div class="seller_info">
				<h1 class="info_title">商家信息</h1>
				<ul class="info_detail">
					<li class="detail_once" v-for="(item,index) in seller.infos">
						<p>{{item}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import star from "../star/star"

	let swiper;

	export default{
		props:{
			seller:{

			}
		},
		data(){
			return{
				classMap:[
					"decrease",
					"discount",
					"special",
					"invoice",
					"guarantee"
				],
				favorite:false,
			}
		},
		components:{
			"v-star": star
		},
		watch: {
			seller(){
				this.initSlides()
			}
		},
		methods:{
			initSlides(a){
				//第一初始化且有数据时
				if(!swiper&&this.seller){
					this.$nextTick(function(){
						swiper = new Swiper('.swiper-container',{
							slidesPerView: 'auto',
			        centeredSlides: false,	//是否居中
			        spaceBetween: 6
						});
					})
				}
			},
			selectFavorite(){
				this.favorite = !this.favorite
			}
		},
		mounted(){
			this.initSlides()
		}
	}
</script>

<style scoped lang="scss">
	.seller{
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: auto;
		-webkit-overflow-scrolling:touch;
		.seller_wrap{
			.split{
				@extend %split;
			}
			.seller_head{
				padding: 18px;
				.head_star{
					display: flex;
					justify-content:space-between;
					align-items:center;
					@include border-1px(rgba(7,17,27,0.1),bottom);
					padding-bottom: 18px;
					.star_left{
						.left_title{
							font-size: 14px;
							color: rgb(7,17,27);
							line-height: 14px;
							margin-bottom: 8px;
						}
						.left_star{
							display: flex;
							p{
								margin-left: 8px;
								font-size: 10px;
								color: rgb(77,85,93);
								line-height: 18px;
							}
							span{
								margin-left: 12px;
								font-size: 10px;
								color: rgb(77,85,93);
								line-height: 18px;
							}
						}
					}
					.star_right{
						width: 50px;
						text-align: center;
						span{
							display: inline-block;
							font-size: 24px;
							line-height: 24px;
							margin-bottom: 4px;
							color:#d4d6d9;
							&.active{
								color:rgb(240,20,20);
							}
						}
						p{
							font-size: 10px;
							color:rgb(77,85,93);
							line-height: 10px;
						}
					}
				}
				.head_info{
					padding-top: 18px;
					.info_panel{
						display: flex;
						.info_panel_once{
							text-align: center;
							flex:1;
							border-right: 1px solid rgba(7,17,27,0.1);
							p{
								font-size: 10px;
								color: rgb(147,153,159);
								line-height: 10px;
								margin-bottom: 4px;
							}
							span{
								font-size: 24px;
								line-height: 24px;
								color: rgb(7,17,27);
							}
							&.price{
								&:after{
									content:"元";
									font-size:10px;
									vertical-align: baseline;
									line-height: 24px;
								}
							}
							&.time{
								&:after{
									content:"分钟";
									font-size:10px;
									vertical-align: baseline;
									line-height: 24px;
								}
							}
							&:nth-last-child(1){
								border: none;
							}
						}
					}
				}
			}
			.seller_activity{
				padding: 18px 18px 0;
				.activity_title{
					font-size: 14px;
					color: rgb(7,17,27);
					line-height: 14px;
					margin-bottom: 8px;
				}
				.activity_breif{
					padding: 0 12px;
					margin-bottom: 16px;
					font-size: 12px;
					color: rgb(240,20,20);
					line-height: 24px;
				}
				.activity_supports{
					.support_once{
						@include border-1px(rgba(7,17,27,0.1),top);
						padding: 16px 12px;
						font-size: 0px;
						span{
							display: inline-block;
							margin-right: 6px;
							width: 16px;
							height: 16px;
							background-size: 16px 16px;
							background-repeat: no-repeat;
							@extend %support_icon_4;
						}
						p{
							display: inline-block;
							font-size: 12px;
							color: rgb(7,17,27);
							line-height: 16px;
							vertical-align: top;
						}
					}
				}
			}
			.seller_scene{
				padding: 18px 0 18px 18px;
				.scene_title{
					font-size: 14px;
					color: rgb(7,17,27);
					line-height: 14px;
					margin-bottom: 12px;
				}
				.scene_content{
					overflow: hidden;
					.content_panel{
						display: flex;
						.content_once{
							margin-right: 6px;
							img{
								width: 120px;
								height: 90px;
							}
							&.last-child{
								margin-right: 0;
							}
						}
					}
				}
			}
			.seller_info{
				padding: 18px 18px 0;
				.info_title{
					font-size: 14px;
					color: rgb(7,17,27);
					line-height: 14px;
					margin-bottom: 12px;
				}
				.info_detail{
					.detail_once{
						padding:16px 12px;
						@include border-1px(rgba(7,17,27,0.1),top);
						p{
							font-size: 12px;
							color: rgb(7,17,27);
							line-height: 16px;
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