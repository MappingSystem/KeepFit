<template>
  <section class="wrapper">
    <div class="columns" v-if="!loading">
      <tile v-for="item in goals" :key="item.type" :item="item"
        class="animated bounceInDown" />
    </div>
  </section>
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
    }
  },

  beforeMount () {
    this.loadData()
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    min-height: 120px;
  }
</style>


