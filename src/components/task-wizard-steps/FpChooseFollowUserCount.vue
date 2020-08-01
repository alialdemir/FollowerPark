<template>
  <vx-card :title="$t('HowManySubscriptionsDoYouNeedToComplete')">
    <vs-input-number
      v-model="maximumNumberTransactions"
      :label="$t('FollowUserCount')"
      class="justify-start bg-transparent"
    />
    <vs-checkbox disabled color="success" value="true">{{$t('SkipUsersThatAreAlreadyFollow')}}</vs-checkbox>
  </vx-card>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'fp-choose-follow-user-count',
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
