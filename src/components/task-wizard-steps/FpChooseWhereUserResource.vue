<template>
  <div class="vx-row">
    <div
      :key="indextr"
      v-for="(item, indextr) in whereUserResources"
      class="vx-col w-1/2 md:w-1/3 xl:w-1/4 pr-2"
    >
      <div @click="chooseWhereUserResources(item)">
        <statistics-card-line
          hideChart
          class="mb-base"
          :isActive="item.disabled"
          :textColor="whereUserResource === item.id ? 'warning' : 'white'"
          :icon="item.icon"
          :statistic="$t(item.text)"
          :statisticTitle="$t(item.description)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue';
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'fp-choose-where-user-resource',

  components: {
    StatisticsCardLine,
  },

  computed: {
    ...mapFields([
      'taskConfigurations.whereUserResource',
      'whereUserResources',
    ]),
  },

  methods: {
    chooseWhereUserResources(whereUserResource) {
      if (whereUserResource.disabled === true) {
        this.$store.dispatch('setTaskConfigurations', {
          whereUserResource: whereUserResource.id,
        });

        this.$emit('click');
      }
    },
  },
};
</script>
