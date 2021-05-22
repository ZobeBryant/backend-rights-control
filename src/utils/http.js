import axios from 'axios'
import Vue from 'vue'
import router from '../router'
// 配置请求的跟路径, 目前用mock模拟数据, 所以暂时把这一项注释起来
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 请求和响应的控制
// 如果发出了非权限内的请求，应该直接在前端访问内阻止，虽然这个请求发到服务器也会被拒绝

// 请求和权限映射表
const actionMapping = {
    get: 'view',
    post: 'add',
    put: 'edit',
    delete: 'delete'
}

axios.interceptors.request.use(function(req){
    const currentUrl = req.url
    if(currentUrl !== 'login'){
        req.headers.Authorization = sessionStorage.getItem('token')
        // 当前模块中具备的权限
        // 查看 get请求
        // 增加 post请求
        // 修改 put请求
        // 删除 delete请求
        const method = req.method
        const action = actionMapping[method]
        
        const rights = router.currentRoute.meta
        if(rights && rights.indexOf(action) == -1){
            alert("没有权限")
            return Promise.reject(new Error('没有权限'))
        }

    }
    return req
})

axios.interceptors.response.use(function(res){
    // 如果服务器返回的状态码是401，代表token超时或者被篡改了，此时应该强制跳转到登录页面
    if(res.data.meta.status === 401){
        router.push('/login')
        sessionStorage.clear()
        window.location.reload()
    }
    return res
})



Vue.prototype.$http = axios