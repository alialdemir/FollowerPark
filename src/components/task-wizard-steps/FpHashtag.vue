<template>
  <vx-card title="Enter the hashtag  (without #)">
    <vs-textarea
      class="hashtag__textarea"
      v-model="hashtags"
      :placeholder="$t('ForExampleHashtag')"
      width="300px"
      height="200px"
    />
  </vx-card>
</template>

<script>
export default {
  name: "fp-hastag",
  watch: {
    hashtags(val) {
      if (val.trim()) {
        this.$store.dispatch("setTaskConfigurations", {
          hashtags: JSON.parse(
            JSON.stringify(val.split("\n").filter((item) => item !== ""))
          ),
        });
      }
    },
  },
  data() {
    return {
      hashtags: "",
    };
  },
};
</script>

<style>
.hashtag__textarea textarea {
  height: 200px;
}
</style>