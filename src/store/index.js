import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

const GSX_URL = 'https://sheets.googleapis.com/v4/spreadsheets'
const SPREADSHEET_ID = '1M7kSTLxNxGpviRZujVd9YESWhBUalWFO10M8D9V0Alk'
const API_KEY = 'AIzaSyBWCHtr1MZnTJr74whmSOiTWYVRIABEZHE'
let BASE_URL = GSX_URL + '/' + SPREADSHEET_ID + '/values/'

const API_URL = {
  weight: BASE_URL + 'Weight!A2:F999' + '?key=' + API_KEY,
  waist: BASE_URL + 'Waist!A2:B999' + '?key=' + API_KEY,
  goals: BASE_URL + 'Goals!A2:C5' + '?key=' + API_KEY
}

export default new Vuex.Store({
  state: {
    dateLoaded: {
      weight: false,
      waist: false,
      goals: false
    },
    goals: {
      weight: {},
      waist: {}
    },
    measures: {
      weight: {},
      waist: {}
    }
  },
  actions: {
    getWeightData: ({ commit }) => {
      Vue.http.get(API_URL.weight)
        .then(response => {
          let data = response.body.values
          commit('GET_WEIGHT', data)
        })
    },
    getWaistData: ({ commit }) => {
      Vue.http.get(API_URL.waist)
        .then(response => {
          let data = response.body.values
          commit('GET_WAIST', data)
        })
    },
    getGoalsData: ({ commit }) => {
      Vue.http.get(API_URL.goals)
        .then(response => {
          let data = response.body.values
          commit('GET_GOALS', data)
        })
    }
  },
  mutations: {
    GET_WEIGHT (state, data) {
      state.measures.weight = data
      state.dateLoaded.weight = true
    },
    GET_WAIST (state, data) {
      state.measures.waist = data
      state.dateLoaded.waist = true
    },
    GET_GOALS (state, data) {
      state.goals.weight = data[0]
      state.goals.waist = data[1]
      state.dateLoaded.goals = true
    }
  }
})
