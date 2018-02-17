<template>
	<div class="selectRating">
		<div class="rating_nav">
			<ul class="nav_panel">
				<li @click="tagNav(2)" :class="{active:selectType_d==2}">{{desc.all}}<span>{{ratings.length}}</span></li>
				<li @click="tagNav(0)" :class="{active:selectType_d==0}">{{desc.normal}}<span>{{normalCount.length}}</span></li>
				<li @click="tagNav(1)" :class="{active:selectType_d==1}">{{desc.bad}}<span>{{badCount.length}}</span></li>
			</ul>
		</div>
		<div class="rating_has" @click="selectContent">
			<span :class="{'icon-check_circle':true,active:onlyContent_d}"></span>
			<p>只看有内容的评价</p>
		</div>
	</div>
</template>
<script>
	const [NORMAL,BAD,ALL] = [0,1,2]
	export default {
		data() {
			return {
				selectType_d: this.selectType,
				onlyContent_d: this.onlyContent
			}
		},
		/*
		props是单向数据流，不能在子组件里直接改变props值，否则会报错（但可以运行）。但可以将props赋值给data或computed，改变data或computed来间接改变props的值（不改变父组件的值，如果要数据双向可以用$emit和$on来改变父组件的值）
		*/ 
		props:{
			ratings: {
				type: Array,
				default() {
					return []
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type:Boolean,
				default: true
			},
			desc: {
				type: Object,
				default() {
					return {
						all: "全部",
						normal: "满意",
						bad: "不满意" 
					}
				}
			}
		},
		computed:{
			normalCount() {
				return this.ratings.filter((rating) => {
					return rating.rateType === NORMAL
				})
			},
			badCount() {
				return this.ratings.filter((rating) => {
					return rating.rateType === BAD
				})
			}
		},
		methods:{
			tagNav (type){
				this.selectType_d = type
				//props是单向数据，所以在子组件改变后需要通过$emit触发父组件更新父组件的值
				this.$emit("changeSelectType",type)
			},
			selectContent (){
				this.onlyContent_d = !this.onlyContent_d
				this.$emit("changeOnlyContent",this.onlyContent_d)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.selectRating{
		width: 100%;
		.rating_nav{
			padding: 12px 0 18px 0;
			@include border-1px(rgba(7,17,27,0.1),bottom); 
			.nav_panel{
				display: flex;
				li{
					padding: 8px 12px;
					color: rgb(77,85,93);
					font-size: 12px;
					vertical-align: bottom;
					line-height: 16px;
					&:nth-child(1),&:nth-child(2){
						background-color: rgba(0,160,220,0.2);
						margin-right: 8px;
						&.active{
							color: #fff;
							background-color: rgb(0,160,220);
							span{
								color: #fff;
							}
						}
					}
					&:nth-child(3) {
						background-color: rgba(77,85,93,0.2);
						&.active{
							color: #fff;
							background-color: rgb(77,85,93);
							span{
								color: #fff;
							}
						}
					}
					span{
						margin-left: 4px;
						font-size: 8px;
						color: rgb(77,85,93);
					}
				}
			}
		}
		.rating_has{
			padding: 12px 0;
			display: flex;
			align-items:center;
			span{
				font-size: 24px;
				color: rgb(147,153,159);
				display: inline-block;
				margin-right: 4px;
				&.active{
					color: #00c850;
				}
			}
			p{
				font-size: 12px;
				color: rgb(147,153,159);
				line-height: 24px;
			}
		}
	}
</style>