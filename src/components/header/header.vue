<template>
	<div class="header">
		<div class="header_wrapper">
			<div class="wrapper_content">
				<div class="content_avatar">
					<img :src="seller.avatar" alt="avatar">
				</div>
				<div class="content_detail">
					<div class="content_detail_title">
						<span></span>
						<h1 v-text="seller.name"></h1>
					</div>
					<div class="content_detail_desc">
						<h2>{{seller.description+'/'+seller.deliveryTime}}</h2>
					</div>
					<div v-if="seller.supports" class="content_detail_reduce">
						<span :class="classMap[seller.supports[0].type]"></span>
						<h3>{{seller.supports[0].description}}</h3>
					</div>
				</div>
				<div class="content_more" @click="toggleDetailFlag('show')">
					<h6 v-if="seller.supports" v-text="seller.supports.length+'个'"></h6>
					<span class="icon-keyboard_arrow_right"></span>
				</div>
			</div>
			<div class="wrapper_bulletin" @click="toggleDetailFlag('show')">
				<span class="bulletin_icon_bul"></span>
				<p class="bulletin_text" v-text="seller.bulletin"></p>
				<span class="bulletin_icon_right icon-keyboard_arrow_right"></span>
			</div>
		</div>
		<div class="header_bg" :style="'background-image:'+'url('+seller.avatar+')'">
		</div>
		<!-- 弹出层 -->
		<transition name="fadeDetail">
			<div class="header_detail" v-show="showDetailFlag">
				<div class="header_detail_wrapper clearfix">
					<div class="detail_content">
						<div class="content_title">
							<h1 v-text="seller.name"></h1>
							<v-star :size="48" :score="seller.score"></v-star>
						</div>
						<div class="content_support">
							<div class="support_title">
								<div class="title_line"></div>
								<h2 class="title_text">优惠信息</h2>
								<div class="title_line"></div>
							</div>
							<div class="support_content">
								<div v-for="(item,index) in seller.supports" class="support_content_item">
									<span :class="classMap[item.type]"></span>
									<h3 v-text="item.description"></h3>
								</div>
							</div>
						</div>
						<div class="content_bulletin">
							<div class="bulletin_title">
								<div class="title_line"></div>
								<h2 class="title_text">商家公告</h2>
								<div class="title_line"></div>
							</div>
							<div class="bulletin_content">
								<h3 v-text="seller.bulletin"></h3>
							</div>
						</div>
					</div>
				</div>
				<div class="header_detail_close">
					<span class="icon-close" @click="toggleDetailFlag('hide')"></span>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import star from "../star/star"

	export default{
		props: {
			seller: {

			}
		},
		data() {
			return {
				classMap:[
					"decrease",
					"discount",
					"special",
					"invoice",
					"guarantee"
				],
				showDetailFlag: false
			}
		},
		methods:{
			toggleDetailFlag(flag) {
				if(flag=="show"){
					this.showDetailFlag = true;
				}else{
					this.showDetailFlag = false;
				}
			}
		},
		components:{
			"v-star": star
		},
		mounted() {
			
		}
	}
</script>

