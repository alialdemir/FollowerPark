<template>
  <div>
    <div class="vx-row mb-6">
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input autofocus class="w-full" label="List name" v-model="directMessage.listName" />
          </div>
        </div>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <h4>Creating direct message rules:</h4>
        <p>- The message can be between 1 and 1000 characters</p>
        <p>- The list should contain more than 15 unique messages</p>
      </div>
    </div>
    <h5>Write each separate message as a separate line</h5>
    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full">
        <div class="vx-row">
          <div class="vx-col w-full">
            <div class="multicomment-wrapper">
              <div v-show="messageList.length > 0" class="counts">
                <span class="subtext">
                  Messages: {{messageList.length}} (
                  <small>+15 messages are recommended</small>)
                </span>
                <!---->
              </div>
              <div
                :style="[item.id == selectedComment.id  || (isEditAllComments && !selectedComment.id ) ? {'border-color': '#7ed321'} : {'border-color': '#FFF'}]"
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
              >Edit All</vs-button>
              <vs-button
                @click="allDeleteComment"
                v-show="messageList.length > 0"
                color="danger"
                type="border"
                icon="close"
              >Delete All</vs-button>
            </div>
          </div>
        </div>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2 direct-message-textarea flex flex-col pr-4 pl-4">
        <vs-textarea
          height="200px"
          placeholder="Sample:
  Thank you for subscribing! We offer you 20% discount.

  We are glad to subscribe, We give you as a free 10 day gift.

  Hello, We give you $30 coupon as a gift."
          v-model="directMessage.messages"
        />
        <vs-button v-if="!isEditAllComments" @click="addMessages">Add messages</vs-button>
        <div class="flex justify-around">
          <vs-button v-if="isEditAllComments" color="primary" @click="cancelEdit">Cancel</vs-button>
          <vs-button
            v-if="isEditAllComments"
            color="success"
            @click="saveAllChanges"
          >Save all changes</vs-button>
        </div>
        <p class="mt-2">*You can add several messages separated by an empty line</p>
      </div>
    </div>
    <div class="vx-row mt-2">
      <div class="vx-col w-full">
        <vs-button @click="saveList" color="success" class="mr-3 mb-2">Save</vs-button>
        <vs-button @click="$emit('saveList')" color="danger" class="mr-3 mb-2">Cancel</vs-button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'fp-create-direct-message',
  props: {
    selectedDirectMessage: {
      type: Object,
      default: {
        id: 0,
        listName: '',
        messages: [],
      },
    },
  },

  data() {
    return {
      directMessage: {
        listName: this.$props.selectedDirectMessage.listName,
        messages: this.$props.selectedDirectMessage.messages
          .map((item) => item.text)
          .join('\n\n'),
      },
      messageList: this.$props.selectedDirectMessage.messages,
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
        '-' +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        s4() +
        s4()
      );
    },

    addMessages() {
      const messages = this.directMessage.messages
        .split('\n\n')
        .filter((item) => item.trim() !== '')
        .map((item) => {
          return {
            id: this.createGuid(),
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

      this.messageList[index] = this.selectedComment;

      this.cancelEdit();
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
        .join('\n\n');

      this.selectedComment = {};

      this.isEditAllComments = true;
    },

    saveList() {
      if (!this.directMessage.listName || !this.messageList) {
        return;
      }

      const dispatchName =
        this.$props.selectedDirectMessage.id > 0
          ? 'updateDirectMessage'
          : 'addDirectMessage';

      this.$store.dispatch(dispatchName, {
        id: this.$props.selectedDirectMessage.id,
        listName: this.directMessage.listName,
        messages: this.messageList,
      });

      this.$emit('saveList');
    },

    deleteComment(item) {
      this.selectedComment = item;

      this.$vs.dialog({
        type: 'confirm',
        'accept-text': 'Delete',
        color: 'danger',
        title: `Delete comment?`,
        text: 'Are you sure you want to delete the comment?',
        accept: this.deleteCommentAccept,
      });
    },

    deleteCommentAccept() {
      this.$vs.notify({
        color: 'success',
        title: 'Deleted comment',
        text: 'The selected comment was successfully deleted',
      });

      this.messageList = this.messageList.filter(
        (item) => item.id !== this.selectedComment.id
      );

      if (this.directMessage.messages.length > 0) {
        this.directMessage.messages = this.messageList
          .map((item) => item.text)
          .join('\n\n');
      }
    },

    allDeleteComment() {
      this.$vs.dialog({
        type: 'confirm',
        'accept-text': 'Delete',
        color: 'danger',
        title: `Delete all comments?`,
        text: 'Are you sure you want to delete all comments?',
        accept: this.allDeleteCommentAccept,
      });
    },

    allDeleteCommentAccept() {
      this.$vs.notify({
        color: 'success',
        title: 'Deleted comment',
        text: 'The all comments was successfully deleted',
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
  background-color: #fff;
  border: 1px solid #b8ddf8;
  padding: 0 !important;
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
  border: 1px solid #b8ddf8;
  height: 284px;
  margin-bottom: 0px;
  border-radius: 5px;
  overflow: auto;
  background: #fafdff;
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
  background-color: #fff;
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
  border: 1px solid #b8ddf8;
  border-bottom: 0;
  background: #f3f8fb;
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