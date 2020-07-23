<template>
  <div>
    <vx-card
      title="Block List"
      :refreshContentAction="true"
      newButtonText="Create Block list"
      :addCardAction="true"
      @refresh="closeCardAnimation"
      @add="isShowCreatePanel=true"
      class="overflow-hidden"
    >
      <vs-table stripe :data="blockList">
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
                    <vs-button size="small" color="dark" type="flat" @click="edit(item)">Edit</vs-button>
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

    <vs-popup
      v-if="isShowCreatePanel"
      :button-close-hidden="true"
      :title="selectedBlockList.id === 0 ?'Create Block List': 'Edit Block List'"
      :active.sync="isShowCreatePanel"
    >
      <fp-create-block-list :selectedBlockList="selectedBlockList" @saveList="saveList" />
    </vs-popup>
  </div>
</template>

<script>
export default {
  name: 'fp-block-list',

  created() {
    if (this.$route.query.q === 'c') {
      this.isShowCreatePanel = true;
      this.$router.push(this.$route.path);
    }

    setTimeout(() => {
      this.$store.dispatch('getBlockList');
    }, 500);
  },

  computed: {
    blockList() {
      return this.$store.state.blockList;
    },
  },

  data() {
    return {
      isShowCreatePanel: false,
      selectedBlockList: {
        id: 0,
        listName: '',
        userNames: [],
      },
    };
  },

  watch: {
    isShowCreatePanel(val) {
      if (val === false) {
        this.selectedBlockList = {
          id: 0,
          listName: '',
          userNames: [],
        };
      }
    },
  },

  methods: {
    saveList() {
      this.isShowCreatePanel = false;

      this.selectedBlockList = {
        id: 0,
        listName: '',
        userNames: [],
      };
    },

    closeCardAnimation(card) {
      this.$store.dispatch('getBlockList');
      card.removeRefreshAnimation(3000);
    },

    deleteUserList(item) {
      this.selectedBlockList = item;

      this.$vs.dialog({
        type: 'confirm',
        'accept-text': 'Delete',
        color: 'danger',
        title: `Delete block list?`,
        text: 'Are you sure you want to delete the block list?',
        accept: this.deleteUserListAccept,
      });
    },

    deleteUserListAccept() {
      this.$vs.notify({
        color: 'success',
        title: 'Deleted block list',
        text: 'The selected block list was successfully deleted',
      });

      this.$store.dispatch(
        'deleteBlockList',
        JSON.parse(JSON.stringify(this.selectedBlockList))
      );

      this.selectedBlockList = {
        id: 0,
        listName: '',
        userNames: [],
      };
    },

    edit(item) {
      this.selectedBlockList = item;
      this.isShowCreatePanel = true;
    },
  },
};
</script>