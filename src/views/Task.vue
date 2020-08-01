
<template>
  <vx-card
    :title="$t('Tasks')"
    :refreshContentAction="true"
    :addCardAction="true"
    @refresh="closeCardAnimation"
    @add="$router.push('/task/new')"
    class="overflow-hidden"
  >
    <vs-table stripe :data="tasks">
      <template slot="thead">
        <vs-th style="width:50px"></vs-th>
        <vs-th>{{$t('Status')}}</vs-th>
        <vs-th>{{$t('Action')}}</vs-th>
        <vs-th>{{$t('Resource')}}</vs-th>
        <vs-th>{{$t('Total')}}</vs-th>
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
                    :disabled="item.numberTransactions === item.maximumNumberTransactions"
                    size="small"
                    :color="item.status === 1 ? 'danger' : 'success'"
                    type="flat"
                    @click="changeTaskStatus(item)"
                  >{{$t(item.status === 1 ? 'Stop' : 'Start')}}</vs-button>
                </vs-dropdown-item>
                <vs-dropdown-item>
                  <vs-button
                    size="small"
                    color="dark"
                    type="flat"
                    @click="popupActivo4 = true; selectedTask = item"
                  >{{$t('Detail')}}</vs-button>
                </vs-dropdown-item>
                <vs-dropdown-item divider>
                  <vs-button
                    size="small"
                    color="danger"
                    :disabled="item.status !== 0 && item.numberTransactions !== item.maximumNumberTransactions"
                    type="flat"
                    @click="deleteTask(item)"
                  >{{$t('Delete')}}</vs-button>
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </vs-td>
          <vs-td>
            <vs-button
              disabled
              :color="item.status === 1 ? 'success' : 'danger'"
              type="flat"
            >{{$t(item.status === 1 ? 'Running' : 'Stopped')}}</vs-button>
          </vs-td>
          <vs-td>{{ taskActions(item.action) }}</vs-td>
          <vs-td>{{ resources(item) }}</vs-td>
          <vs-td>{{ `${item.numberTransactions}/${item.maximumNumberTransactions}` }}</vs-td>
        </vs-tr>
      </template>
    </vs-table>

    <vs-popup fullscreen :title="$t('TaskDetail')" :active.sync="popupActivo4">
      <fp-task-tabs
        :task="selectedTask"
        :logs="$store.state.logs"
        @getLog="$store.dispatch('getLog', selectedTask.id)"
      />
    </vs-popup>
  </vx-card>
</template>

<script>
import { mapGetters } from 'vuex';
import i18n from '@/i18n/i18n';

export default {
  data() {
    return {
      popupActivo4: false,
      selectedTask: {},
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },

    ...mapGetters(['taskActions', 'resources']),
  },

  methods: {
    changeTaskStatus(task) {
      if (task.status === 0) {
        this.$store.dispatch('taskStart', {
          task,
          whereUserResources: this.$store.state.whereUserResources,
          taskActions: this.$store.state.taskActions,
        });
      } else if (task.status === 1) {
        this.$store.dispatch('taskStop', task);
      }
    },

    closeCardAnimation(card) {
      card.removeRefreshAnimation(3000);
    },

    deleteTask(task) {
      this.selectedTask = task;

      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: i18n.t('DeleteTask') + '?',
        text: i18n.t('AreYouSureYouWantToDeleteTheTask'),
        'accept-text': i18n.t('Accept'),
        'cancel-text': i18n.t('Cancel'),
        accept: this.deleteTaskAccept,
      });
    },

    deleteTaskAccept() {
      this.$vs.notify({
        color: 'success',
        title: i18n.t('DeleteTask'),
        text: i18n.t('TheSelectedTaskWasSuccessfullyDeleted'),
        position: 'top-center',
      });

      this.$store.dispatch('deleteTask', this.selectedTask.id);
    },
  },

  created() {
    this.$vs.loading({
      text: i18n.t('ConnectingToYourInstagramAccount'),
    });

    setTimeout(() => {
      this.$store.dispatch('getTask', {
        whereUserResources: this.$store.state.whereUserResources,
        taskActions: this.$store.state.taskActions,
      });
      this.$vs.loading.close();
    }, 1000);
  },
};
</script>