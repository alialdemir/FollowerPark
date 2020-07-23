<template>
  <div class="vx-row">
    <div
      :key="indextr"
      v-for="(item, indextr) in directMessageSources"
      class="vx-col w-1/2 md:w-1/3 xl:w-1/4"
    >
      <div @click="chooseDirectMessageSource(item)">
        <statistics-card-line
          hideChart
          class="mb-base"
          :textColor="directMessageSource === item.id ? 'warning' : 'white'"
          :icon="item.icon"
          :isActive="item.disabled"
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
  name: 'fp-direct-message-source',
  components: {
    StatisticsCardLine
  },
  computed: {
    ...mapFields([
      'taskConfigurations.directMessageSource',
      'directMessageSources'
    ])
  },
  methods: {
    chooseDirectMessageSource(directMessageSource) {
      this.$store.dispatch('setTaskConfigurations', {
        directMessageSource: directMessageSource.id,
        userId: this.$store.state.AppActiveUser.uid
      });

      this.$emit('click');
    }
  }
};
</script>
