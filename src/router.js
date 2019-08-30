import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Index from './views/Index'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/index',
      meta: { requiresAuth: true },
      component: Index,
      children: [
        {path:'/index/commodity',meta: { requiresAuth: true },component: () => import('./views/modules/commodity/Commodity.vue')},
        {path:'/index/addcommodity',meta: { requiresAuth: true },component: () => import('./views/modules/commodity/AddCommodity')},
        {path:'/index/account', meta: { requiresAuth: true },component: () => import('./views/modules/account/Account')},
        {path:'/index/addaccount', meta: { requiresAuth: true },component: () => import('./views/modules/account/AddAccount')},
        {path:'/index/changepwd', meta: { requiresAuth: true },component: () => import('./views/modules/account/ChangePwd')},
        {path:'/index/repertory', meta: { requiresAuth: true },component: () => import('./views/modules/repertory/Repertory')},
        {path:'/index/addrepertory', meta: { requiresAuth: true },component: () => import('./views/modules/repertory/AddRepertory')},
        {path:'/index/clear', meta: { requiresAuth: true },component: () => import('./views/modules/shipment/clear.vue')},

      ]
    },
  ],

})

  //配置路由添加守卫
  router.beforeEach((to ,from, next) => {

    if(to.meta.requiresAuth) { // 如果需要验证，直接打回登录
      const token = localStorage.getItem('token')
      if(token) { //如果有token权限 允许通过
        next()
      }else {
        next('/') //否则打回登录
      }
    }else {
      next() //直接通过
    }
  })


//导出路由  
export default router