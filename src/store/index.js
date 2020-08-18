import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let currentSelect = JSON.parse(localStorage.getItem('currentSelect') || '[]');
let isDeletLocalData = JSON.parse(localStorage.getItem('isDeletLocalData') || '[]');
// console.log("currentSelect",currentSelect);
export default new Vuex.Store({
  state: {
    currentSelect: currentSelect, //历史记录
    isDeletLocalData: isDeletLocalData //是否删除本地数据
  },
  mutations: {
    // 添加搜索记录到本地
    addToKeyWords(state, obj) {
      if(state.currentSelect.length > 0){
        state.currentSelect = [];
        state.currentSelect.push(obj)
      }else{
        state.currentSelect.push(obj)
      }
      localStorage.setItem('currentSelect', JSON.stringify(state.currentSelect))
    },
    // 删除本地搜索记录
    delKeyWords(state) {
      console.log("进入这里store")
      state.hisKeyWords = [];
      localStorage.setItem('currentSelect', JSON.stringify(state.hisKeyWords))
    },
   // 添加删除标志
   addIsDelLocalData(state,obj) {
     if(state.isDeletLocalData.length > 0){
       state.isDeletLocalData = [];
       state.isDeletLocalData.push(obj)
     }else{
       state.isDeletLocalData.push(obj)
     }
     localStorage.setItem('isDeletLocalData', JSON.stringify(state.isDeletLocalData))
   },
    delFlagData(state){
      state.isDeletLocalData = [];
      localStorage.setItem('isDeletLocalData', JSON.stringify(state.isDeletLocalData))
    }
  },
  getters:{
    getStoreKeyWords() {
      return this.state.currentSelect;
    },
  },
  actions: {},
  modules: {}
})
