<template>
  <section class="wrapper">

    <!-- Busy Indicator -->
    <div id="busy" class="level" v-if="loading">
      <div class="level-item">
        <div class="icon is-medium">
          <div class="spinner"></div>
        </div>
      </div>
    </div>

    <table v-else
      class="animated bounceInUp table is-fullwidth">

      <thead>
        <tr>
          <th class="has-text-centered is-hidden-mobile">#</th>
          <th>Date</th>
          <th class="has-text-centered">Weight</th>
          <th class="has-text-centered is-hidden-mobile">Change</th>
          <th class="has-text-centered is-hidden-mobile">BMI</th>
          <th class="has-text-centered is-hidden-mobile">Waist</th>
          <th class="has-text-centered is-hidden-mobile">Fat</th>
          <th class="has-text-centered is-hidden-mobile">Muscle</th>
          <th class="is-hidden-mobile">Note</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in sortedItems" :key="item.id" :class="statusClass(item.bmi)">
          <td class="item-id has-text-centered has-text-grey is-hidden-mobile"
            :class="statusClass(item.bmi)">
            {{ item.id }}
          </td>
          <td>{{ item.date }}</td>
          <td class="has-text-centered has-text-weight-semibold"
            :class="statusClass(item.bmi)">
            {{ item.weight }}
          </td>
          <td class="has-text-right is-hidden-mobile"
            :class="setChangeColor(item)">{{ item.change }}</td>
          <td class="item-bmi has-text-centered is-hidden-mobile"
            :class="statusClass(item.bmi)"
            :title="statusLabel(item.bmi)">
            {{ item.bmi }}
          </td>
          <td class="has-text-centered is-hidden-mobile">{{ item.waist }}</td>
          <td class="has-text-centered is-hidden-mobile">{{ item.fat }}</td>
          <td class="has-text-centered is-hidden-mobile">{{ item.muscle }}</td>
          <td class="is-hidden-mobile">{{ item.note }}</td>
        </tr>
      </tbody>

    </table>

  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ItemsTable',
  props: {
    range: String
  },

  data: () => ({
    loading: true,
    itemsPage: 12,
    bmi: {
      underweight: 19,
      healthy: 25,
      overweight: 31,
      obese: 40
    }
  }),

  computed: {
    ...mapGetters([
      'items',
      'sortedItems'
    ])
  },

  methods: {
    loadData () {
      this.$store.dispatch('FETCH_ITEMS', { range: this.range })
        .then(() => { this.loading = false })
    },
    // color change based on sign
    setChangeColor (item) {
      if (item) {
        if (parseInt(item.change) !== 0) {
          if (item.change.indexOf('-') >= 0) {
            return 'has-text-success'
          } else {
            return 'has-text-danger'
          }
        }
      }
    },
    statusLabel (bmi) {
      switch (true) {
        case bmi < this.bmi.underweight:
          return 'Underweight'
        case bmi < this.bmi.healthy:
          return 'Healthy'
        case bmi < this.bmi.overweight:
          return 'Overweight'
        case bmi < this.bmi.obese:
          return 'Obese'
        case bmi >= this.bmi.obese:
          return 'Extremely Obese'
        default:
          return '-'
      }
    },
    statusClass (bmi) {
      switch (true) {
        case bmi < this.bmi.underweight:
          return 'is-underweight'
        case bmi < this.bmi.healthy:
          return 'is-healthy'
        case bmi < this.bmi.overweight:
          return 'is-overweight'
        case bmi < this.bmi.obese:
          return 'is-obese'
        case bmi >= this.bmi.obese:
          return 'is-extremeobese'
      }
    }
  },

  beforeMount () {
    this.loadData()
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/main";

  .item-bmi {
    &.is-underweight {
      color: $link;
    }

    &.is-healthy {
      color: $success;
    }

    &.is-overweight {
      color: $orange;
    }

    &.is-obese {
      color: $danger;
    }

    &.is-extremeobese {
      color: $violet;
    }
  }

  table.table {
    border: 1px solid $dark;
    border-radius: 0.25rem 0.25rem 0 0;
    border-collapse: separate;
    border-spacing: 0;

    thead {
      background-color: $dark;

      th {
        color: white;
        border: none;
      }
    }

    tbody {
      tr {
        &.is-underweight {
          background: linear-gradient(to left, transparent 50%, lighten($link, 42%) 50%);
          background-size: 200% 100%;
          background-position: right bottom;

        }

        &.is-healthy {
          background: linear-gradient(to left, transparent 50%, lighten($success, 44%) 50%);
          background-size: 200% 100%;
          background-position: right bottom;
        }

        &.is-overweight {
          background: linear-gradient(to left, transparent 50%, lighten($orange, 38%) 50%);
          background-size: 200% 100%;
          background-position: right bottom;
        }

        &.is-obese {
          background: linear-gradient(to left, transparent 50%, lighten($danger, 34%) 50%);
          background-size: 200% 100%;
          background-position: right bottom;
        }

        &.is-extremeobese {
          background: linear-gradient(to left, transparent 50%, lighten($violet, 38%) 50%);
          background-size: 200% 100%;
          background-position: right bottom;
        }

        &:nth-child(even) {
          background-color: #f4f4f4;
        }

        &:hover {
          background-position: left bottom;
        }
      }
    }
  }

  .wrapper {
    margin-top: 1.5rem;
  }

  #busy {
    min-height: 400px;
  }

  .item-id {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      border-width: 2px;
      border-style: solid;
      border-color: transparent;
    }

    &.is-underweight {
      &::before {
        border-color: $link;
      }
    }

    &.is-healthy {
      &::before {
        border-color: $success;
      }
    }

    &.is-overweight {
      &::before {
        border-color: $orange;
      }
    }

    &.is-obese {
      &::before {
        border-color: $danger;
      }
    }

    &.is-extremeobese {
      &::before {
        border-color: $violet;
      }
    }
  }

  .spinner:before {
    @include spinner(750ms, 42px, darken($info, 10%));
  }
</style>

