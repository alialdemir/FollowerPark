<template>
  <vx-card title="Enter the name of the user-resource (without @ @)">
    <vs-textarea
      class="choose-user-resource__textarea"
      v-model="username"
      :placeholder="$t('ForExample')"
      width="300px"
    />
  </vx-card>
</template>

<script>
export default {
  name: "fp-choose-user-resource",
  watch: {
    username(val) {
      if (val.trim()) {
        this.$store.dispatch("setTaskConfigurations", {
          userList: JSON.parse(
            JSON.stringify(val.split("\n").filter((item) => item !== ""))
          ),
        });
      }
    },
  },
  data() {
    return {
      username: "",
    };
  },
};
</script>


<style>
.choose-user-resource__textarea textarea {
  height: 200px;
}
</style>