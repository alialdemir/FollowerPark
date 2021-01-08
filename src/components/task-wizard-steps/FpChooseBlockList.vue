<template>
  <vx-card :title="$t('ChooseBlockList')">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="10">
        <vs-select v-model="userList" @change="onChangeBlockList" class="w-full select-large">
          <vs-select-item
            :key="index"
            :value="item.usernames"
            :text="item.listName"
            v-for="(item,index) in blockList"
          />
        </vs-select>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
        <vs-button
          color="primary"
          type="border"
          :to="{ path: '/block-list?q=c'}"
        >{{$t('CreateList')}}</vs-button>
      </vs-col>
    </vs-row>
  </vx-card>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'fp-choose-block-list',

  created() {
    this.$store.dispatch('getBlockList');
  },

  computed: {
    blockList() {
      return this.$store.state.blockList;
    },
    ...mapFields(['taskConfigurations.userList']),
  },

  methods: {
    onChangeBlockList() {
      this.$store.dispatch('setTaskConfigurations', {
        maximumNumberTransactions: this.userList.length,
      });
    },
  },
};
</script>
