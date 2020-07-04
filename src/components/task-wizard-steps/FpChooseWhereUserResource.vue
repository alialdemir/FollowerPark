<template>
  <div class="vx-row">
    <div v-for="(item, indextr)  in whereUserResources" class="vx-col w-1/2 md:w-1/3 xl:w-1/4">
      <div @click="chooseWhereUserResources(item)">
        <statistics-card-line
          hideChart
          class="mb-base"
          :isActive="item.disabled"
          :textColor="whereUserResource === item.id ? 'warning' : 'white'"
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
  name: 'fp-choose-where-user-resource',
  components: {
    StatisticsCardLine
  },
  computed: {
    ...mapFields(['taskConfigurations.whereUserResource', 'whereUserResources'])
  },
  methods: {
    chooseWhereUserResources(whereUserResource) {
      if (whereUserResource.disabled === true) {
        this.$store.dispatch('setTaskConfigurations', {
          whereUserResource: whereUserResource.id
        });

        this.$emit('click');

        this.$store.dispatch('followByUserResource', {
          username: this.$store.state.taskConfigurations.username,
          whereUserResourceId: whereUserResource.id
        });
      } else {
        this.$vs.notify({
          title: 'This user resource will be added very soon.',
          color: 'danger',
          position: 'top-center'
        });
      }
    }
  }
};
</script>
