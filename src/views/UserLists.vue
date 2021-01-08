<template>
  <div>
    <vx-card
      :title="$t('UserLists')"
      :addCardAction="true"
      @add="isShowCreatePanel = true"
      class="overflow-hidden"
    >
      <vs-table stripe :data="myUserLists">
        <template slot="thead">
          <vs-th>{{ $t("ListName") }}</vs-th>
          <vs-th>{{ $t("Count") }}</vs-th>
          <vs-th style="width: 50px"></vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(item, indextr) in data">
            <vs-td>{{ item.listName }}</vs-td>
            <vs-td>{{ item.usernames.length }}</vs-td>
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
                      size="small"
                      color="dark"
                      type="flat"
                      @click="edit(item)"
                      >{{ $t("Edit") }}</vs-button
                    >
                  </vs-dropdown-item>
                  <vs-dropdown-item divider>
                    <vs-button
                      size="small"
                      color="danger"
                      type="flat"
                      class="w-full"
                      @click="deleteUserList(item)"
                      >{{ $t("Delete") }}</vs-button
                    >
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>

    <vs-popup
      v-if="isShowCreatePanel"
      :button-close-hidden="true"
      :title="
        $t(
          selectedUserList.userListId === 0 ? 'CreateUserList' : 'EditUserList'
        )
      "
      :active.sync="isShowCreatePanel"
    >
      <fp-create-user-list
        :selectedUserList="selectedUserList"
        @saveList="saveList"
      />
    </vs-popup>
  </div>
</template>

<script>
import i18n from "@/i18n/i18n";

export default {
  name: "fp-user-list",

  created() {
    if (this.$route.query.q === "c") {
      this.isShowCreatePanel = true;
      this.$router.push(this.$route.path);
    }

    setTimeout(() => {
      this.$store.dispatch("getUserList");
    }, 500);
  },

  computed: {
    myUserLists() {
      return this.$store.state.myUserLists;
    },
  },

  data() {
    return {
      isShowCreatePanel: false,
      selectedUserList: {
        userListId: 0,
        listName: "",
        usernames: [],
      },
    };
  },

  watch: {
    isShowCreatePanel(val) {
      if (val === false) {
        this.selectedUserList = {
          userListId: 0,
          listName: "",
          usernames: [],
        };
      }
    },
  },

  methods: {
    saveList() {
      this.isShowCreatePanel = false;

      this.selectedUserList = {
        userListId: 0,
        listName: "",
        usernames: [],
      };
    },

    closeCardAnimation(card) {
      this.$store.dispatch("getUserList");
      card.removeRefreshAnimation(3000);
    },

    deleteUserList(item) {
      this.selectedUserList = item;

      this.$vs.dialog({
        type: "confirm",
        "accept-text": "Delete",
        color: "danger",
        title: i18n.t("DeleteUserList") + "?",
        text: i18n.t("AreYouSureYouWantToDeleteTheUserlist"),
        accept: this.deleteUserListAccept,
        acceptText: i18n.t("Accept"),
        cancelText: i18n.t("Cancel"),
      });
    },

    deleteUserListAccept() {
      this.$vs.notify({
        color: "success",
        title: i18n.t("DeleteUserList"),
        text: i18n.t("TheSelectedUserListWasSuccessfullyDeleted"),
      });

      this.$store.dispatch(
        "deleteMyUserList",
        this.selectedUserList.userListId
      );

      this.selectedUserList = {
        userListId: 0,
        listName: "",
        usernames: [],
      };
    },

    edit(item) {
      this.selectedUserList = item;
      this.isShowCreatePanel = true;
    },
  },
};
</script>