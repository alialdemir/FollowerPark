<template>
  <div>
    <vx-card
      :title="$t('DirectMessages')"
      :refreshContentAction="true"
      :newButtonText="$t('CreateDirectMessages')"
      :addCardAction="true"
      @refresh="closeCardAnimation"
      @add="isShowCreatePanel=true"
      class="overflow-hidden"
    >
      <vs-table stripe :data="directMessages">
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
                      @click="selectedDirectMessage = item; isShowCreatePanel=true"
                    >{{$t('Edit')}}</vs-button>
                  </vs-dropdown-item>
                  <vs-dropdown-item divider>
                    <vs-button
                      size="small"
                      color="danger"
                      type="flat"
                      @click="deleteDirectMessage(item)"
                    >{{$t('Delete')}}</vs-button>
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

    <vs-popup
      v-if="isShowCreatePanel"
      :button-close-hidden="true"
      :title="$t(selectedDirectMessage.id === 0 ?'CreateDirectMessages': 'EditDirectMessages')"
      fullscreen
      :active.sync="isShowCreatePanel"
    >
      <fp-create-direct-message
        :selectedDirectMessage="selectedDirectMessage"
        @saveList="saveList"
      />
    </vs-popup>
  </div>
</template>

<script>
import i18n from '@/i18n/i18n';

export default {
  name: 'fp-direct-messages',

  created() {
    if (this.$route.query.q === 'c') {
      this.isShowCreatePanel = true;
      this.$router.push(this.$route.path);
    }

    setTimeout(() => {
      this.$store.dispatch('getDirectMessages');
    }, 500);
  },

  watch: {
    isShowCreatePanel(val) {
      if (val === false) {
        this.selectedDirectMessage = {
          id: 0,
          listName: '',
          messages: [],
        };
      }
    },
  },

  computed: {
    directMessages() {
      return this.$store.state.directMessages;
    },
  },

  data() {
    return {
      isShowCreatePanel: false,
      selectedDirectMessage: {
        id: 0,
        listName: '',
        messages: [],
      },
    };
  },

  methods: {
    saveList() {
      this.isShowCreatePanel = false;

      this.selectedDirectMessage = {
        id: 0,
        listName: '',
        messages: [],
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
        title: i18n.t('DeleteDirectMessages') + '?',
        text: i18n.t('AreYouSureYouWantToDeleteTheDirectMessages'),
        accept: this.deleteDirectMessageAccept,
        'accept-text': i18n.t('Accept'),
        'cancel-text': i18n.t('Cancel'),
      });
    },

    deleteDirectMessageAccept() {
      this.$vs.notify({
        color: 'success',
        title: i18n.t('DeleteDirectMessages'),
        text: i18n.t('TheSelectedDirectMessagesWasSuccessfullyDeleted'),
      });

      this.$store.dispatch(
        'deleteDirectMessage',
        JSON.parse(JSON.stringify(this.selectedDirectMessage))
      );
      this.selectedDirectMessage = {
        id: 0,
        listName: '',
        messages: [],
      };
    },
  },
};
</script>