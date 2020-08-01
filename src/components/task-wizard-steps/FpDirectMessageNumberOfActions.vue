<template>
  <vx-card :title="$t('NumberOfActions')">
    <p>{{$t('DirectMessageNumberOfActionsDescription')}}</p>
    <vs-input-number
      v-model="maximumNumberTransactions"
      :label="$t('HowManyMessagesDoYouNeedToSend')"
      class="justify-start bg-transparent mb-8"
    />

    <p>{{$t('PleaseNoteWhenChangingTheValueTheSmartJobCountersAreResetToZero')}}</p>
    <vs-checkbox
      color="success"
      v-model="isSkipSentMessage"
    >{{$t('SkipUsersWhoHaveAlreadyBeenSentAMessage')}}</vs-checkbox>

    <vs-checkbox
      color="success"
      v-model="isDeleteAfterSendingMessage"
    >{{$t('DeleteAfterSendingTheMessage')}}</vs-checkbox>
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
      'taskConfigurations.isDeleteAfterSendingMessage',
    ]),
  },
};
</script>

<style>
.vs-input-number--input {
  border: 1px solid #ddd;
}
</style>