<template>
  <div class="bg-white scroll-item" id="mutlu-musterilerimiz">
    <section class="pt-24 pb-24 container">
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
            <h2 class="font-bold text-primary uppercase">{{$t('HappyCustomers')}}</h2>
          </vs-divider>
        </vs-col>
        <vs-col
          :key="indextr"
          v-for="(item, indextr) in customerSays"
          vs-lg="3"
          vs-sm="12"
          class="mt-4 lg:pr-6"
          vs-xs="12"
        >
          <vx-card
            data-aos="flip-up"
            :data-aos-duration="indextr * 500"
            class="h-full flex items-end hover:shadow-lg"
          >
            <p>{{item.description}}</p>
            <div class="flex mt-6">
              <vs-avatar size="40px" :src="item.img" />
              <div class="ml-4">
                <h5 class="font-bold">{{item.name}}</h5>
                <h6>{{item.title}}</h6>
              </div>
            </div>
          </vx-card>
        </vs-col>
      </vs-row>
    </section>
  </div>
</template>

<script>
export default {
  name: 'fp-one-page-happy-customers',
  data: () => ({
    customerSays: [
      {
        img: require('@/assets/images/pages/user1.jpg'),
        description:
          '"Bugün bu seviyelere gelmemde katkınız çok fazla, güvenmezdim böyle sitelere ancak iyi ki bulmuşum sizi"',
        name: 'Melisa Yalçın',
        title: 'Tiktoker',
      },
      {
        img: require('@/assets/images/pages/user3.jpg'),
        description:
          '"Daha önceden de bu siteyi kullanmıştım, çok kaliteli hizmet instagram için hizmetleri var diğer sosyal ağlarda eklense iyi olur"',
        name: 'Cem Kara',
        title: 'Youtuber',
      },
      {
        img: require('@/assets/images/pages/user2.jpg'),
        description:
          '"Diş sağlığı üzerine olan sayfamın büyümesine yardımcı olan kaliteli hizmet sunan nadir sitelerden"',
        name: 'Ebru Kandal',
        title: 'Diş Hekimi',
      },
      {
        img: require('@/assets/images/pages/user4.jpg'),
        description:
          '"Ayakkabı satışı yaptığımız sayfanın büyüyüp gelişmesinde yardımcı olabilecek sayısız hizmetleri vardır kesinlikle tavsiye ederim"',
        name: 'Önder Şan',
        title: 'Online Ayakkabı Satış',
      },
    ],
  }),
};
</script>