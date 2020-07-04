
<template>
  <form-wizard
    ref="wizard"
    @on-complete="createTask"
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
    <tab-content v-if="action === 2 || action === 3" class="mb-5" :before-change="validateStep2">
      <fp-choose-resource @click="changeWizard" v-if="action === 2" />
      <fp-choose-unfollow-option @click="changeWizard" v-if="action === 3" />
    </tab-content>

    <!-- tab 3 content -->
    <tab-content
      v-if="resource === 3 || unfollowOption === 1"
      class="mb-5"
      :before-change="validateStep3"
    >
      <fp-choose-user-resource @click="changeWizard" v-if="resource === 3" />

      <fp-choose-unfollow-user-count @click="changeWizard" v-if="unfollowOption === 1" />
    </tab-content>

    <!-- tab 4 content -->
    <tab-content v-if="action === 2" class="mb-5" :before-change="validateStep4">
      <fp-choose-where-user-resource @click="changeWizard" v-if="username !== ''" />
    </tab-content>

    <!-- tab 5 content -->
    <tab-content v-if="action === 2" class="mb-5" :before-change="validateStep4">
      <fp-choose-speed-action @click="changeWizard" v-if="whereUserResource > 0" />
    </tab-content>
  </form-wizard>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import { mapFields } from 'vuex-map-fields';

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
        if (this.resource > 0 || this.unfollowOption > 0) {
          resolve(true);
        } else {
          reject('correct all values');
        }
      });
    },
    validateStep3() {
      return new Promise((resolve, reject) => {
        if (this.action > 0) {
          resolve(true);
        } else {
          reject('correct all values');
        }
      });
    },
    validateStep4() {
      return new Promise((resolve, reject) => {
        if (this.username !== '') {
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
        icon: 'icon-check'
      });
      this.$store.dispatch('setTaskConfigurations', {
        action: 0,
        resource: 0,
        username: '',
        userId: '',
        whereUserResource: 0,
        status: 0,
        intervalSpeed: 0,
        postsShortCode: [],
        unfollowOption: 0
      });
      this.$router.push({ path: '/' });
    }
  },
  computed: {
    ...mapFields([
      'taskConfigurations.username',
      'taskConfigurations.action',
      'taskConfigurations.resource',
      'taskConfigurations.whereUserResource',
      'taskConfigurations.unfollowOption'
    ])
  },
  components: {
    FormWizard,
    TabContent
  }
};
</script>
    