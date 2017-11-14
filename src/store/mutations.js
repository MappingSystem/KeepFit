import Vue from 'vue'

export default {
  SET_ITEMS: (state, { items }) => {
    items.map(item => {
      if (item) {
        Vue.set(state.items, item[0], item)
      }
    })
  },
  SET_GOALS: (state, { goals }) => {
    goals.map(goal => {
      if (goal) {
        Vue.set(state.goals, goal[0].toLowerCase(), {
          type: goal[0],
          current: goal[1],
          target: goal[2],
          unit: goal[3],
          change: goal[4]
        })
      }
    })
  }
}
