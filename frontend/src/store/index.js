import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const localToken = localStorage.getItem('HC_TOKEN')
const localName = localStorage.getItem('HC_NAME')
const localId = localStorage.getItem('HC_ID')

const state = {
  token: localToken || '',
  name: localName || '',
  id: localId || ''
}

const getters = {
  getToken() {
     return state.token
  },
  getName() {
    return state.name
  },
  getId() {
    return state.id
  },
};

const mutations = {
  setToken(state, _token) {
      state.token = _token;
      localStorage.setItem('HC_TOKEN', _token)
  },
  setName(state, _name) {
    state.name = _name;
    localStorage.setItem('HC_NAME', _name)
  },
  setId(state, _id) {
    state.id = _id
    localStorage.setItem('HC_ID', _id)
  },
  resetToken() {
    state.token = ''
    localStorage.removeItem('HC_TOKEN')
  },
  resetName() {
    state.name = ''
    localStorage.removeItem('HC_NAME')
  },
  resetId() {
    state.Id = ''
    localStorage.removeItem('HC_ID')
  }
};
const actions = {
  login({commit}, data) {
    data.token && commit('setToken',data.token)
    data.name && commit('setName', data.name)
    data.id && commit('setId', data.id)
  },
  logout({commit}) {
    commit('resetToken')
    commit('resetName')
    commit('resetId')
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})