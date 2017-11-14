import { fetchItems, fetchGoals } from '../api'

export default {
  // fetch all measure items given the range
  FETCH_ITEMS: ({ commit }, { range }) => {
    return fetchItems(range)
      .then(items => commit('SET_ITEMS', { items }))
  },
  // fetch all goals given the range
  FETCH_GOALS: ({ commit }, { range }) => {
    return fetchGoals(range)
      .then(goals => commit('SET_GOALS', { goals }))
  }
}
