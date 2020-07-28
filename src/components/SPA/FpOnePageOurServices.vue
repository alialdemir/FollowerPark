<template>
  <section class="mt-24 pb-24 container" id="hizmetlerimiz">
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
          <h2 class="font-bold">HİZMETLERİMİZ</h2>
        </vs-divider>
      </vs-col>

      <vs-col vs-type="flex" vs-lg="4" vs-sm="12" class="mt-4" vs-xs="12">
        <img
          data-aos="fade-up"
          :data-aos-duration="1000"
          src="@/assets/images/pages/socialmedia.svg"
          alt="FollowerPark"
          class="m-auto responsive"
        />
      </vs-col>

      <vs-col vs-lg="8" vs-sm="12" class="mt-4" vs-xs="12">
        <vs-row class="justify-end">
          <vs-col
            :key="indextr"
            v-for="(item, indextr) in fatues"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="5"
            vs-xs="12"
            class="lg:mr-4 mt-4"
          >
            <vx-card
              data-aos="fade-left"
              :data-aos-duration="indextr * 500"
              class="h-48 hover:shadow-lg"
            >
              <h4 class="font-semibold inline-block">{{item.title}}</h4>
              <p>{{item.description}}</p>
            </vx-card>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
  </section>
</template>

<script>
export default {
  name: 'fp-one-page-our-services',

  data: () => ({
    fatues: [
      {
        icon: 'id-badge',
        title: 'EYLEM OTOMASYONU',
        description:
          'Beğenme, takip etme, takipten çıkma, direk mesaj gönderme, yorum yapma, story izleme, veri toplama ve daha birçok servisi sağlıyoruz. ',
      },
      {
        icon: 'robot',
        title: 'BOTLARI ARAYİP FİLTRELİYOR',
        description:
          'hashtag, geolokasyon, rakiplere göre, takip edilen ve takipçilerinize göre veya kendi belirlediğiniz kullanıcı listesine göre filterelemeler yapıyoruz.',
      },
      {
        icon: 'comments',
        title: 'YORUM YAPMA, DİRECT MESAJ GÖNDERME',
        description:
          'Toplu takip özelliği ile her ay binlerce instagram takipçi kazan. İstatistikleri izleyin ve sadık hayranlar oluşturun.',
      },
      {
        icon: 'clipboard-list',
        title: 'OTO POST PAYLAŞMA, OTO DİREKT MESAJ',
        description:
          'İnstagram tanıtım servisimiz ile tüm paylaşımlarınızı otomatik olarak programa yaptırabilirsiniz.',
      },
      {
        icon: 'chart-line',
        title: 'TANITIM İSTATİSTİĞİ',
        description:
          'Toplu takip hizmeti programının özelliklerinden biri de tüm işlemlerin istatistiğini göstermesidir.',
      },
      {
        icon: 'shield-virus',
        title: 'AKILLI MOD - AKILLI TANITIM',
        description:
          "FollowerPark'ın yapay zekası sizin için akıllı mod özelliğini sunar. Instagram'ın sınırlarına takılmadan oto takip, oto beğeni ve toplu yorum yapabilirsiniz.",
      },
    ],
  }),
};
</script>