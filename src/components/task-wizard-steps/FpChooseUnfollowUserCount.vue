<template>
  <div>
    <vx-card :title="$t('HowManyFollowersShouldNotBeFollowed')">
      <vs-input-number
        v-model="maximumNumberTransactions"
        :label="$t('UnfollowUserCount')"
        class="justify-start bg-transparent"
      />
    </vx-card>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'fp-choose-unfollow-user-count',
  computed: {
    ...mapFields(['taskConfigurations.maximumNumberTransactions']),
  },
};
</script>
<style>
.vs-input-number--input {
  border: 1px solid #ddd;
}
</style>
