<template>
  <div class="vx-row">
    <div
      :key="indextr"
      v-for="(item, indextr) in unfollowOptions"
      class="vx-col w-1/2 md:w-1/3 xl:w-1/4"
    >
      <div @click="chooseUnfollowOption(item)">
        <statistics-card-line
          hideChart
          class="mb-base"
          :textColor="unfollowOption === item.id ? 'warning' : 'white'"
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
import { whereUserResourceType } from '@/middleware/enums';

export default {
  name: 'fp-choose-unfollow-option',
  components: {
    StatisticsCardLine
  },
  computed: {
    ...mapFields([
      'taskConfigurations.unfollowOption',
      'AppActiveUser',
      'unfollowOptions'
    ])
  },
  methods: {
    chooseUnfollowOption(unfollowOption) {
      if (unfollowOption.disabled === true) {
        this.$store.dispatch('setTaskConfigurations', {
          userId: this.AppActiveUser.uid,
          unfollowOption: unfollowOption.id,
          whereUserResource: whereUserResourceType.following
        });

        this.$emit('click');
      } else {
        this.$vs.notify({
          title: 'This unfollow options will be added very soon.',
          color: 'danger',
          position: 'top-center'
        });
      }
    }
  }
};
</script>
