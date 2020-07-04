<template>
  <vx-card title="Enter the name of the user-resource (without @ @)">
    <vs-textarea v-model="username" placeholder="For example: ContestPark" width="300px" />
  </vx-card>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'fp-choose-user-resource',
  computed: {
    ...mapFields(['taskConfigurations.username'])
  }
};
</script>
