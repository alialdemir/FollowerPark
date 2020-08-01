<template>
  <div>
    <vx-card
      :title="$t('BlockList')"
      :refreshContentAction="true"
      :newButtonText="$t('CreateBlockList')"
      :addCardAction="true"
      @refresh="closeCardAnimation"
      @add="isShowCreatePanel=true"
      class="overflow-hidden"
    >
      <vs-table stripe :data="blockList">
        <template slot="thead">
          <vs-th style="width:50px"></vs-th>
          <vs-th>{{$t('ListName')}}</vs-th>
          <vs-th>{{$t('Count')}}</vs-th>
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
                      @click="edit(item)"
                    >{{$t('Edit')}}</vs-button>
                  </vs-dropdown-item>
                  <vs-dropdown-item divider>
                    <vs-button
                      size="small"
                      color="danger"
                      type="flat"
                      @click="deleteUserList(item)"
                    >{{$t('Delete')}}</vs-button>
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
      :title="$t(selectedBlockList.id === 0 ? 'CreateBlockList': 'EditBlockList')"
      :active.sync="isShowCreatePanel"
    >
      <fp-create-block-list :selectedBlockList="selectedBlockList" @saveList="saveList" />
    </vs-popup>
  </div>
</template>

<script>
import i18n from '@/i18n/i18n';

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
        title: i18n.t('DeleteBlockList') + '?',
        text: i18n.t('AreYouSureYouWantToDeleteTheBlockList'),
        accept: this.deleteUserListAccept,
      });
    },

    deleteUserListAccept() {
      this.$vs.notify({
        color: 'success',
        title: i18n.t('DeleteBlockList'),
        text: i18n.t('TheSelectedBlockListWasSuccessfullyDeleted'),
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