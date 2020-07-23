<template>
  <vx-card title="Number of actions">
    <p>The total number of steps in which the job is stopped. Example: 5000, which means that the service will distribute the 5000 action for a few days with respect to the selected speed.</p>
    <vs-input-number
      v-model="maximumNumberTransactions"
      label="How many messages do you need to send?"
      class="justify-start bg-transparent mb-8"
    />

    <p>Please note: when changing the value, the Smart job counters are reset to zero.</p>
    <vs-checkbox
      color="success"
      v-model="isSkipSentMessage"
    >Skip users who have already been sent a message</vs-checkbox>
    
    <vs-checkbox
      color="success"
      v-model="isDeleteAfterSendingMessage"
    >Delete after sending the message</vs-checkbox>
  </vx-card>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'fp-direct-message-number-of-action',
  computed: {
    ...mapFields([
      'taskConfigurations.maximumNumberTransactions',
      'taskConfigurations.isSkipSentMessage',
      'taskConfigurations.isDeleteAfterSendingMessage'
    ])
  }
};
</script>

<style>
.vs-input-number--input {
  border: 1px solid #ddd;
}
</style>