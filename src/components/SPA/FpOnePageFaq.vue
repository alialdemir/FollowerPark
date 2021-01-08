<template>
  <div class="bg-white">
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
            <h2 class="font-bold text-primary uppercase">{{$t('Faq')}}</h2>
          </vs-divider>
        </vs-col>
        <vs-col vs-type="flex" vs-lg="7" vs-sm="6" class="mt-4" vs-xs="12">
          <vx-card data-aos="fade-up" :data-aos-duration="1000">
            <vs-collapse accordion class="w-full">
              <vs-collapse-item :key="indextr" v-for="(item, indextr) in faqs">
                <div slot="header">{{item.question}}</div>
                {{item.answer}}
              </vs-collapse-item>
            </vs-collapse>
          </vx-card>
        </vs-col>
        <vs-col vs-type="flex" vs-lg="5" vs-sm="6" class="mt-4 lg:pl-6" vs-xs="12">
          <img
            data-aos="fade-left"
            :data-aos-duration="1000"
            src="@/assets/images/pages/faqs.svg"
            alt="FollowersPark"
            class="m-auto responsive"
          />
        </vs-col>
      </vs-row>
    </section>
  </div>
</template>

<script>
export default {
  name: 'fp-one-page-faq',
  data: () => ({
    faqs: [
      {
        question: 'FOLLOWERSPARK İLE NELER YAPABİLİRSİNİZ?',
        answer:
          'Sizin belirlediğiniz hashtag ve popüler kullanıcıları hedef göstererek otomatik beğenme, otomatik takip, otomatik takipten çıkarma, oto direkt mesaj ve yorum yapma görevleri vererek zahmetsizce organik takipçi kazanabilirsiniz.',
      },
      {
        question: 'INSTAGRAM ŞİFREMİ PAYLAŞMAM GEREKİYOR MU?',
        answer:
          "Hayır! sizden hiçbir koşulda Instagram şifreniz istenmez. Eylemler için şifrenize gerek yoktur. Instagram'ın kendi sitesi üzerinden giriş yapmanız yeterli.",
      },
      {
        question:
          "PEKİ OTOMATİK GÖREV YAPARKEN INSTAGRAM'IN HESABIMI ENGELLEMESİ İLE KARŞILAŞIR MIYIM?",
        answer:
          "Hayır! Görev zamanlayıcı ve Akıllı mod özelliği sayesinde Instagram'ın sınırlarına takılmadan girdiğiniz görevler arasında otomatik geçiş yapar. Bu sayede sorunsuz bir şekilde hesabınız gelişir.",
      },
      {
        question: 'FOLLOWERSPARK BOT HESAPLAR İLE İLGİLİ BİR ÇÖZÜM SUNUYOR MU?',
        answer:
          'Merak etmeyin, FollowersPark algoritması sizin için bot hesapları bulup filtreler ve hesabınızın etkileşimi bu sayede artmış olur.',
      },
      {
        question: 'INSTAGRAM TAKİPÇİ SAYISINI NASIL ARTTIRIRIZ?',
        answer:
          'FollowersPark geliştirmiş olduğu yapay zeka sayesinde sizin belirleriğiniz filtere göre instagram üzerinde kullanıcılar ile etkileşimde bulunur. Bu sayede kullanıcılar sizi görür ve takip veya beğeni yapmaya başlar.',
      },
    ],
  }),
};
</script>