<template>
  <div>
    <form-wizard
      ref="wizard"
      color="rgba(var(--vs-success), 1)"
      errorColor="rgba(var(--vs-danger), 1)"
      :title="null"
      :subtitle="null"
    >
      <tab-content
        title="Abonelik Paketi Seçin"
        class="mb-5"
        :before-change="validateStep1"
      >
        <fp-one-page-pricing @selectPricing="selectPricing" />
      </tab-content>

      <tab-content
        title="Ödeme Bilgileri"
        class="mb-5"
        :before-change="validateStep1"
      >
        <fp-credit-card :pricingId="selectedPricing.pricingId" />
      </tab-content>
    </form-wizard>

    <div class="checkout__footer flex justify-center flex-col">
      <div><img src="@/assets/images/pages/iyzico.png" alt="iyzico" /></div>
    </div>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import { mapFields } from "vuex-map-fields";

export default {
  components: {
    FormWizard,
    TabContent,
  },

  watch: {
    pricings(newPricings) {
      const { pricing } = this.$route.query;
      
      if (pricing && (newPricings || [].length > 0)) {
        const selectedPricing = newPricings.filter(
          (item) => item.pricingId === Number(pricing || "0")
        )[0] || { pricingId: 0 };

        this.selectPricing(selectedPricing);
      }
    },
  },

  computed: {
    ...mapFields(["pricings"]),
  },

  data: () => ({
    selectedPricing: { pricingId: 0 },
  }),

  methods: {
    validateStep1() {
      return new Promise((resolve, reject) => {
        if (this.selectedPricing.pricingId > 0) {
          resolve(true);
        } else {
          reject("correct all values");
        }
      });
    },

    selectPricing(pricing) {
      if (pricing.pricingId > 0) {
        this.selectedPricing = pricing;
        this.$refs.wizard.nextTab();
      }
    },
  },
};
</script>

<style>
.checkout__footer {
  border: 1px solid rgb(59, 66, 83);
  background: rgb(16, 22, 58);
  padding-left: 1.25rem !important;
  padding-right: 1.25rem !important;
  border-radius: 0.5rem;
  height: 63px;
}

.wizard-footer-right,
.wizard-footer-left {
  display: none;
}
</style>