import { parseDate } from '../util/dates'

export default {
  goals: state => {
    return state.goals
  },
  // items sorted by dates, latest to oldest
  items: state => {
    return state.items.sort((a, b) => {
      return parseDate(b.date) - parseDate(a.date)
    })
  }
}
