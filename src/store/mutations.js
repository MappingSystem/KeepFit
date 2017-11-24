import Vue from 'vue'

export default {
  SET_ITEMS: (state, { items }) => {
    items.map(item => {
      if (item) {
        state.items.push({
          id: item[0],
          date: item[1],
          weight: item[2],
          change: item[3],
          bmi: item[4],
          waist: item[5],
          fat: item[6],
          muscle: item[7],
          note: item[8]
        })
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
