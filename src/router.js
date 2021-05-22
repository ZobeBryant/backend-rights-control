import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import Users from '@/components/user/Users.vue'
import Roles from '@/components/role/Roles.vue'
import GoodsCate from '@/components/goods/GoodsCate.vue'
import GoodsList from '@/components/goods/GoodsList.vue'
import NotFound from '@/components/NotFound.vue'
import store from '@/store'

Vue.use(Router)

const userRule = {path: '/users', component: Users}
const roleRule = {path: '/roles', component: Roles}
const goodsRule = {path: '/goods', component: GoodsList}
const categoryRule = {path: '/categories', component: GoodsCate}

// 权限与路由映射
const ruleMapping = {
  'users': userRule,
  'roles': roleRule,
  'goods': goodsRule,
  'categories': categoryRule
}


// 用户不具备权限的路由，就不应该存在

const router = new Router({
  routes: [
    { 
      path: '/', 
      redirect: '/home' 
    },
    { 
      path: '/login', 
      component: Login 
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        // { path: '/users', component: Users },
        // { path: '/roles', component: Roles },
        // { path: '/goods', component: GoodsList },
        // { path: '/categories', component: GoodsCate }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

// 界面控制
// 判断用户是否登录
router.beforeEach((to, from, next) => {
  if(to.path === '/login'){
    next()
  }else{
    const token = sessionStorage.getItem('token')
    if(!token){
      next('/login')
    }else{
      next()
    }
  }  
})

// 界面控制
// 动态路由
export function initDynamicRoutes(){
  const currentRoutes = router.options.routes
  const rightList = store.state.rightList
  rightList.forEach(item => {
    item.children.forEach(item =>{
      const itemRule = ruleMapping[item.path]
      // 路由规则中添加元数据，元数据存储的是用户权限
      itemRule.meta = item.rights
      currentRoutes[2].children.push(itemRule)
    })
  })
  router.addRoutes(currentRoutes)
}

export default router
