<template>
  <div class="bg-primary sticky z-50" id="ana-sayfa">
    <div class="container">
      <vs-navbar
        class="navbar left-0 right-0 top-0 fixed h-20"
        color="primary"
        :class="{'navbar-fixed': scrollY > 0}"
        text-color="rgba(255,255,255,.6)"
      >
        <div class="w-100" slot="title">
          <a href="/">
            <img src="@/assets/images/logo/logo.png" alt="FollowerPark" class="h-16 p-2 mt-1" />
          </a>
        </div>

        <vs-navbar-item :key="indextr" v-for="(item, indextr) in menuItems">
          <a :href="item.link" v-smooth-scroll>{{item.text}}</a>
        </vs-navbar-item>

        <vs-navbar-item class="mr-6 ml-6">
          <vs-button color="warning" type="border" class="flex m-auto half-button" to="/login">
            <font-awesome-icon size="1x" icon="sign-in-alt" />&nbsp;GİRİŞ
          </vs-button>
        </vs-navbar-item>

        <vs-navbar-item>
          <vs-button
            color="warning"
            type="filled"
            class="flex m-auto half-button"
            to="/register"
          >ÜCRETSİZ DENE</vs-button>
        </vs-navbar-item>
      </vs-navbar>

      <!-- NAVBAR END -->

      <section class="container header__description mb-3 text-center pt-32">
        <h1 class="text-white font-bold text-4xl">Organik olarak instagram takipçilerini artır</h1>
        <p
          class="mb-4 mx-auto mt-4 text-xl max-w-6xl text-white"
        >Instagram sayfanızı doğal yollardan büyütmenin en etkili yolu FollowPark servisi. Sizin belirlediğiniz eylemlerde beğeni, takip, yorum, direk mesaj ve daha birçok işlemi otomatik olarak yapar. Instagram takipçi hilesi yapmadan organik olarak takipçi arttırmanın en kolay yolu!</p>
        <vs-button
          color="warning"
          type="filled"
          class="half-button mt-6 z-10"
          to="/register"
        >ÜCRETSİZ DENE</vs-button>
      </section>
    </div>

    <back-to-top bottom="5%" visibleoffset="500">
      <vs-button icon-pack="feather" icon="icon-arrow-up" class="shadow-lg btn-back-to-top" />
    </back-to-top>

    <img
      src="../../assets/images/pages/headerbg.svg"
      class="absolute left-0 right-0 bottom-0 top-0"
    />
  </div>
</template>

<script>
import BackToTop from 'vue-backtotop';

export default {
  name: 'fp-one-page-header',
  components: {
    BackToTop,
  },

  data: () => ({
    menuItems: [
      {
        link: '#ana-sayfa',
        text: 'Ana Sayfa',
      },
      {
        link: '#neleri-alirsiniz',
        text: 'Neleri alırsınız',
      },
      {
        link: '#hizmetlerimiz',
        text: 'Hizmetlerimiz',
      },
      {
        link: '#mutlu-musterilerimiz',
        text: 'Mutlu Müşterilerimiz',
      },
      {
        link: '#fiyatlar',
        text: 'Fiyatlar',
      },
    ],
  }),

  computed: {
    scrollY() {
      return this.$store.state.scrollY;
    },
  },
};
</script>

<style>
@media (max-width: 800px) {
  .vs-navbar--header {
    width: 100%;
  }
}
</style>

<style scoped>
header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  box-shadow: none;
  -webkit-box-shadow: none;
}

header .vs-con-items a {
  color: #fff !important;
  padding: 0.5rem 1rem;
  font-size: 15px;
}

.header__description::after {
  content: '';
  display: block;
  background: url(../../assets/images/pages/headerbg.png) bottom no-repeat;
  background-size: cover;
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  z-index: -1;
  background-color: #10163a;
  bottom: -141px;
}

.header__description h1 {
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.22);
}

.navbar {
  transition: all 0.5s ease-in-out;
  -webkit-transition: all 0.5s ease-in-out;
}

.navbar-fixed {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
  animation: 0.6s slideDown forwards;
  transition: all 0.5s ease-in-out !important;
}

@media (min-width: 1200px) {
  .navbar {
    padding-right: 10rem;
    padding-left: 10rem;
  }

  .header__description {
    color: #fff !important;
    padding-top: 180px;
  }

  .header__description::after {
    bottom: -190px;
  }

  .header__description p {
    max-width: 600px;
  }
}

@media screen and (max-width: 800px) {
  .vs-navbar--item {
    padding: 5px;
  }
}
</style>