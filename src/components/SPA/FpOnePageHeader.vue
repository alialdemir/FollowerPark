<template>
  <div class="bg-primary sticky z-50" id="ana-sayfa">
    <div class="container">
      <fp-one-page-navbar />

      <!-- NAVBAR END -->

      <section class="container header__description mb-3 text-center pt-32">
        <h1 class="text-white font-bold text-4xl">{{$t('OnePageH1')}}</h1>
        <p class="mb-4 mx-auto mt-4 text-xl max-w-6xl text-white">{{$t('OnePageDescription')}}</p>
        <vs-button
          color="warning"
          type="filled"
          class="half-button mt-6 z-10"
          to="/register"
        >{{$t('TryForFree')}}</vs-button>
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
import FpOnePageNavbar from './FpOnePageNavbar';

export default {
  name: 'fp-one-page-header',
  components: {
    BackToTop,
    FpOnePageNavbar,
  },
};
</script>

<style scoped>
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
@media (min-width: 1200px) {
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
</style>