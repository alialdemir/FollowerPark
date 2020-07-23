<template>
  <vx-card title="Choose direct messages list">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="10">
        <vs-select v-model="directMessage" class="w-full select-large">
          <vs-select-item
            :key="index"
            :value="item.messages"
            :text="item.listName"
            v-for="(item,index) in directMessages"
          />
        </vs-select>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
        <vs-button color="primary" type="border" :to="{ path: '/direct-messages?q=c'}">CREATE LIST</vs-button>
      </vs-col>
    </vs-row>
  </vx-card>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'fp-direct-message-list',

  created() {
    this.$store.dispatch('getDirectMessages');
  },

  computed: {
    directMessages() {
      return this.$store.state.directMessages;
    },
    ...mapFields(['taskConfigurations.directMessage']),
  },
};
</script>
