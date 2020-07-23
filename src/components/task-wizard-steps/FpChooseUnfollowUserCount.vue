<template>
  <div>
    <vx-card title="How many followers should not be followed?">
      <vs-input-number
        v-model="maximumNumberTransactions"
        label="Unfollow user count:"
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
    ...mapFields([
      'taskConfigurations.maximumNumberTransactions',
    ])
  }
};
</script>
<style>
.vs-input-number--input {
  border: 1px solid #ddd;
}
</style>
