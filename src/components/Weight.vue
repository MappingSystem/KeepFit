<template>
    <section class="section">
      <div class="container">
        <h1 class="title">Weight Tracking</h1>
        <p class="subtitle has-text-grey">Google Sheets as Source</p>

          <div class="small-padding">
            <i class="fas fa-info-circle has-text-info"></i>
            <span class="has-text-weight-semibold">Current</span>: {{ goals.current }} kg
            <span class="has-text-weight-semibold">Target</span>: {{ goals.target }} kg
          </div>

          <b-table
            class="table"
            :loading="dataLoaded"
            :data="weight"
            :bordered="false"
            :striped="true">

            <template slot-scope="props">
                <b-table-column field="id" label="ID" width="50" sortable centered>
                    {{ props.row[0]}}
                </b-table-column>

                <b-table-column field="date" label="Date" width="150" sortable centered>
                    {{ props.row[1] | moment }}
                </b-table-column>

                <b-table-column field="weight" label="Weight (kg)" width="150" sortable numeric>
                    {{ props.row[2] }}
                </b-table-column>

                <b-table-column field="change" label="Change" width="100" sortable numeric>
                    <span :class="changeColor(props.row[3])">
                      {{ props.row[3] }}
                    </span>
                    <i class="far fa-fw" :class="changeArrow(props.row[3])"></i>
                </b-table-column>

                <b-table-column field="bmi" label="BMI" width="100" sortable numeric>
                    {{ props.row[4] }}
                </b-table-column>

                <b-table-column field="status" label="Status" width="120" centered>
                    <span class="tag" :class="bmiStatusClass(props.row[4])">
                      {{ bmiStatus(props.row[4]) }}
                    </span>
                </b-table-column>

                <b-table-column class="has-text-grey-dark" field="note" label="Note">
                    {{ props.row[5] }}
                </b-table-column>
            </template>

            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey-light has-text-centered">
                        <p>No Data</p>
                    </div>
                </section>
            </template>
        </b-table>
      </div>
  </section>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Dashboard',
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$store.dispatch('getWeightData')
      this.$store.dispatch('getWaistData')
      this.$store.dispatch('getGoalsData')
    },
    bmiStatus (bmi) {
      switch (true) {
        case bmi < 19:
          return 'Underweight'
        case bmi < 25:
          return 'Healthy'
        case bmi < 31:
          return 'Overweight'
        case bmi < 40:
          return 'Obese'
        case bmi >= 40:
          return 'Extremely Obese'
        default:
          return '-'
      }
    },
    bmiStatusClass (bmi) {
      switch (true) {
        case bmi < 19:
          return 'is-info'
        case bmi < 25:
          return 'is-success'
        case bmi < 31:
          return 'is-warning'
        case bmi < 40:
          return 'is-danger'
        case bmi >= 40:
          return 'is-dark'
        default:
          return 'is-light'
      }
    },
    changeColor (change) {
      const amount = parseFloat(change)
      if (amount > 0) {
        return 'has-text-danger'
      } else if (amount < 0) {
        return 'has-text-success'
      }
    },
    changeArrow (change) {
      const amount = parseFloat(change)
      if (amount > 0) {
        return 'fa-arrow-up'
      } else if (amount < 0) {
        return 'fa-arrow-down'
      } else {
        return 'fa-minus'
      }
    }
  },
  computed: {
    dataLoaded () {
      return !this.$store.state.dateLoaded.weight
    },
    weight () {
      return this.$store.state.measures.weight
    },
    goals () {
      return {
        current: this.$store.state.goals.weight[1],
        target: this.$store.state.goals.weight[2]
      }
    }
  },
  filters: {
    moment (date) {
      return moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
