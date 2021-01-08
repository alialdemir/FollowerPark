 
<template>
  <div>
    <vx-card>
      <vs-row vs-w="12">
        <vs-col vs-w="4">
          <div style="height: 250px">
            <fp-credit-card-svg
              :ShowBack="securityCodeFocus"
              :creditCardInfo="creditCardInfo"
            />
          </div>
        </vs-col>
        <vs-col vs-offset="0" vs-type="flex" vs-justify="center" vs-w="5">
          <form class="flex flex-col" v-on:submit.prevent="onCheckout">
            <vs-input
              label-placeholder="Fullname"
              class="w-full"
              @focus="securityCodeFocus = false"
              v-model="creditCardInfo.fullName"
              maxlength="20"
            />

            <vs-input
              label-placeholder="Card Number"
              @focus="securityCodeFocus = false"
              v-model="creditCardInfo.cardNumber"
              pattern="[0-9]*"
              inputmode="numeric"
              maxlength="20"
              v-mask="['#### #### #### ####']"
              class="w-full"
            />
            <div class="flex">
              <div class="flex mt-4">
                <multiselect
                  :options="months"
                  :multiple="false"
                  class="mr-2"
                  selectLabel=" "
                  @open="securityCodeFocus = false"
                  selectedLabel=" "
                  v-model="creditCardInfo.month"
                  deselectLabel=" "
                  :placeholder="$t('Month')"
                />
                <multiselect
                  :options="years"
                  :multiple="false"
                  selectLabel=" "
                  selectedLabel=" "
                  deselectLabel=" "
                  v-model="creditCardInfo.year"
                  @open="securityCodeFocus = false"
                  :placeholder="$t('Year')"
                />
              </div>

              <vs-input
                class="ml-4"
                v-model="creditCardInfo.securityCode"
                label-placeholder="Security Code"
                pattern="[0-9]*"
                type="number"
                @focus="securityCodeFocus = true"
              />
            </div>

            <div class="mt-4">
              <vs-checkbox disabled="true" color="success" value="true">{{
                $t("IWantToUse3DSecure")
              }}</vs-checkbox>
            </div>

            <div class="mt-4">
              <vs-button class="float-right" @click="onCheckout">{{
                $t("Continue")
              }}</vs-button>
            </div>
          </form>
        </vs-col>
        <vs-col vs-w="3"> </vs-col>
      </vs-row>
    </vx-card>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import FpCreditCardSvg from "./FpCreditCardSvg";
export default {
  name: "fp-credit-card",
  props: {
    pricingId: {
      type: Number,
      default: 0,
    },
  },

  directives: { mask },
  components: { FpCreditCardSvg },

  data: () => ({
    securityCodeFocus: false,
    creditCardInfo: {
      fullName: "",
      cardNumber: "",
      year: "",
      month: "",
      securityCode: "",
    },
    months: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ],
    years: [
      "2021",
      "2022",
      "2023",
      "2024",
      "2025",
      "2026",
      "2027",
      "2028",
      "2029",
      "2030",
      "2031",
      "2032",
      "2033",
      "2034",
      "2035",
      "2036",
      "2037",
      "2038",
      "2039",
      "2040",
      "2041",
    ],
  }),

  methods: {
    cryptoJSAES(text) {
      const word = "meuteste";

      let key = "6fa979f20126cb08aa645a8f495f6d85";
      key = this.CryptoJS.enc.Utf8.parse(key);

      let iv = "1";
      iv = this.CryptoJS.enc.Utf8.parse(iv);

      let encrypted = this.CryptoJS.AES.encrypt(word, key, { iv: iv });
      return encrypted.toString();

      //  return this.CryptoJS.AES.encrypt(text, "Secret Passphrase").toString();
    },

    onCheckout() {
      const {
        fullName,
        cardNumber,
        year,
        month,
        securityCode,
      } = this.creditCardInfo;

      this.$store.dispatch("order", {
        pricingId: this.$props.pricingId,
        fullName: this.cryptoJSAES(fullName),
        cardNumber: this.cryptoJSAES(cardNumber),
        year: this.cryptoJSAES(year),
        month: this.cryptoJSAES(month),
        securityCode: this.cryptoJSAES(securityCode),
      });
    },
  },
};
</script>
 
 <style scoped>
.multiselect {
  width: 99px;
}
</style>
 
 <style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>