<style scoped lang="scss">
	.header{
		position: relative;
		color: #fff;
		overflow: hidden; 
		.header_wrapper{
			background-color: rgba(7,17,27,0.5);
			.wrapper_content{
				position: relative;
				padding: 24px 12px 18px 24px;
				display: flex;
				.content_avatar{
					margin-right: 16px;
					width: 64px;
					height: 64px;
					img{
						width: 100%;
						height: 100%;
						border-radius: 2px;
					}
				}
				.content_detail{
					margin-top: 2px;
					.content_detail_title{
						margin-bottom: 8px;
						display: flex;
						align-items: center;
						span{
							display: inline-block;
							width: 30px;
							height: 18px;							
							@include bg-image("brand");
							background-size: 30px 18px;
							background-repeat: no-repeat;
							margin-right: 6px;
						}
						h1{
							line-height: 18px;
							font-size: 16px;
							font-weight: bold;
						}
					}
					.content_detail_desc{
						margin-bottom: 10px;
						h2{
							line-height: 12px;
							font-size: 12px;
						}
					}
					.content_detail_reduce{
						display: flex;
						align-items:center;
						span{
							display: inline-block;
							width: 12px;
							height: 12px;
							margin-right: 4px;
							background-size: 12px 12px;
							background-repeat: no-repeat;
							@extend %support_icon_1;
						}
						h3{
							font-size: 10px;
							line-height: 12px;
						}
					}
				}
				.content_more{
					position: absolute;
					right: 12px;
					bottom: 18px;
					padding: 0 8px 0 10px;
					height: 24px;
					display: flex;
					justify-content:center;
					align-items:center;
					background-color: rgba(0,0,0,0.2);
					border-radius: 12px;
					h6{
						font-size: 10px;
					}
					span{
						margin-left: 2px;
						color: #fff;
					}
				}
			}
			.wrapper_bulletin{
				height: 28px;
				padding: 0 12px;
				background-color: rgba(7,17,27,0.2);
				font-size: 0;
				.bulletin_icon_bul{
					display: inline-block;
					vertical-align: top;
					margin-top: calc((28px - 12px) / 2);
					width: 22px;
					height: 12px;
					background-size: 22px 12px;
					background-repeat: no-repeat;
					@include bg-image("bulletin");
				}
				.bulletin_text{
					display: inline-block;
					width: calc(100% - 22px - 16px - 8px);
					margin: 0 4px;
					line-height: 28px;
					font-size: 10px;
					white-space: nowrap;
					text-overflow:ellipsis;
					overflow: hidden;
				}	
				.bulletin_icon_right{
					font-size: 16px;
					display: relative;
					&:before{
						position: absolute;
						margin-top: calc((28px - 12px) / 2);
					}
				}
			}
		}
		.header_bg{
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
			width: 100%;
			height: 100%;
			filter:blur(10px);
			background-attachment: fixed;
			background-repeat: nowrap;
		}
		.header_detail{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 199;
			overflow: auto;
			-webkit-overflow-scrolling:touch;
			backdrop-filter:blur(4px);
			background-color: rgba(7,17,27,0.8);
			.header_detail_wrapper{
				min-height: 100%;
				width: 100%;
				.detail_content{
					margin-top: 64px;
					padding:0 32px 96px;
					.content_title{
						h1{
							font-size: 16px;
							font-weight: 700;
							text-align: center;
						}
						div{
							margin: 16px 0 28px;
							text-align: center;
						}
					}
					.content_support{
						.support_title{
							@extend %title_line;
						}
						.support_content{
							padding: 24px 12px 28px;
							.support_content_item{
								display: flex;
								align-items:center;
								margin-bottom: 12px;
								span{
									display: block;
									margin-right: 6px;
									width: 16px;
									height: 16px;
									background-size: 16px 16px;
									background-repeat: no-repeat;
									@extend %support_icon_2;
								}
								h3{
									font-size: 12px;
								}
								&:nth-last-child(1){
									margin-bottom: 0;
								}
							}
						}
					}
					.content_bulletin{
						.bulletin_title{
							@extend %title_line;
						}
						.bulletin_content{
							padding: 24px 12px 0px;
							h3{
								line-height: 24px;
								font-size: 12px;
							}
						}
					}
				}
			}
			.header_detail_close{
				position: relative;
				margin-top: -64px;
				text-align: center;
				clear: both;
				span{
					font-size: 32px;
					color: rgba(255,255,255,0.5);
				}
			}
			// &:after{
			// 	content: "";
			// 	position: fixed;
			// 	top:0;
			// 	right: 0;
			// 	bottom:0;
			// 	left:0;				
			// 	background-color: rgba(7,17,27,0.8);
			// 	filter: blur(10px);
			// 	z-index: -1;
			// }
		}
	}

	// 弹出层动画
	.fadeDetail-enter{
		//元素被插入时生效(下一个帧移除)
		transform: translateX(750px);
	}
	.fadeDetail-enter-active{
		//同元素被插入时生效,动画完成后移除(这里即0.5s)
		//向着header_detail里定义的状态过渡
		transition: all 0.5s;
	}	
	.fadeDetail-leave{
		//点击隐藏触发时生效(下一个帧移除)
	}
	.fadeDetail-leave-active{
		//同点击隐藏触发时生效,动画完成后移除(这里即0.5s)
		transition: all 0.7s;
		transform: translateX(750px);
	}
 
  //12px
	%support_icon_1{
		&.decrease{//减
			@include bg-image("decrease_1")
		}
		&.discount{//折
			@include bg-image("discount_1")
		}
		&.special{//特
			@include bg-image("special_1")
		}
		&.invoice{//票
			@include bg-image("invoice_1")
		}
		&.guarantee{//保
			@include bg-image("guarantee_1")
		}
	}
	//16px
	%support_icon_2{
		&.decrease{//减
			@include bg-image("decrease_2")
		}
		&.discount{//折
			@include bg-image("discount_2")
		}
		&.special{//特
			@include bg-image("special_2")
		}
		&.invoice{//票
			@include bg-image("invoice_2")
		}
		&.guarantee{//保
			@include bg-image("guarantee_2")
		}
	}
	%title_line{
		display: flex;
		align-items:center;
		.title_line{
				flex: 1;
				border-bottom: 1px solid rgba(255,255,255,0.2);
			}
			.title_text{
				font-size: 14px;
				font-weight: 700;
				padding: 0 12px;
			}
	}
</style>