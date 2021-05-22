import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rightList: JSON.parse(sessionStorage.getItem('rightList') || '[]'),
    username: sessionStorage.getItem('username')
  },
  mutations: {
    // 一旦刷新页面，vuex中的数据会重新初始化，所以会变成空的数组，需要将权限数据存储在sessionStorage中，并让其和vuex中的数据保持同步
    setRightList(state, data){
      state.rightList = data
      sessionStorage.setItem('rightList', JSON.stringify(data))
    },
    setUsername(state, data){
      state.username = data
      sessionStorage.setItem('username', 'data')
    }

  },
  actions: {
  },
  getters: {
  }
})
