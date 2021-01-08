
<template>
  <div>
    <fp-one-page-header />

    <fp-one-page-products-purchased />

    <fp-one-page-our-services />

    <fp-one-page-happy-customers />

    <fp-one-page-pricing-container />

    <fp-one-page-faq />

    <fp-one-page-footer />
  </div>
</template>

<script>
import FpOnePageHeader from "@/components/SPA/FpOnePageHeader";
import FpOnePageProductsPurchased from "@/components/SPA/FpOnePageProductsPurchased";
import FpOnePageOurServices from "@/components/SPA/FpOnePageOurServices";
import FpOnePageHappyCustomers from "@/components/SPA/FpOnePageHappyCustomers";
import FpOnePagePricingContainer from "@/components/SPA/FpOnePagePricingContainer";
import FpOnePageFaq from "@/components/SPA/FpOnePageFaq";
import FpOnePageFooter from "@/components/SPA/FpOnePageFooter";

import AOS from "aos";
import "aos/dist/aos.css";

export default {
  created() {
    AOS.init({ disable: "phone" });
  },

  components: {
    FpOnePageHeader,
    FpOnePageProductsPurchased,
    FpOnePageOurServices,
    FpOnePageHappyCustomers,
    FpOnePagePricingContainer,
    FpOnePageFaq,
    FpOnePageFooter,
  },
};
</script>

<style>
body {
  font-family: Nunito, sans-serif;
  background-color: #f8f9fa;
  width: 100%;
}

.half-button {
  border-radius: 3px 15px;
}

.p-t-b-182 {
  padding-top: 250px;
}
</style>