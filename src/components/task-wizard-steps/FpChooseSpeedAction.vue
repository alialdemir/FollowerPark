<template>
  <div class="btn-group">
    <vs-button
      @click="$store.dispatch('setTaskConfigurations', { intervalSpeed: speedType.id });"
      v-for="(speedType, indextr)  in speedTypes"
      :color="intervalSpeed === speedType.id ? 'success' : 'primary'"
      type="border"
    >
      <b class="inline-block">{{speedType.text}}</b>
      <div>{{speedType.subText}}</div>
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
