<template>
  <div>
    <div class="vx-row mb-6">
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input
              autofocus
              class="w-full"
              :label="$t('ListName')"
              v-model="directMessage.listName"
            />
          </div>
        </div>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <h4>{{ $t("CreatingDirectMessageRules") }}</h4>
        <p>{{ $t("TheMessageCanBeBetweenOneAndThousandCharacters") }}</p>
        <p>{{ $t("TheListShouldContainMoreThanFifteenUniqueMessages") }}</p>
      </div>
    </div>
    <h5>{{ $t("WriteEachSeparateMessageAsASeparateLine") }}</h5>
    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full">
        <div class="vx-row">
          <div class="vx-col w-full">
            <div class="multicomment-wrapper">
              <div v-show="messageList.length > 0" class="counts">
                <span class="subtext">
                  {{ $t("Messages") }} {{ messageList.length }} (
                  <small>{{ $t("FifteenMessagesAreRecommended") }}</small
                  >)
                </span>
                <!---->
              </div>
              <div
                :style="[
                  item.directMessageId == selectedComment.directMessageId ||
                  (isEditAllComments && !selectedComment.directMessageId)
                    ? { 'border-color': '#7ed321' }
                    : { 'border-color': '#3b4253' },
                ]"
                class="comment"
                v-for="item in messageList"
                :key="item.title"
              >
                <div class="flex justify-end">
                  <vs-button
                    @click="editComment(item)"
                    class="mr-2"
                    size="small"
                    color="primary"
                    type="flat"
                    icon="create"
                  ></vs-button>
                  <vs-button
                    @click="deleteComment(item)"
                    size="small"
                    color="danger"
                    type="flat"
                    icon="close"
                  ></vs-button>
                </div>
                <span v-html="item.text.replace(/[\n]/g, '<br>')"></span>
              </div>
            </div>
            <div class="flex justify-around mt-3">
              <vs-button
                v-show="messageList.length > 0"
                @click="editAllComments"
                color="primary"
                type="border"
                icon="create"
                >{{ $t("EditAll") }}</vs-button
              >
              <vs-button
                @click="allDeleteComment"
                v-show="messageList.length > 0"
                color="danger"
                type="border"
                icon="close"
                >{{ $t("DeleteAll") }}</vs-button
              >
            </div>
          </div>
        </div>
      </div>
      <div
        class="vx-col sm:w-1/2 w-full mb-2 direct-message-textarea flex flex-col pr-4 pl-4"
      >
        <vs-textarea
          height="200px"
          :placeholder="$t('AddMessageSample')"
          v-model="directMessage.messages"
        />
        <vs-button v-if="!isEditAllComments" @click="addMessages">{{
          $t("AddMessages")
        }}</vs-button>
        <div class="flex justify-around">
          <vs-button
            v-if="isEditAllComments"
            color="primary"
            @click="cancelEdit"
            >{{ $t("Cancel") }}</vs-button
          >
          <vs-button
            v-if="isEditAllComments"
            color="success"
            @click="saveAllChanges"
            >{{ $t("SaveAllChanges") }}</vs-button
          >
        </div>
        <p class="mt-2">
          {{ $t("YouCanAddSeveralMessagesSeparatedByAnEmptyLine") }}
        </p>
      </div>
    </div>
    <div class="vx-row mt-2">
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
</template>


