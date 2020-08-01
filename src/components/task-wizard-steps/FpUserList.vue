<template>
  <vx-card :title="$t('ChooseUserList')">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="10">
        <vs-select v-model="userList" class="w-full select-large">
          <vs-select-item
            :key="index"
            :value="item.userNames"
            :text="item.listName"
            v-for="(item,index) in myUserLists"
          />
        </vs-select>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
        <vs-button
          color="primary"
          type="border"
          :to="{ path: '/user-list?q=c'}"
        >{{$t('CreateList')}}</vs-button>
      </vs-col>
    </vs-row>
  </vx-card>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'fp-user-list',

  created() {
    this.$store.dispatch('getUserList');
  },

  computed: {
    myUserLists() {
      return this.$store.state.myUserLists;
    },

    ...mapFields(['taskConfigurations.userList']),
  },
};
</script>
