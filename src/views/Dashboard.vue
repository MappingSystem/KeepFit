<template>
  <section class="section">
    <div class="container">

      <div id="header" class="container">  <!-- Header -->
        <h1 class="title">Fitness Tracking</h1>
        <p class="subtitle has-text-grey">Google Sheets as Source</p>
      </div>  <!-- Header -->

      <indicators range="A2:E6"></indicators>

      <items-table range="A2:I"></items-table>

    </div>
  </section>
</template>

<script>
import Indicators from '../components/Indicators'
import ItemsTable from '../components/ItemsTable'

export default {
  name: 'dashboard',
  components: { Indicators, ItemsTable }
}
</script>

<style scoped lang="scss">
#header {
  margin-bottom: 1.5rem;
}
</style>

