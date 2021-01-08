
<template>
  <form-wizard
    ref="wizard"
    @on-complete="createTask"
    @on-change="onChangeWizard"
    color="rgba(var(--vs-success), 1)"
    errorColor="rgba(var(--vs-danger), 1)"
    :title="null"
    :subtitle="null"
    finishButtonText="Create Task"
  >
    <tab-content class="mb-5" :before-change="validateStep1">
      <!-- tab 1 content  v-bind::wizard="$refs.wizard" -->
      <fp-choose-action @click="changeWizard" />
    </tab-content>

    <!-- tab 2 content -->
    <tab-content
      v-if="action === 1 || action === 2 || action === 3 || action === 6"
      class="mb-5"
      :before-change="validateStep2"
    >
      <fp-choose-resource
        @click="changeWizard"
        v-if="action === 1 || action === 2"
      />
      <fp-choose-unfollow-option @click="changeWizard" v-if="action === 3" />

      <fp-direct-message-source @click="changeWizard" v-if="action === 6" />
    </tab-content>

    <!-- tab 3 content -->
    <tab-content
      v-if="
        resource === 1 ||
        resource === 2 ||
        resource === 3 ||
        resource === 4 ||
        unfollowOption > 0 ||
        directMessageSource === 2
      "
      class="mb-5"
      :before-change="validateStep3"
    >
      <fp-choose-user-resource
        @click="changeWizard"
        v-if="resource === 3 && unfollowOption === 0"
      />

      <fp-georaphical-location @click="changeWizard" v-if="resource === 1" />

      <fp-hastag @click="changeWizard" v-if="resource === 2" />

      <fp-choose-unfollow-user-count
        @click="changeWizard"
        v-if="
          unfollowOption === 1 || unfollowOption === 2 || unfollowOption === 3
        "
      />

      <fp-choose-block-list @click="changeWizard" v-if="unfollowOption === 4" />

      <fp-user-list
        @click="changeWizard"
        v-if="resource === 4 || directMessageSource === 2"
      />
    </tab-content>

    <!-- tab 4 content -->
    <tab-content
      v-if="
        action === 1 ||
        action === 2 ||
        resource === 4 ||
        directMessageSource === 1 ||
        directMessageSource === 2
      "
      class="mb-5"
      :before-change="validateStep4"
    >
      <fp-choose-where-user-resource
        @click="changeWizard"
        v-if="resource === 4 || (userList.length > 0 && resource > 1)"
      />

      <fp-choose-like-post-count @click="changeWizard" v-if="action === 1" />

      <fp-direct-message-list
        @click="changeWizard"
        v-if="directMessageSource === 1 || directMessageSource === 2"
      />

      <fp-choose-follow-user-count
        v-if="action !== 1 && (resource === 1 || resource === 2)"
      />
    </tab-content>

    <!-- tab 5 content -->
    <tab-content
      v-if="directMessageSource === 1 || directMessageSource === 2"
      class="mb-5"
      :before-change="validateStep5"
    >
      <fp-direct-message-number-of-action
        @click="changeWizard"
        v-if="directMessageSource === 1 || directMessageSource === 2"
      />
    </tab-content>

    <!-- tab 6 content -->
    <tab-content
      v-if="
        action === 2 ||
        resource === 4 ||
        resource === 2 ||
        resource === 1 ||
        directMessageSource === 1 ||
        directMessageSource === 2
      "
      class="mb-5"
      :before-change="validateStep6"
    >
      <fp-choose-speed-action
        @click="changeWizard"
        v-if="
          whereUserResource > 0 ||
          directMessageSource === 1 ||
          directMessageSource === 2 ||
          resource === 1 ||
          resource === 2
        "
      />
    </tab-content>
  </form-wizard>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import { mapFields } from "vuex-map-fields";
import { taskConfigurations } from "../middleware/enums";
import { actionType, resource } from "@/middleware/enums";

