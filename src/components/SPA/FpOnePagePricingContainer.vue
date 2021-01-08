<template>
  <section class="mt-24 container" id="fiyatlar">
    <vs-row vs-type="flex" vs-justify="space-around">
      <vs-col
        vs-justify="center"
        vs-align="center"
        vs-lg="12"
        vs-sm="12"
        vs-xs="12"
        class="text-center mb-8"
      >
        <vs-divider>
          <h2 class="font-bold uppercase">{{ $t("Pricing") }}</h2>
        </vs-divider>
      </vs-col>

      <fp-one-page-pricing @selectPricing="selectPricing" />

      <vs-col
        class="flex-col mt-12 mb-12"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="12"
        vs-sm="12"
        vs-xs="12"
      >
        <div class="flex flex-col items-center">
          <h2 class="text-primary">{{ $t("StartNow") }}</h2>
          <h3 class="mt-4 mb-8 text-dark text-center">
            {{ $t("SignUpAndgetaFreeFourDayPromotion") }}
          </h3>
          <vs-button
            color="warning"
            type="filled"
            class="half-button"
            to="/register"
            >{{ $t("TryFourDaysFree") }}</vs-button
          >
        </div>
      </vs-col>
    </vs-row>
  </section>
</template>

<script>
import i18n from "@/i18n/i18n";
import FpOnePagePricing from "@/components/SPA/FpOnePagePricing";

export default {
  name: "fp-one-page-pricing-container",

  components: {
    FpOnePagePricing,
  },

  methods: {
    selectPricing(pricing) {
      this.$router.push(`/checkout?pricing=${pricing.pricingId}`);
    },
  },
};
</script>
