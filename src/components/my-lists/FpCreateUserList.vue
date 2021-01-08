<template>
  <div class="vx-row">
    <div class="vx-col sm:w-1/2 w-full mb-2">
      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-input
            autofocus
            class="w-full"
            :label="$t('ListName')"
            v-model="userList.listName"
          />
        </div>
      </div>
      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-textarea
            :label="$t('WriteTheNameOfEachUserAsASeparateLine')"
            v-model="userList.usernames"
          />
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col w-full">
          <vs-button @click="saveList" color="success" class="mr-3 mb-2">{{
            $t("Save")
          }}</vs-button>
          <vs-button
            @click="$emit('saveList')"
            color="danger"
            class="mr-3 mb-2"
            >{{ $t("Cancel") }}</vs-button
          >
        </div>
      </div>
    </div>
    <div class="vx-col sm:w-1/2 w-full mb-2">
      <h4>{{ $t("CreatingUserListRules") }}</h4>
      <p>{{ $t("FormatOfIdusernamesIsNotSupported") }}</p>
      <p>{{ $t("usernamesMustNotContainTheSign") }}</p>
      <p>{{ $t("EachUsernameMustBeWrittenAsASeparateLine") }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "fp-create-user-list",
  props: {
    selectedUserList: {
      type: Object,
      default: {
        userListId: 0,
        listName: "",
        usernames: [],
      },
    },
  },

  data() {
    return {
      userList: {
        listName: this.$props.selectedUserList.listName,
        usernames: this.$props.selectedUserList.usernames.join("\n"),
      },
    };
  },

  methods: {
    saveList() {
      if (!this.userList.listName || !this.userList.usernames) {
        return;
      }

      const dispatchName =
        this.$props.selectedUserList.userListId > 0
          ? "updateMyUserList"
          : "addMyUserList";

      this.$store.dispatch(dispatchName, {
        userListId: this.$props.selectedUserList.userListId,
        listName: this.userList.listName,
        usernames: this.userList.usernames.split("\n"),
      });

      this.$emit("saveList");
    },
  },
};
</script>

<style scoped>
.vs-con-textarea {
  border: transparent !important;
}
</style>