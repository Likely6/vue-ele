import Vue from 'vue'
import Router from 'vue-router'

import	product from "../components/product/product"
import	rating from "../components/rating/rating"
import	seller from "../components/seller/seller"

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: '/vue/element',
  routes: [
    {
      path: '/',
      // 路由重定向
      redirect: '/product',
      component: product
    },
    {
      path: '/product',
      component: product
    },
    {
      path: '/rating',
      component: rating
    },
    {
      path: '/seller',
      component: seller
    }

  ]
})
