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
  measures: BASE_URL + 'Measures!A2:I999' + '?key=' + API_KEY,
  goals: BASE_URL + 'Goals!A2:C5' + '?key=' + API_KEY
}

export default new Vuex.Store({
  state: {
    dateLoaded: false,
    goals: {
      weight: {},
      waist: {},
      fat: {},
      muscle: {}
    },
    measures: {}
  },
  actions: {
    getMeasures: ({ commit }) => {
      Vue.http.get(API_URL.measures)
        .then(response => {
          let data = response.body.values
          commit('GET_MEASURES', data)
        })
    },
    getGoals: ({ commit }) => {
      Vue.http.get(API_URL.goals)
        .then(response => {
          let data = response.body.values
          commit('GET_GOALS', data)
        })
    }
  },
  mutations: {
    GET_MEASURES (state, data) {
      state.measures = data
      state.dateLoaded = true
    },
    GET_GOALS (state, data) {
      state.goals.weight = data[0]
      state.goals.waist = data[1]
      state.goals.fat = data[2]
      state.goals.muscle = data[3]
    }
  }
})
