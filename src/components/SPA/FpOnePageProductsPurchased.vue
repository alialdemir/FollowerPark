<template>
  <div class="bg-white item" id="neleri-alirsiniz">
    <section class="p-t-b-182 pb-24 container">
      <vs-row vs-type="flex" vs-justify="space-around">
        <vs-col
          vs-justify="center"
          vs-align="center"
          vs-lg="12"
          vs-sm="12"
          vs-xs="12"
          class="text-center"
        >
          <vs-divider>
            <h2 class="font-bold text-primary uppercase">{{$t('Features')}}</h2>
          </vs-divider>
        </vs-col>
        <vs-col
          :key="indextr"
          v-for="(item, indextr) in productsPurchasedItems"
          vs-type="flex"
          vs-lg="3"
          vs-sm="12"
          class="mt-4"
          vs-xs="12"
        >
          <vx-card data-aos="fade-up" :data-aos-duration="indextr * 500" class="hover:shadow-lg">
            <img :src="item.img" alt slot="no-body" class="responsive card-img-top" />
            <h4 class="text-center mb-4">{{$t(item.title)}}</h4>
            <p>{{$t(item.description)}}</p>
          </vx-card>
        </vs-col>
      </vs-row>
    </section>
  </div>
</template>


<script>
export default {
  name: 'fp-one-page-products-purchased',

  data: () => ({
    productsPurchasedItems: [
      {
        img: require('@/assets/images/pages/likes_cmments.svg'),
        title: 'MoreLikes',
        description: 'MoreLikesDescription',
      },
      {
        img: require('@/assets/images/pages/followers.svg'),
        title: 'MoreFollowers',
        description: 'MoreFollowersDescription',
      },
      {
        img: require('@/assets/images/pages/shopping.svg'),
        title: 'MoreSales',
        description: 'MoreSalesDescription',
      },
    ],
  }),
};
</script>