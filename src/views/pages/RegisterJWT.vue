<template>
  <div class="clearfix">
    <vs-input
      v-validate="'required|email'"
      data-vv-validate-on="blur"
      name="email"
      type="email"
      :label-placeholder="$t('Email')"
      :placeholder="$t('Email')"
      v-model="email"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first("email") }}</span>

    <vs-input
      ref="password"
      type="password"
      data-vv-validate-on="blur"
      v-validate="'required|min:6|max:10'"
      name="password"
      :label-placeholder="$t('Password')"
      :placeholder="$t('Password')"
      v-model="password"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first("password") }}</span>

    <vs-input
      type="password"
      v-validate="'min:6|max:10|confirmed:password'"
      data-vv-validate-on="blur"
      data-vv-as="password"
      name="confirm_password"
      :label-placeholder="$t('ConfirmPassword')"
      :placeholder="$t('ConfirmPassword')"
      v-model="confirm_password"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{
      errors.first("confirm_password")
    }}</span>
    <div class="flex items-center flex-wrap">
      <vs-checkbox
        v-model="isTermsConditionAccepted"
        class="mt-6"
      ></vs-checkbox>
      <a target="_blank" href="/policy">{{ $t("ConfidentialityAgreement") }}</a>
      &nbsp; {{ $t("And") }}
      <a class="lg:ml-10" target="_blank" href="/offer">{{
        $t("UserAgreement")
      }}</a>
      &nbsp;{{ $t("IAgree") }}
    </div>

    <vs-button type="border" to="/login" class="mt-6">{{
      $t("SignIn")
    }}</vs-button>
    <vs-button
      class="float-right mt-6"
      @click="registerUserJWt"
      :disabled="!validateForm"
      >{{ $t("SignUp") }}</vs-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      confirm_password: "",
      isTermsConditionAccepted: true,
    };
  },

  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.email != "" &&
        this.password != "" &&
        this.confirm_password != "" &&
        this.isTermsConditionAccepted === true
      );
    },
  },

  methods: {
    registerUserJWt() {
      this.$store.dispatch("register", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
