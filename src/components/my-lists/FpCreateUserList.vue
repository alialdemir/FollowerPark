<template>
  <div class="vx-row">
    <div class="vx-col sm:w-1/2 w-full mb-2">
      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-input autofocus class="w-full" label="List name" v-model="userList.listName" />
        </div>
      </div>
      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-textarea
            label="Write the name of each user as a separate line"
            v-model="userList.userNames"
          />
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col w-full">
          <vs-button @click="saveList" color="success" class="mr-3 mb-2">Save</vs-button>
          <vs-button @click="$emit('saveList')" color="danger" class="mr-3 mb-2">Cancel</vs-button>
        </div>
      </div>
    </div>
    <div class="vx-col sm:w-1/2 w-full mb-2">
      <h4>Creating user list rules:</h4>
      <p>- Format of ID usernames is not supported</p>
      <p>- Usernames must not contain the @ sign</p>
      <p>- Each username must be written as a separate line</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fp-create-user-list',
  props: {
    selectedUserList: {
      type: Object,
      default: {
        id: 0,
        listName: '',
        userNames: []
      }
    }
  },

  data() {
    return {
      userList: {
        listName: this.$props.selectedUserList.listName,
        userNames: this.$props.selectedUserList.userNames.join('\n')
      }
    };
  },

  methods: {
    saveList() {
      if (!this.userList.listName || !this.userList.userNames) {
        return;
      }

      const dispatchName =
        this.$props.selectedUserList.id > 0
          ? 'updateMyUserList'
          : 'addMyUserList';

      this.$store.dispatch(dispatchName, {
        id: this.$props.selectedUserList.id,
        listName: this.userList.listName,
        userNames: this.userList.userNames.split('\n')
      });

      this.$emit('saveList');
    }
  }
};
</script>