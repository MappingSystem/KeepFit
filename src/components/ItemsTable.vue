<template>
  <table class="table">
    <thead>
      <tr>
        <th><abbr title="ID">ID</abbr></th>
        <th><abbr title="Weight">Weight</abbr></th>
        <th><abbr title="Body Mass Index">BMI</abbr></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>1</th>
        <td>38</td>
        <td>23</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'table',
  props: ['range'],

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
