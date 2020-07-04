<template>
  <div>
    <vx-card title="How many followers should not be followed?">
      <vs-input-number
        v-model="maximumNumberTransactions"
        label="Unfollow user count:"
        class="justify-start bg-transparent"
      />
    </vx-card>

    <vx-card class="mt-4" title="Optional">
      <vs-checkbox v-model="firstOldUsersUnfollow">First, let the old users unfollow.</vs-checkbox>
      <br />
      <vs-checkbox
        v-model="unfollowFollowerParkFollowing"
      >You will unfollow the followers of FollowerPark.</vs-checkbox>
    </vx-card>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'fp-choose-unfollow-user-count',
  computed: {
    ...mapFields([
      'taskConfigurations.maximumNumberTransactions',
      'taskConfigurations.firstOldUsersUnfollow',
      'taskConfigurations.unfollowFollowerParkFollowing'
    ])
  }
};
</script>
