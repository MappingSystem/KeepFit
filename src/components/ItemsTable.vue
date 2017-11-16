<template>
  <section class="wrapper">

    <!-- Busy Indicator -->
    <div id="busy" class="level" v-if="loading">
      <div class="level-item">
        <div class="icon is-medium">
          <i class="fal fa-3x fa-spinner-third fa-spin"></i>
        </div>
      </div>
    </div>

    <table v-else
      class="animated bounceInUp table is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Weight</th>
          <th>Change</th>
          <th>BMI</th>
          <th>Waist</th>
          <th>Fat</th>
          <th>Muscle</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.weight }}</td>
          <td>{{ item.change }}</td>
          <td>{{ item.bmi }}</td>
          <td>{{ item.waist }}</td>
          <td>{{ item.fat }}</td>
          <td>{{ item.muscle }}</td>
          <td>{{ item.note }}</td>
        </tr>
      </tbody>
    </table>

  </section>
</template>

<script>
export default {
  name: 'table',
  props: ['range'],

  data: () => ({
    loading: true
  }),

  computed: {
    items () {
      return this.$store.getters.items
    }
  },

  methods: {
    loadData () {
      this.$store.dispatch('FETCH_ITEMS', { range: this.range })
        .then(() => { this.loading = false })
    }
  },

  beforeMount () {
    this.loadData()
  }
}
</script>

<style lang="scss" scoped>

  .wrapper {
    margin-top: 1.5rem;
  }

  #busy {
    min-height: 400px;
  }
</style>