export default {
  methods: {
    validateStep1() {
      return new Promise((resolve, reject) => {
        if (this.action > 0) {
          resolve(true);
        } else {
          this.showError("Choose action");

          reject("correct all values");
        }
      });
    },

    validateStep2() {
      return new Promise((resolve, reject) => {
        if (this.resource <= 0 && this.action === actionType.follow) {
          this.showError("Choose resouce");
        } else if (
          this.unfollowOption <= 0 &&
          this.action === actionType.unfollow
        ) {
          this.showError("Choose unfollow resource");
        } else if (
          this.directMessageSource <= 0 &&
          this.action === actionType.direct
        ) {
          this.showError("Choose direct message resouce");
        } else {
          resolve(true);

          return;
        }

        reject("correct all values");
      });
    },

    validateStep3() {
      return new Promise((resolve, reject) => {
        if (
          this.resource === resource.geographicalLocation &&
          this.georaphicalLocations.length <= 0 &&
          this.interactWithPosts === false &&
          this.action === actionType.follow
        ) {
          this.showError(
            "You must specify the geographical locations of the posts."
          );
        } else if (
          this.resource === resource.geographicalLocation &&
          this.georaphicalLocations.length > 0 &&
          this.interactWithPosts === true &&
          this.interactWithPostsDays <= 0 &&
          this.action === actionType.follow
        ) {
          this.showError(
            "You must specify the number of days to interact with posts."
          );
        } else if (
          this.directMessageSource <= 0 &&
          this.action === actionType.direct
        ) {
          this.showError("Choose direct message source.");
        } else if (
          this.userList.length <= 0 &&
          this.action === actionType.follow &&
          this.resource === resource.user
        ) {
          this.showError("Write a usernames.");
        } else if (
          this.hashtags.length <= 0 &&
          this.action === actionType.follow &&
          this.resource === resource.hashtag
        ) {
          this.showError("Write a hashtags.");
        } else if (
          this.userList.length <= 0 &&
          this.action === actionType.follow &&
          this.resource === resource.userList
        ) {
          this.showError("Choose user list.");
        } else {
          resolve(true);

          return;
        }

        reject("correct all values");
      });
    },

    validateStep4() {
      return new Promise((resolve, reject) => {
        if (this.directMessageId <= 0 && this.action === actionType.direct) {
          this.showError("Choose direct message list.");
        } else if (!(this.maximumNumberTransactions > 0)) {
          this.showError("Choose transactions count");
        } else if (
          this.whereUserResource === 0 &&
          this.action === actionType.follow &&
          (this.resource === resource.user ||
            this.resource === resource.userList)
        ) {
          this.showError("Choose user source.");
        } else if (
          this.userList.length <= 0 &&
          this.action === actionType.follow &&
          this.resource === resource.userList
        ) {
          this.showError("Choose direct user list.");
        } else {
          resolve(true);

          return;
        }

        reject("correct all values");
      });
    },

    validateStep5() {
      return new Promise((resolve, reject) => {
        if (this.userList.length > 0 || this.directMessageId > 0) {
          resolve(true);
        } else {
          reject("correct all values");
        }
      });
    },

    validateStep6() {
      return new Promise((resolve, reject) => {
        if (this.intervalSpeed > 0) {
          resolve(true);
        } else {
          this.showError("Choose speed");

          reject("correct all values");
        }
      });
    },

    changeWizard() {
      this.$refs.wizard.nextTab();
    },

    showError(text) {
      this.$vs.notify({
        text: text,
        color: "danger",
        position: "top-center",
        iconPack: "feather",
        icon: "icon-alert-triangle",
      });
    },

    createTask() {
      this.$store.dispatch("addNewTask", this.$store.state.taskConfigurations);
      this.$vs.notify({
        title: "The task has been created.",
        text: "You can start when you want the task.",
        color: "success",
        position: "top-center",
        iconPack: "feather",
        icon: "icon-check",
      });

      this.$store.dispatch("setTaskConfigurations", taskConfigurations);

      this.$router.push({ path: "/" });
    },

    onChangeWizard(prevIndex, nextIndex) {
      if (nextIndex > this.taskConfigurationsHistory.nextIndex) {
        this.taskConfigurationsHistory.items[
          nextIndex
        ] = this.taskConfigurations;
      } else if (prevIndex === this.taskConfigurationsHistory.nextIndex) {
        const historyItem = this.taskConfigurationsHistory.items[prevIndex - 1];
        if (historyItem) {
          const prevConfigurations = JSON.parse(JSON.stringify(historyItem));
          this.$store.dispatch("setTaskConfigurations", prevConfigurations);
        }
      }

      this.taskConfigurationsHistory.nextIndex = nextIndex;
    },
  },

  data() {
    return {
      taskConfigurationsHistory: {
        nextIndex: -1,
        items: [taskConfigurations],
      },
    };
  },

  computed: {
    ...mapFields([
      "taskConfigurations",
      "taskConfigurations.action",
      "taskConfigurations.resource",
      "taskConfigurations.whereUserResource",
      "taskConfigurations.unfollowOption",
      "taskConfigurations.directMessageSource",
      "taskConfigurations.userList",
      "taskConfigurations.hashtags",
      "taskConfigurations.directMessageId",
      "taskConfigurations.intervalSpeed",
      "taskConfigurations.maximumNumberTransactions",
      "taskConfigurations.interactWithPosts",
      "taskConfigurations.interactWithPostsDays",
      "taskConfigurations.georaphicalLocations",
    ]),
  },

  components: {
    FormWizard,
    TabContent,
  },
};
</script>
    