/**
 * Vuex
 *
 * @library
 *
 * https://vuex.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'





Vue.use(Vuex)



// import blockLoader from './modules/blockLoader.js'
// // Create a new store
// // console.log(modules)
// const store = new Vuex.Store({
//   modules: {
//     blockLoader
//   },
// })


import modules from './modules'
// Create a new store
console.log(modules)
const store = new Vuex.Store({
  modules: modules,
})


// Store functionality
// import actions from './actions'
// import getters from './getters'
// import modules from './modules'
// import mutations from './mutations'
// import state from './state'

// const store = new Vuex.Store({
//   actions,
//   getters,
//   modules,
//   mutations,
//   state
// })

export default store
