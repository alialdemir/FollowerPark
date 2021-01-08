<template>
  <vs-row vs-type="flex" vs-justify="space-around">
    <vs-col
      :key="indextr"
      v-for="(item, indextr) in pricings"
      vs-type="flex"
      vs-lg="3"
      vs-sm="12"
      class="mt-4 pl-2 pr-2"
      vs-xs="12"
    >
      <div
        data-aos="zoom-in"
        :data-aos-duration="indextr * 500"
        class="product-card-container mb-2 text-center w-full hover:shadow-lg"
        :class="{ 'bg-primary': item.isBestSeller }"
      >
        <vs-chip
          v-if="item.isBestSeller"
          color="primary"
          class="absolute w-full bg-warning"
          >{{ $t("MostPreferred") }}</vs-chip
        >
        <div class="product-card-title mb-4 mt-6">
          <h3 class="font-weight-bold text-uppercase">
            {{ item.title }}
          </h3>
          <p
            class="text-uppercase mb-0"
            :class="{
              'text-white': item.isBestSeller,
              'text-primary': !item.isBestSeller,
            }"
          >
            {{ item.subTitle }} {{ $t("Account") }}
          </p>
        </div>
        <div class="product-card-detail p-4">
          <p class="mb-2 text-primary">
            <span class="text-5xl font-bold"
              >{{ item.price
              }}<sup class="text-4xl font-normal">{{
                item.currency
              }}</sup></span
            ><span>
              {{ $t("Monthly") }}
            </span>
          </p>
          <div>
            <ul v-html="$t('OrderDescription')"></ul>
          </div>

          <vs-button
            class="btn btn-gradient half-button pl-5 pr-5 mt-4 mb-4"
            color="primary"
            type="filled"
            @click="selectPricing(item)"
            >{{ $t("Order") }}</vs-button
          >
        </div>
      </div>
    </vs-col>
  </vs-row>
</template>

<script>
import i18n from "@/i18n/i18n";
import { mapFields } from "vuex-map-fields";

export default {
  name: "fp-one-page-pricing",

  created() {
    this.$store.dispatch("getPricing");
  },

  computed: {
    ...mapFields(["pricings"]),
  },

  methods: {
    selectPricing(pricing) {
      this.$emit("selectPricing", pricing);
    },
  },
};
</script>

<style scoped>
.product-card-container {
  border-radius: 10px;
  box-shadow: 0 1px 15px 1px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
  border: 0;
  transition: all 0.15s ease-in;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 10px;
  background-color: #edf2f7;
}
.product-card-title {
  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
}

.product-card-detail {
  background-color: #10163a;
  border-radius: 10px;
}

.product-card-title h3,
.product-card-title p {
  color: #10163a !important;
}
</style>