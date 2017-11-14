<template>
  <div class="columns" v-show="!loading">
    <tile v-for="item in goals" :key="item.type" :item="item"
      class="animated fadeIn delayed" :class="hidden(item)" />
  </div>
</template>

<script>
import Tile from './Tile'

export default {
  name: 'indicators',
  components: { Tile },
  props: ['range'],

  data: () => ({
    loading: true
  }),

  computed: {
    goals () {
      return this.$store.getters.goals
    }
  },

  methods: {
    loadData () {
      this.$store.dispatch('FETCH_GOALS', { range: this.range })
        .then(() => { this.loading = false })
    },
    hidden (item) {
      if (item.type === 'Muscle') {
        return 'is-hidden-touch'
      }
    }
  },

  beforeMount () {
    this.loadData()
  }
}
</script>

