<template>
  <vx-card title="Enter the name of the user-resource (without @ @)">
    <vs-textarea v-model="username" placeholder="For example: ContestPark" width="300px" />
  </vx-card>
</template>

<script>
export default {
  name: 'fp-choose-user-resource',
  watch: {
    username(val) {
      if (val) {
        this.$store.dispatch('setTaskConfigurations', {
          userList: JSON.parse(
            JSON.stringify(val.split('\n').filter((item) => item !== ''))
          ),
        });
      }
    },
  },
  data() {
    return {
      username: '',
    };
  },
};
</script>
