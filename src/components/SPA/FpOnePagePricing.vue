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
          <h2 class="font-bold uppercase">{{$t('Pricing')}}</h2>
        </vs-divider>
      </vs-col>
      <vs-col
        :key="indextr"
        v-for="(item, indextr) in products"
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
          :class="{'bg-primary':item.isBestSeller }"
        >
          <vs-chip
            v-if="item.isBestSeller"
            color="primary"
            class="absolute w-full mt--10 bg-warning"
          >{{$t('MostPreferred')}}</vs-chip>
          <div class="product-card-title mb-4 mt-6">
            <h3
              class="font-weight-bold text-uppercase"
              :class="{'text-white':item.isBestSeller, 'text-primary':!item.isBestSeller }"
            >{{item.title}}</h3>
            <p
              class="text-uppercase mb-0"
              :class="{'text-white':item.isBestSeller, 'text-primary':!item.isBestSeller }"
            >{{item.subtitle}} {{$t('Account')}}</p>
          </div>
          <div class="product-card-detail p-4">
            <p class="mb-2 text-primary" v-html="item.price"></p>
            <div>
              <ul class="text-primary" v-html="$t('OrderDescription')"></ul>
            </div>

            <vs-button
              class="btn btn-gradient half-button pl-5 pr-5 mt-4 mb-4"
              color="primary"
              type="filled"
            >{{$t('Order')}}</vs-button>
          </div>
        </div>
      </vs-col>

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
          <h2 class="text-primary">{{$t('StartNow')}}</h2>
          <h3 class="mt-4 mb-8 text-dark text-center">{{$t('SignUpAndgetaFreeFourDayPromotion')}}</h3>
          <vs-button
            color="warning"
            type="filled"
            class="half-button"
            to="/register"
          >{{$t('TryFourDaysFree')}}</vs-button>
        </div>
      </vs-col>
    </vs-row>
  </section>
</template>

<script>
import i18n from '@/i18n/i18n';

export default {
  name: 'fp-one-page-pricing',

  data: () => ({
    products: [
      {
        title: 'Individual',
        subtitle: 1,
        price:
          '<span class="text-5xl font-bold">30<sup class="text-4xl font-normal">₺</sup></span><span>' +
          i18n.t('Monthly') +
          '</span>',
      },
      {
        title: 'Duo',
        subtitle: 2,
        price:
          '<span class="text-5xl font-bold">51<sup class="text-4xl font-normal">₺</sup></span><span>' +
          i18n.t('Monthly') +
          '</span>',
        isBestSeller: true,
      },
      {
        title: 'Triple',
        subtitle: 3,
        price:
          '<span class="text-5xl font-bold">75<sup class="text-4xl font-normal">₺</sup></span><span>' +
          i18n.t('Monthly') +
          '</span>',
      },
      {
        title: 'Quintette',
        subtitle: 5,
        price:
          '<span class="text-5xl font-bold">120<sup class="text-4xl font-normal">₺</sup></span><span>' +
          i18n.t('Monthly') +
          '</span>',
      },
    ],
  }),
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
  background-color: #fff;
  border-radius: 10px;
}

.mt--10 {
  margin-top: -10px;
}
</style>