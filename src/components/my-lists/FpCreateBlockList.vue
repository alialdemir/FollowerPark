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
            :label="$t('EachUserNameShouldBeWrittenOnSeparateLines')"
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
      <h4>{{ $t("RulesForCreatingABlockList") }}</h4>
      <p>{{ $t("IdOfTheUserNameFormatIsNotSupported") }}</p>
      <p>{{ $t("UsernamesMustNotContainTheSign") }}</p>
      <p>{{ $t("EachUsernameMustBeWrittenAsASeparateLine") }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "fp-create-block-list",
  props: {
    selectedBlockList: {
      type: Object,
      default: {
        blockListId: 0,
        listName: "",
        usernames: [],
      },
    },
  },

  data() {
    return {
      userList: {
        listName: this.$props.selectedBlockList.listName,
        usernames: this.$props.selectedBlockList.usernames.join("\n"),
      },
    };
  },

  methods: {
    saveList() {
      if (!this.userList.listName || !this.userList.usernames) {
        return;
      }

      const dispatchName =
        this.$props.selectedBlockList.blockListId > 0
          ? "updateBlockList"
          : "addBlockList";

      this.$store.dispatch(dispatchName, {
        blockListId: this.$props.selectedBlockList.blockListId,
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