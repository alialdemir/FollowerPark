<template>
  <div>
    <vx-card title="How many subscriptions do you need to complete?">
      <vs-input-number
        v-model="maximumNumberTransactions"
        label="Follow user count:"
        class="justify-start bg-transparent"
      />
      <vs-checkbox disabled color="success" value="true">Skip users that are already follow.</vs-checkbox>
    </vx-card>
  </div>
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
