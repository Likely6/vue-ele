<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab_common tab_product">
        <router-link to="/product" tag="li" active-class="nav_selected">商品</router-link>
      </div>
      <div class="tab_common tab_rating">
        <router-link to="/rating" tag="li" active-class="nav_selected">评价</router-link>
      </div>
      <div class="tab_common tab_seller ">
        <router-link to="/seller" tag="li" active-class="nav_selected">卖家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from "./components/header/header"
import {urlParse} from "./common/js/function"
export default {
  name: 'app',
  data() {
    return{
      seller:{
        id:(function(){
          let queryParam = urlParse()
          return queryParam.id || 0
        })()
      }
    }
  },
  mounted() {
    var _this = this
    this.$http.get('api/seller')
    .then(function(res){
      console.log(res)
      var json = res.data
      if(json.error == _this.GValue.RES_OK){
        // 对象合并  
        _this.seller = Object.assign({},_this.seller,json.data)
        console.log(_this.seller)
      }else{
        alert("数据请求错误！")
      }
    })
    .catch(function(err){

    })
  },
  components:{
    'v-header':header
  }
}
</script>

<style lang="scss" scoped>
#app {
  .tab{
    display: flex;
    align-items:center;
    width: 100%;
    height: 40px;
    // border-bottom: 1px solid rgba(7,17,27,0.1);
    @include border-1px(rgba(7,17,27,0.1),'bottom'); 
    >.tab_common{
      //flex是flex-grow,flex-shrink,flex-basis的缩写,默认值为0 1 auto。后两个属性可选。
      //表示宽度各占1份
      flex:1;
      text-align: center;
      li{
        font-size: 14px;
        color: rgb(77,85,93);
      }
      .nav_selected{
        color: rgb(240,20,20);
      }
    }
  }
}
</style>
