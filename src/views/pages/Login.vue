<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2">
              <img
                style="width: 410px; height: 322px"
                src="@/assets/images/pages/login.jpg"
                alt="login"
                class="mx-auto"
              />
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">{{ $t("SignIn") }}</h4>
                  <p>&nbsp;</p>
                </div>

                <div>
                  <vs-input
                    name="email"
                    icon-no-border
                    icon="icon icon-user"
                    icon-pack="feather"
                    :label-placeholder="$t('Email')"
                    v-model="email"
                    class="w-full"
                  />

                  <vs-input
                    type="password"
                    name="password"
                    icon-no-border
                    icon="icon icon-lock"
                    icon-pack="feather"
                    :label-placeholder="$t('Password')"
                    v-model="password"
                    class="w-full mt-6"
                  />

                  <div class="flex flex-wrap justify-end my-5">
                    <!-- <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Beni Hatırla</vs-checkbox> -->
                    <router-link to="forgot-password">{{
                      $t("ForgotPassword")
                    }}</router-link>
                  </div>
                  <vs-button to="/register" type="border">{{
                    $t("SignUp")
                  }}</vs-button>
                  <vs-button class="float-right" @click="login">{{
                    $t("SignIn")
                  }}</vs-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      checkbox_remember_me: false,
    };
  },

  methods: {
    async login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>