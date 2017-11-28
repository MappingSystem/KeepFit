import { parseDate } from '../util/dates'

export default {
  goals: state => state.goals,

  // Sort items by most recent first
  items: state => {
    return state.items.sort((a, b) => {
      return parseDate(b.date) - parseDate(a.date)
    })
  },

  weight: state => {
    return state.items.map(item => parseFloat(item.weight)).reverse()
  }
}
