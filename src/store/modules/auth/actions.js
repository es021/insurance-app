import axios from 'axios'
import * as firebase from '@/firebase/firebase'
import router from "@/router";
import User from '../../../model/User'

export default {
  async login({ dispatch, commit }, form) {
    console.log("form", form)
    const { user } = await firebase.auth.signInWithEmailAndPassword(form.username, form.password)
    let userData = User.addFromLogin(user);
    commit('setUser', userData)
    router.push("/dashboard");

  },
  async fetchUser({ commit }, user) {
    console.log(user);
    // fetch user profile
    const userProfile = await firebase.users.doc(user.uid).get()
    console.log(userProfile);
    commit('setUser', userProfile.data())
  },
  async logout({ commit }) {
    await firebase.auth.signOut()
    commit('setUser', {})
    commit('logout')
    router.push("/");
  },
  refreshtoken({ commit }) {
    axios.get('/refresh')
      .then(response => {
        const token = response.data.access_token
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        commit('auth_success', { token })
      })
      .catch(error => {
        console.log('refresh token error')
        commit('logout')
        localStorage.removeItem('token')
        console.log(error)
      })
  },
}
