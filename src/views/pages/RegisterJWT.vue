<!-- =========================================================================================
File Name: RegisterJWT.vue
Description: Register Page for JWT
----------------------------------------------------------------------------------------
Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="clearfix">
    <vs-input
      v-validate="'required|email'"
      data-vv-validate-on="blur"
      name="email"
      type="email"
      label-placeholder="Eposta"
      placeholder="Eposta"
      v-model="email"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first('email') }}</span>

    <vs-input
      ref="password"
      type="password"
      data-vv-validate-on="blur"
      v-validate="'required|min:6|max:10'"
      name="password"
      label-placeholder="Şifre"
      placeholder="Şifre"
      v-model="password"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>

    <vs-input
      type="password"
      v-validate="'min:6|max:10|confirmed:password'"
      data-vv-validate-on="blur"
      data-vv-as="password"
      name="confirm_password"
      label-placeholder="Şifre Tekrarla"
      placeholder="Şifre Tekrarla"
      v-model="confirm_password"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first('confirm_password') }}</span>
    <div class="flex items-center flex-wrap">
      <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6"></vs-checkbox>
      <a target="_blank" href="/policy">GİZLİLİK SÖZLEŞMESİ</a>&nbsp; ve
      <a class="lg:ml-10" target="_blank" href="/offer">KULLANICI SÖZLEŞMESİ̇</a>&nbsp;kabul ediyorum.
    </div>

    <vs-button type="border" to="/login" class="mt-6">Giriş Yap</vs-button>
    <vs-button class="float-right mt-6" @click="registerUserJWt" :disabled="!validateForm">Üye Ol</vs-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirm_password: '',
      isTermsConditionAccepted: true,
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.email != '' &&
        this.password != '' &&
        this.confirm_password != '' &&
        this.isTermsConditionAccepted === true
      );
    },
  },
  methods: {
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {
        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning',
        });

        return false;
      }
      return true;
    },
    registerUserJWt() {
      // If form is not validated or user is already login return
      if (!this.validateForm || !this.checkLogin()) return;

      const payload = {
        userDetails: {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirm_password,
        },
        notify: this.$vs.notify,
      };
      this.$store.dispatch('auth/registerUserJWT', payload);
    },
  },
};
</script>
