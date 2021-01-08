<template>
  <vs-table stripe :data="getLogs">
    <template slot="thead">
      <vs-th>Action</vs-th>
      <vs-th>User Id</vs-th>
    </template>
    <template slot-scope="{ data }">
      <vs-tr :key="indextr" v-for="(item, indextr) in data">
        <vs-td v-if="item.instagramUserName" :data="item.instagramUserName">
          <vs-button
            color="primary"
            target="_blank"
            type="flat"
            :href="`https://instagram.com/${item.instagramUserName}`"
            >{{ item.instagramUserName }}</vs-button
          >
          {{ getAction(item.actionId) }}
        </vs-td>
        <vs-td v-if="item.instagramUserId" :data="item.instagramUserId">{{
          item.instagramUserId
        }}</vs-td>
      </vs-tr>
    </template>
  </vs-table>
</template>
<script>
import { actionType } from "@/middleware/enums";
export default {
  name: "fp-task-logs",
  props: {
    logs: {
      type: Array,
      required: false,
    },
  },
  computed: {
    getLogs() {
      return this.$props.logs;
    },
  },
  methods: {
    getAction(actionId) {
      switch (actionId) {
        case actionType.like:
          return "was liked";
        case actionType.follow:
          return "was followed";
        case actionType.unfollow:
          return "was unfollowed";

        default:
          return "";
      }
    },
  },
};
</script>