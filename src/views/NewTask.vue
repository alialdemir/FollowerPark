
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
      v-if="action === 2 || action === 3 || action === 6"
      class="mb-5"
      :before-change="validateStep2"
    >
      <fp-choose-resource @click="changeWizard" v-if="action === 2" />
      <fp-choose-unfollow-option @click="changeWizard" v-if="action === 3" />

      <fp-direct-message-source @click="changeWizard" v-if="action === 6" />
    </tab-content>

    <!-- tab 3 content -->
    <tab-content
      v-if="resource === 1 ||resource === 3 || resource === 4 || unfollowOption > 0|| directMessageSource === 2"
      class="mb-5"
      :before-change="validateStep3"
    >
      <fp-choose-user-resource @click="changeWizard" v-if="resource === 3" />

      <fp-georaphical-location @click="changeWizard" v-if="resource === 1" />

      <fp-choose-unfollow-user-count
        @click="changeWizard"
        v-if="unfollowOption === 1 || unfollowOption === 2||  unfollowOption === 3"
      />

      <fp-choose-block-list @click="changeWizard" v-if="unfollowOption === 4" />

      <fp-user-list @click="changeWizard" v-if="resource === 4 || directMessageSource === 2" />
    </tab-content>

    <!-- tab 4 content -->
    <tab-content
      v-if="resource === 4 || action === 2 || directMessageSource === 1 || directMessageSource === 2"
      class="mb-5"
      :before-change="validateStep4"
    >
      <fp-choose-where-user-resource
        @click="changeWizard"
        v-if="resource === 4  || userList.length > 0"
      />

      <fp-direct-message-list
        @click="changeWizard"
        v-if="directMessageSource === 1 || directMessageSource === 2"
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
      v-if="action === 2 ||resource === 4 ||directMessageSource === 1 ||  directMessageSource === 2"
      class="mb-5"
      :before-change="validateStep6"
    >
      <fp-choose-speed-action
        @click="changeWizard"
        v-if="whereUserResource > 0 ||directMessageSource === 1 ||  directMessageSource === 2"
      />
    </tab-content>
  </form-wizard>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import { mapFields } from 'vuex-map-fields';
import { taskConfigurations } from '../middleware/enums';

export default {
  methods: {
    validateStep1() {
      return new Promise((resolve, reject) => {
        if (this.action > 0) {
          resolve(true);
        } else {
          reject('correct all values');
        }
      });
    },

    validateStep2() {
      return new Promise((resolve, reject) => {
        if (
          this.resource > 0 ||
          this.unfollowOption > 0 ||
          this.directMessageSource > 0
        ) {
          resolve(true);
        } else {
          reject('correct all values');
        }
      });
    },

    validateStep3() {
      return new Promise((resolve, reject) => {
        if (
          this.directMessageSource > 0 ||
          this.userList.length > 0 ||
          this.maximumNumberTransactions > 0
        ) {
          resolve(true);
        } else {
          reject('correct all values');
        }
      });
    },

    validateStep4() {
      return new Promise((resolve, reject) => {
        if (this.directMessage.length > 0 || this.userList.length > 0) {
          resolve(true);
        } else {
          reject('correct all values');
        }
      });
    },

    validateStep5() {
      return new Promise((resolve, reject) => {
        if (this.userList.length > 0 || this.directMessage.length > 0) {
          resolve(true);
        } else {
          reject('correct all values');
        }
      });
    },

    validateStep6() {
      return new Promise((resolve, reject) => {
        if (this.intervalSpeed > 0) {
          resolve(true);
        } else {
          reject('correct all values');
        }
      });
    },

    changeWizard() {
      this.$refs.wizard.nextTab();
    },

    createTask() {
      this.$store.dispatch('addNewTask', this.$store.state.taskConfigurations);
      this.$vs.notify({
        title: 'The task has been created.',
        text: 'You can start when you want the task.',
        color: 'success',
        position: 'top-center',
        iconPack: 'feather',
        icon: 'icon-check',
      });

      this.$store.dispatch('setTaskConfigurations', taskConfigurations);

      this.$router.push({ path: '/' });
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
          this.$store.dispatch('setTaskConfigurations', prevConfigurations);
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
      'taskConfigurations',
      'taskConfigurations.action',
      'taskConfigurations.resource',
      'taskConfigurations.whereUserResource',
      'taskConfigurations.unfollowOption',
      'taskConfigurations.directMessageSource',
      'taskConfigurations.userList',
      'taskConfigurations.directMessage',
      'taskConfigurations.intervalSpeed',
      'taskConfigurations.maximumNumberTransactions',
    ]),
  },
  components: {
    FormWizard,
    TabContent,
  },
};
</script>
    