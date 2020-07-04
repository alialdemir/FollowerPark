
<template>
  <vx-card
    title="Tasks"
    :refreshContentAction="true"
    :addCardAction="true"
    @refresh="closeCardAnimation"
    @add="$router.push('/task/new')"
    class="overflow-hidden"
  >
    <vs-table stripe :data="tasks">
      <template slot="thead">
        <vs-th style="width:50px"></vs-th>
        <vs-th>Action</vs-th>
        <vs-th>Status</vs-th>
        <vs-th>Resource</vs-th>
        <vs-th>Total</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(item, indextr) in data">
          <vs-td>
            <vs-dropdown>
              <a class="a-icon" href="#">
                <vs-icon size="large" class icon="expand_more"></vs-icon>
              </a>

              <vs-dropdown-menu>
                <vs-dropdown-item>
                  <vs-button
                    size="small"
                    :color="item.status === 1 ? 'danger' : 'success'"
                    type="flat"
                    @click="changeTaskStatus(item)"
                  >{{item.status === 1 ? 'Stop' : 'Start'}}</vs-button>
                </vs-dropdown-item>
                <vs-dropdown-item>
                  <vs-button
                    size="small"
                    color="dark"
                    type="flat"
                    @click="popupActivo4 = true; selectedTask = item"
                  >Detail</vs-button>
                </vs-dropdown-item>
                <vs-dropdown-item @click="$store.dispatch('deleteTask',item.taskId)" divider>
                  <vs-button
                    size="small"
                    color="danger"
                    :disabled="item.status !== 0"
                    type="flat"
                    @click="$store.dispatch('deleteTask',item.taskId)"
                  >Delete</vs-button>
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </vs-td>
          <vs-td>
            <vs-button
              disabled
              :color="item.status === 1 ? 'success' : 'danger'"
              type="flat"
            >{{item.status === 1 ? 'Running' : 'Stopped'}}</vs-button>
          </vs-td>
          <vs-td>{{ taskActions(item.action) }}</vs-td>
          <vs-td>{{ resources(item) }}</vs-td>
          <vs-td>{{ `${item.numberTransactions}/${item.maximumNumberTransactions}` }}</vs-td>
        </vs-tr>
      </template>
    </vs-table>

    <vs-popup fullscreen title="Task Detail" :active.sync="popupActivo4">
      <fp-task-tabs
        :task="selectedTask"
        :logs="$store.state.logs"
        @getLog="$store.dispatch('getLog', selectedTask.taskId)"
      />
    </vs-popup>
  </vx-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      popupActivo4: false,
      selectedTask: {}
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },

    ...mapGetters(['taskActions', 'resources'])
  },
  methods: {
    changeTaskStatus(task) {
      if (task.status === 0) {
        this.$store.dispatch('taskStart', {
          task,
          whereUserResources: this.$store.state.whereUserResources,
          taskActions: this.$store.state.taskActions
        });
      } else if (task.status === 1) {
        this.$store.dispatch('taskStop', task);
      }
    },

    closeCardAnimation(card) {
      card.removeRefreshAnimation(3000);
    }
  },

  created() {
    this.$vs.loading({
      text: 'Connecting to your Instagram account...'
    });
    setTimeout(() => {
      this.$store.dispatch('messageListener'); //loading
      this.$store.dispatch('getCurrentUser');
      this.$store.dispatch('initDatabase');

      setTimeout(() => {
        this.$store.dispatch('getTask', {
          whereUserResources: this.$store.state.whereUserResources,
          taskActions: this.$store.state.taskActions
        });
        this.$vs.loading.close();
      }, 500);
    }, 500);
  }
};
</script>