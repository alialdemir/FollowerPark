<template>
  <div class="btn-group">
    <vs-button
      @click="$store.dispatch('setTaskConfigurations', { intervalSpeed: item.id });"
      :key="indextr"
      v-for="(item, indextr) in speedTypes"
      :color="intervalSpeed === item.id ? 'success' : 'primary'"
      type="border"
    >
      <b class="inline-block">{{item.text}}</b>
      <div>{{item.subText}}</div>
    </vs-button>
  </div>
</template>

<script>
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue';
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'fp-choose-speed-action',
  components: {
    StatisticsCardLine
  },
  computed: {
    ...mapFields(['taskConfigurations.intervalSpeed', 'speedTypes'])
  }
};
</script>
