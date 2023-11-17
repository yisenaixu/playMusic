import { createStore } from "vuex"

// const moduleA = {
//   state() {
//     return {
//       countA:1
//     }
//   },
//   mutations:{
//     increment(state,n) {
//          state.countA += n.num
//     }
//   }  
// }


// const store = createStore({
//   modules: {
//     a:moduleA
//   },
//   state() {
//     return {
//         count:0,
//         list: [0,1,2,3,4]
//     }
//   },
//   getters: {
//        //state 的 computed
//        listLen(state) {
//           return state.list.length
//        },
//        getListById: (state) => (id) => 
//           state.list.find( (item,index) => index == id)
       
//   },
//   mutations: {
//     increment(state,n) {
//         state.count += n.num;
//     }
//   },
//   actions: {
//     increment (context, n) {
//       context.commit('increment',n)
//     },
//     incrementAlias ({commit}, n) {
//       commit('increment',n)
//     },
//     incrementAsync({commit}, n) {
//       setTimeout(() => {
//         commit('increment')
//       },1000)
//     }
//   }
// })
import state from './state'
import mutations from './mutations'
import actions from "./actions"
import setLocalStorage from "./plugins/setLocalStorage"
let plugins = [setLocalStorage];
const store = createStore({
  state,
  mutations,
  actions,
  plugins
})
export default store;