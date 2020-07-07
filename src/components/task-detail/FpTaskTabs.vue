<template>
  <vs-tabs>
    <vs-tab @click="onChangeTab('detail')" label="Detail">
      <div class="con-tab-ejemplo">
        <vs-list-item v-if="task.taskId" title="Task Id" :subtitle="`${task.taskId}`"></vs-list-item>

        <vs-list-item title="Task Status" :subtitle="task.status === 1 ? 'Running': 'Stopped'"></vs-list-item>

        <vs-list-item
          v-if="task.firstOldUsersUnfollow"
          title="First, let the old users unfollow"
          :subtitle="task.firstOldUsersUnfollow ? 'Yes': 'No'"
        ></vs-list-item>

        <vs-list-item
          v-if="task.maximumNumberTransactions && task.numberTransactions"
          title="Range of people removed from follow-up"
          :subtitle="`${task.numberTransactions}/${task.maximumNumberTransactions}`"
        ></vs-list-item>

        <vs-list-item
          v-if="task.maximumNumberTransactions && task.numberTransactions"
          title="Action"
          :subtitle="taskActions(task.action)"
        ></vs-list-item>

        <vs-list-item v-if="task.action" title="Resource" :subtitle="resources(task)"></vs-list-item>

        <vs-list-item v-if="task.intervalSpeed" title="Speed" :subtitle="speed(task.intervalSpeed)"></vs-list-item>

        <vs-list-item
          v-if="task.unfollowFollowerParkFollowing"
          title="You will unfollow the followers of FollowerPark"
          :subtitle="task.unfollowFollowerParkFollowing ? 'Yes': 'No'"
        ></vs-list-item>

        <vs-list-item v-if="task.username" title="Username" :subtitle="task.username">
          <vs-button
            color="primary"
            target="_blank"
            type="flat"
            :href="`https://instagram.com/${task.username}`"
          >{{task.username}}</vs-button>
        </vs-list-item>
      </div>
    </vs-tab>
    <vs-tab @click="onChangeTab('logs')" label="Logs">
      <fp-task-logs :logs="getLogs" />
    </vs-tab>
  </vs-tabs>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'fp-task-tabs',
  props: {
    task: {
      type: Object,
      required: true
    },
    logs: {
      type: Array,
      required: false
    }
  },
  computed: {
    getLogs() {
      return this.$props.logs;
    },
    ...mapGetters(['taskActions', 'resources', 'speed'])
  },
  methods: {
    onChangeTab(tab) {
      switch (tab) {
        case 'logs':
          this.$emit('getLog');
          break;

        default:
          break;
      }
    }
  }
};
</script>