<template>
  <div class="vx-row">
    <div
      :key="indextr"
      v-for="(item, indextr) in taskActions"
      class="vx-col w-1/2 md:w-1/3 xl:w-1/4 pr-2"
    >
      <div @click="chooseAction(item)">
        <statistics-card-line
          hideChart
          class="mb-base"
          :isNewPulse="item.isNewPulse"
          :isActive="item.disabled"
          :textColor="action === item.id ? 'warning' : 'white'"
          :icon="item.icon"
          :statistic="item.text"
          :statisticTitle="item.description"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue';
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'fp-choose-action',
  components: {
    StatisticsCardLine,
  },
  computed: {
    ...mapFields(['taskConfigurations.action', 'taskActions']),
  },
  methods: {
    chooseAction(action) {
      if (action.disabled === true) {
        this.$store.dispatch('setTaskConfigurations', { action: action.id });
        this.$emit('click');
      } else {
        this.$vs.notify({
          title: 'This task will be added very soon.',
          color: 'danger',
          position: 'top-center',
        });
      }
    },
  },
};
</script>
