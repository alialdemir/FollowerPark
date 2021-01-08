<template>
  <vx-card :title="$t('NumberOfLikes')">
    <vs-input-number
      v-model="maximumNumberTransactions"
      :label="$t('TotalLikes')"
      class="justify-start bg-transparent"
    />
    <vs-input-number
      v-model="numberOfLikesPerUser"
      :label="$t('NumberOfLikesPerUser')"
      class="justify-start bg-transparent"
    />
    <vs-checkbox disabled color="success" value="true">{{
      $t("SkipAlreadyLikedUsers")
    }}</vs-checkbox>
  </vx-card>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  name: "fp-choose-like-post-count",
  computed: {
    ...mapFields([
      "taskConfigurations.maximumNumberTransactions",
      "taskConfigurations.numberOfLikesPerUser",
    ]),
  },
};
</script>

<style>
.vs-input-number--input {
  border: 1px solid #ddd;
}
</style>
