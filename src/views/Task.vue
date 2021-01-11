
<template>
  <div>
    <fp-extension-installed />
    <vx-card
      :title="$t('Tasks')"
      :addCardAction="true"
      @add="$router.push('/task/new')"
      class="overflow-hidden"
    >
      <vs-table stripe :data="tasks">
        <template slot="thead">
          <vs-th>{{ $t("Status") }}</vs-th>
          <vs-th>{{ $t("Action") }}</vs-th>
          <vs-th>{{ $t("Resource") }}</vs-th>
          <vs-th>{{ $t("Total") }}</vs-th>
          <vs-th style="width: 50px"></vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(item, indextr) in data">
            <vs-td>
              <vs-button
                disabled
                :color="item.status === true ? 'success' : 'danger'"
                type="flat"
                >{{
                  $t(item.status === true ? "Running" : "Stopped")
                }}</vs-button
              >
            </vs-td>
            <vs-td>{{ taskActions(item.action) }}</vs-td>
            <vs-td>{{ resources(item) }}</vs-td>
            <vs-td>{{
              `${item.numberTransactions || 0}/${
                item.maximumNumberTransactions || 0
              }`
            }}</vs-td>
            <vs-td>
              <vs-dropdown class="cursor-pointer" vs-trigger-click>
                <vs-button
                  size="small"
                  radius
                  color="dark"
                  type="border"
                  icon="more_vert"
                ></vs-button>

                <vs-dropdown-menu>
                  <vs-dropdown-item>
                    <vs-button
                      :disabled="
                        item.numberTransactions ===
                        item.maximumNumberTransactions
                      "
                      size="small"
                      :color="item.status === true ? 'danger' : 'success'"
                      type="flat"
                      @click="changeTaskStatus(item)"
                      >{{
                        $t(item.status === true ? "Stop" : "Start")
                      }}</vs-button
                    >
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <vs-button
                      size="small"
                      color="dark"
                      type="flat"
                      @click="
                        popupActivo4 = true;
                        selectedTask = item;
                      "
                      >{{ $t("Detail") }}</vs-button
                    >
                  </vs-dropdown-item>
                  <vs-dropdown-item divider>
                    <vs-button
                      size="small"
                      color="danger"
                      :disabled="
                        item.status !== false &&
                        item.numberTransactions !==
                          item.maximumNumberTransactions
                      "
                      type="flat"
                      class="w-full"
                      @click="deleteTask(item)"
                      >{{ $t("Delete") }}</vs-button
                    >
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>

      <vs-popup
        fullscreen
        :title="$t('TaskDetail')"
        :active.sync="popupActivo4"
      >
        <fp-task-tabs
          :task="selectedTask"
          :logs="$store.state.logs"
          @getLog="$store.dispatch('getLog', selectedTask.taskId)"
        />
      </vs-popup>
    </vx-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import i18n from "@/i18n/i18n";
import { mapFields } from "vuex-map-fields";

export default {
  data() {
    return {
      popupActivo4: false,
      selectedTask: {},
    };
  },

  computed: {
    ...mapFields(["tasks"]),
    ...mapGetters(["taskActions", "resources"]),
  },

  methods: {
    changeTaskStatus(task) {
      if (task.status === false) {
        this.$store.dispatch("taskStart", task);
      } else if (task.status === true) {
        this.$store.dispatch("taskStop", task);
      }
    },

    closeCardAnimation(card) {
      card.removeRefreshAnimation(3000);
    },

    deleteTask(task) {
      this.selectedTask = task;

      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: i18n.t("DeleteTask") + "?",
        text: i18n.t("AreYouSureYouWantToDeleteTheTask"),
        acceptText: i18n.t("Accept"),
        cancelText: i18n.t("Cancel"),
        accept: this.deleteTaskAccept,
      });
    },

    deleteTaskAccept() {
      this.$vs.notify({
        color: "success",
        title: i18n.t("DeleteTask"),
        text: i18n.t("TheSelectedTaskWasSuccessfullyDeleted"),
        position: "top-center",
      });

      this.$store.dispatch("deleteTask", this.selectedTask.taskId);
    },
  },

  created() {
    this.$vs.loading({
      text: i18n.t("ConnectingToYourInstagramAccount"),
    });

    setTimeout(() => {
      this.$store.dispatch("getTask", {
        whereUserResources: this.$store.state.whereUserResources,
        taskActions: this.$store.state.taskActions,
      });
      this.$vs.loading.close();
    }, 1000);
  },
};
</script>