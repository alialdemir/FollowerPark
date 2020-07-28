<template>
  <section class="container mt-24 mb-12">
    <vs-row vs-justify="space-around">
      <vs-col
        :key="indextr"
        v-for="(item, indextr) in footerMenuItems"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-xs="12"
        vs-w="3"
      >
        <vs-list>
          <vs-list-header :title="item.headerTitle" color="dark"></vs-list-header>
          <vs-list-item
            v-show="item.type === 1"
            class="ml-0"
            v-for="(subItem, indextrSubItem1) in item.subItems"
          >
            <template slot="avatar">{{subItem.text}}</template>
          </vs-list-item>

          <vs-list-item
            v-show="item.type === 2"
            class="ml-0"
            v-for="(subItem, indextrSubItem2) in item.subItems"
          >
            <template slot="avatar">
              <vs-button
                size="small"
                color="primary"
                type="flat"
                :to="subItem.link"
                class="w-full text-left"
              >{{subItem.text}}</vs-button>
            </template>
          </vs-list-item>

          <vs-list-item
            v-show="item.type === 3"
            class="ml-0"
            :class="{'border-b-0': !subItem.text}"
            v-for="(subItem, indextrSubItem3) in item.subItems"
            :icon="subItem.icon"
            :subtitle="subItem.text"
          ></vs-list-item>
        </vs-list>
      </vs-col>
    </vs-row>
  </section>
</template>

    
<script>
export default {
  name: 'fp-one-page-footer',
  data: () => ({
    footerMenuItems: [
      {
        headerTitle: 'FollowerPark',
        type: 1,
        subItems: [
          {
            text:
              'Instagram sayfanızı doğal yollardan büyütmenin en etkili yolu FollowPark servisi. Sizin belirlediğiniz eylemlerde beğeni, takip, yorum, direk mesaj ve daha birçok işlemi otomatik olarak yapar. Instagram takipçi hilesi yapmadan organik olarak arttırmanın en kolay yolu!',
          },
        ],
      },
      {
        headerTitle: 'Diğer Sayfalar',
        type: 2,
        subItems: [
          {
            text: 'KULLANİCİ SÖZLEŞMESİ',
            link: '/offer',
          },
          {
            text: 'GİZLİLİK SÖZLEŞMESİ',
            link: '/policy',
          },
          {
            text: 'BLOG',
            link: '/blog',
          },
          {
            text: 'SİTE HARİTASI',
            link: '/site-map',
          },
        ],
      },
      {
        headerTitle: 'İletişim',
        type: 3,
        subItems: [
          {
            icon: 'location_on',
            text: '250 Bush St. Floor 17 San Francisco, CA 94104 United States',
          },
          {
            icon: 'alternate_email',
            text: 'info@followerpark.com',
          },
          {},
          {},
          {},
          {},
          {},
          {},
        ],
      },
    ],
  }),
};
</script>

<style>
.vs-list--avatar {
  width: 100%;
}
</style>