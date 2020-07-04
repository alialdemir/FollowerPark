<template>
  <div>
    <vs-table stripe :data="getLogs">
      <template slot="thead">
        <vs-th>Action</vs-th>
        <vs-th>User Id</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(item, indextr) in data">
          <vs-td v-if="item.username" :data="item.username">
            <vs-button
              color="primary"
              target="_blank"
              type="flat"
              :href="`https://instagram.com/${item.username}`"
            >{{item.username}}</vs-button>
            {{getAction(item.actionId)}}
          </vs-td>
          <vs-td v-if="item.id" :data="item.id">{{item.id}}</vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>
<script>
export default {
  name: 'fp-task-logs',
  props: {
    logs: {
      type: Array,
      required: false
    }
  },
  computed: {
    getLogs() {
      return this.$props.logs;
    }
  },
  methods: {
    getAction(actionId) {
      switch (actionId) {
        case 2:
          return 'was followed';
        case 3:
          return 'was unfollowed';

        default:
          return '';
      }
    }
  }
};
</script>