<template>
  <div>
    <vx-card
      title="Direct Messages"
      :refreshContentAction="true"
      newButtonText="Create Direct Messages"
      :addCardAction="true"
      @refresh="closeCardAnimation"
      @add="isShowCreatePanel=true"
      class="overflow-hidden"
    >
      <vs-table stripe :data="directMessages">
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
                      @click="selectedDirectMessage = item; isShowCreatePanel=true"
                    >Edit</vs-button>
                  </vs-dropdown-item>
                  <vs-dropdown-item divider>
                    <vs-button
                      size="small"
                      color="danger"
                      type="flat"
                      @click="deleteDirectMessage(item)"
                    >Delete</vs-button>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </vs-td>

            <vs-td>{{ item.listName }}</vs-td>
            <vs-td>{{ item.messages.length }}</vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>

    <vx-card
      v-if="isShowCreatePanel"
      :title="selectedDirectMessage.id === 0 ?'Create Direct Message': 'Edit Direct Message'"
      class="mt-4"
    >
      <fp-create-direct-message
        :selectedDirectMessage="selectedDirectMessage"
        @saveList="saveList"
      />
    </vx-card>
  </div>
</template>

<script>
export default {
  name: 'fp-direct-messages',

  created() {
    setTimeout(() => {
      this.$store.dispatch('getDirectMessages');
    }, 500);
  },

  computed: {
    directMessages() {
      return this.$store.state.directMessages;
    }
  },

  data() {
    return {
      isShowCreatePanel: false,
      selectedDirectMessage: {
        id: 0,
        listName: '',
        messages: []
      }
    };
  },

  methods: {
    saveList() {
      this.isShowCreatePanel = false;

      this.selectedDirectMessage = {
        id: 0,
        listName: '',
        messages: []
      };
    },

    closeCardAnimation(card) {
      this.$store.dispatch('getDirectMessages');
      card.removeRefreshAnimation(3000);
    },

    deleteDirectMessage(item) {
      this.selectedDirectMessage = item;

      this.$vs.dialog({
        type: 'confirm',
        'accept-text': 'Delete',
        color: 'danger',
        title: `Delete direct messages?`,
        text: 'Are you sure you want to delete the direct messages?',
        accept: this.deleteDirectMessageAccept
      });
    },

    deleteDirectMessageAccept() {
      this.$vs.notify({
        color: 'success',
        title: 'Deleted direct messages',
        text: 'The selected direct messages was successfully deleted'
      });

      this.$store.dispatch(
        'deleteDirectMessage',
        JSON.parse(JSON.stringify(this.selectedDirectMessage))
      );
      this.selectedDirectMessage = {
        id: 0,
        listName: '',
        messages: []
      };
    }
  }
};
</script>