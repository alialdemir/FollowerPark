<template>
  <div>
    <vx-card
      title="User Lists"
      :refreshContentAction="true"
      newButtonText="Create User list"
      :addCardAction="true"
      @refresh="closeCardAnimation"
      @add="isShowCreatePanel=true"
      class="overflow-hidden"
    >
      <vs-table stripe :data="myUserLists">
        <template slot="thead">
          <vs-th style="width:50px"></vs-th>
          <vs-th>List name</vs-th>
          <vs-th>Count</vs-th>
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
                      color="dark"
                      type="flat"
                      @click="selectedUserList = item; isShowCreatePanel=true"
                    >Edit</vs-button>
                  </vs-dropdown-item>
                  <vs-dropdown-item divider>
                    <vs-button
                      size="small"
                      color="danger"
                      type="flat"
                      @click="deleteUserList(item)"
                    >Delete</vs-button>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </vs-td>

            <vs-td>{{ item.listName }}</vs-td>
            <vs-td>{{ item.userNames.length }}</vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>

    <vx-card
      v-if="isShowCreatePanel"
      :title="selectedUserList.id === 0 ?'Create User List': 'Edit User List'"
      class="mt-4"
    >
      <fp-create-user-list :selectedUserList="selectedUserList" @saveList="saveList" />
    </vx-card>
  </div>
</template>

<script>
export default {
  name: 'fp-user-list',

  created() {
    setTimeout(() => {
      this.$store.dispatch('getUserList');
    }, 500);
  },

  computed: {
    myUserLists() {
      return this.$store.state.myUserLists;
    }
  },

  data() {
    return {
      isShowCreatePanel: false,
      selectedUserList: {
        id: 0,
        listName: '',
        userNames: []
      }
    };
  },

  methods: {
    saveList() {
      this.isShowCreatePanel = false;

      this.selectedUserList = {
        id: 0,
        listName: '',
        userNames: []
      };
    },

    closeCardAnimation(card) {
      this.$store.dispatch('getUserList');
      card.removeRefreshAnimation(3000);
    },

    deleteUserList(item) {
      this.selectedUserList = item;

      this.$vs.dialog({
        type: 'confirm',
        'accept-text': 'Delete',
        color: 'danger',
        title: `Delete user list?`,
        text: 'Are you sure you want to delete the user list?',
        accept: this.deleteUserListAccept
      });
    },

    deleteUserListAccept() {
      this.$vs.notify({
        color: 'success',
        title: 'Deleted user list',
        text: 'The selected user list was successfully deleted'
      });

      this.$store.dispatch(
        'deleteMyUserList',
        JSON.parse(JSON.stringify(this.selectedUserList))
      );
      this.selectedUserList = {
        id: 0,
        listName: '',
        userNames: []
      };
    }
  }
};
</script>