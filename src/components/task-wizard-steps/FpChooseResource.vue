<template>
  <div class="vx-row">
    <div v-for="(item, indextr)  in resources" class="vx-col w-1/2 md:w-1/3 xl:w-1/4">
      <div @click="chooseResource(item)">
        <statistics-card-line
          hideChart
          class="mb-base"
          :textColor="resource === item.id ? 'warning' : 'white'"
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
  name: 'fp-choose-resource',
  components: {
    StatisticsCardLine
  },
  computed: {
    ...mapFields(['taskConfigurations.resource', 'resources'])
  },
  methods: {
    chooseResource(resource) {
      if (resource.disabled === true) {
        this.$store.dispatch('setTaskConfigurations', {
          resource: resource.id
        });

        this.$emit('click');
      } else {
        this.$vs.notify({
          title: 'This resource will be added very soon.',
          color: 'danger',
          position: 'top-center'
        });
      }
    }
  }
};
</script>
