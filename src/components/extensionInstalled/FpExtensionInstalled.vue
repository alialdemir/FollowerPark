<template>
  <vs-alert
    v-if="!isExtensionInstalled"
    active="true"
    color="warning"
    icon="new_releases"
    class="mb-4"
  >
    <div v-html="$t('YouMustInstallTheChromeExtensionToStartTheTask')"></div>
  </vs-alert>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  name: "fp-extension-installed",

  computed: {
    ...mapFields(["isExtensionInstalled"]),
  },
};
</script>