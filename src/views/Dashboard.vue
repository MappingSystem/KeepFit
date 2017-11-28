<template>
  <section id="dashboard" class="section">
    <div class="container wrapper">

      <header id="header" class="container">
        <h1 class="title">Fitness Tracking</h1>
        <p class="subtitle has-text-grey">Google Sheets as a Service</p>
      </header>

      <indicators range="A2:E6" />

      <items-table range="A2:I" />

      <!-- <trend
        id="graph"
        :data="weight"
        :gradient="['#50af73', '#ffbb28', '#f14c4c']"
        auto-draw
        smooth>
      </trend> -->

    </div>
  </section>
</template>

<script>
import Indicators from '../components/Indicators'
import ItemsTable from '../components/ItemsTable'
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  components: { Indicators, ItemsTable },

  data: () => ({
    mode: 'table'
  }),

  computed: {
    ...mapGetters(['weight'])
  }
}
</script>

<style scoped lang="scss">
  #header {
    margin-bottom: 1.5rem;
  }
</style>