<script>
export default {
  name: "fp-create-direct-message",
  props: {
    selectedDirectMessage: {
      type: Object,
      default: {
        directMessageId: 0,
        listName: "",
        directMessages: [],
      },
    },
  },

  data() {
    return {
      directMessage: {
        directMessageId: this.$props.selectedDirectMessage.directMessageId,
        listName: this.$props.selectedDirectMessage.listName,
        messages:
          "" /*this.$props.selectedDirectMessage.directMessages
          .map((item) => item.text)
          .join("\n\n"),*/,
      },
      messageList: this.$props.selectedDirectMessage.directMessages,
      selectedComment: {},
      isEditAllComments: false,
    };
  },

  methods: {
    createGuid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return (
        s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4() +
        s4()
      );
    },

    addMessages() {
      if (!this.directMessage.messages) {
        return;
      }

      const messages = this.directMessage.messages
        .split("\n\n")
        .filter((item) => item.trim() !== "")
        .map((item) => {
          return {
            directMessageId: this.createGuid(),
            text: item,
          };
        });

      this.messageList.push(...messages);

      this.selectedComment = {};
      this.directMessage.messages = [];
    },

    saveAllChanges() {
      this.selectedComment.text = this.directMessage.messages;

      const index = this.messageList.findIndex(
        (item) => item.id === this.selectedComment.id
      );

      if (this.selectedComment.text != "") {
        this.messageList[index] = this.selectedComment;
        this.cancelEdit();
      } else {
        this.deleteCommentAccept();
      }
    },

    cancelEdit() {
      this.selectedComment = {};
      this.directMessage.messages = [];

      this.isEditAllComments = false;
    },

    editComment(comment) {
      this.selectedComment = comment;
      this.isEditAllComments = true;

      this.directMessage.messages = comment.text;
    },

    editAllComments() {
      this.directMessage.messages = this.messageList
        .map((item) => item.text)
        .join("\n\n");

      this.selectedComment = {};

      this.isEditAllComments = true;
    },

    saveList() {
      if (!this.directMessage.listName || !this.messageList) {
        return;
      }

      const dispatchName =
        this.$props.selectedDirectMessage.directMessageId > 0
          ? "updateDirectMessage"
          : "addDirectMessage";

      this.$store.dispatch(dispatchName, {
        directMessageId: this.$props.selectedDirectMessage.directMessageId,
        listName: this.directMessage.listName,
        directMessages: this.messageList,
      });

      this.$emit("saveList");
    },

    deleteComment(item) {
      this.selectedComment = item;

      this.$vs.dialog({
        type: "confirm",
        "accept-text": "Delete",
        color: "danger",
        title: `Delete comment?`,
        text: "Are you sure you want to delete the comment?",
        accept: this.deleteCommentAccept,
      });
    },

    deleteCommentAccept() {
      this.$vs.notify({
        color: "success",
        title: "Deleted comment",
        text: "The selected comment was successfully deleted",
      });

      this.messageList = this.messageList.filter(
        (item) => item.directMessageId !== this.selectedComment.directMessageId
      );

      if (this.directMessage.messages.length > 0) {
        this.directMessage.messages = this.messageList
          .map((item) => item.text)
          .join("\n\n");
      }
    },

    allDeleteComment() {
      this.$vs.dialog({
        type: "confirm",
        "accept-text": "Delete",
        color: "danger",
        title: `Delete all comments?`,
        text: "Are you sure you want to delete all comments?",
        accept: this.allDeleteCommentAccept,
      });
    },

    allDeleteCommentAccept() {
      this.$vs.notify({
        color: "success",
        title: "Deleted comment",
        text: "The all comments was successfully deleted",
      });

      this.isEditAllComments = false;
      this.messageList = [];
      this.selectedComment = {};
      this.directMessage.messages = [];
    },
  },
};
</script>

<style>
.direct-message-textarea {
  background-color: #10163a;
  border: 1px solid #3b4253;
}

.direct-message-textarea .vs-textarea-primary,
.direct-message-textarea textarea {
  height: 200px;
  border: none !important;
  overflow: auto;
  outline: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

.multicomment-wrapper {
  border: 1px solid #3b4253;
  height: 284px;
  margin-bottom: 0px;
  border-radius: 5px;
  overflow: auto;
  background: #10163a;
  cursor: default;
  position: relative;
}

.comment {
  margin: 10px 8px;
  padding: 1.3rem 1.5rem;
  margin-bottom: 1.2rem;
  height: auto;
  max-height: 8rem;
  border-radius: 3px;
  background-color: #262c49;
  border: 1px solid transparent;
  box-shadow: 0 2px 4px 0 rgba(26, 143, 230, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
}
.multicomment-wrapper .counts {
  position: relative;
  margin-left: 0;
  width: 100%;
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid #3b4253;
  border-bottom: 0;
  background: #10163a;
  padding: 0.2rem 1.7rem;
  z-index: 999;
}
.subtext {
  font-size: 12px;
  color: #ff9800;
  position: relative;
  margin: auto;
  line-height: normal;
}
</style>