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
          <h2 class="font-bold uppercase">{{$t('OurServices')}}</h2>
        </vs-divider>
      </vs-col>

      <vs-col vs-type="flex" vs-lg="4" vs-sm="12" class="mt-4" vs-xs="12">
        <img
          data-aos="fade-up"
          :data-aos-duration="1000"
          src="@/assets/images/pages/socialmedia.svg"
          alt="FollowersPark"
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
              <h4 class="font-semibold inline-block">{{$t(item.title)}}</h4>
              <p>{{$t(item.description)}}</p>
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
        title: 'ActionOtomation',
        description: 'ActionOtomationDescription',
      },
      {
        icon: 'robot',
        title: 'SearchingAndFilteringTheRobots',
        description: 'SearchingAndFilteringTheRobotsDescription',
      },
      {
        icon: 'comments',
        title: 'CommentingSendingDirectMessages',
        description: 'CommentingSendingDirectMessagesDescription',
      },
      {
        icon: 'clipboard-list',
        title: 'AutoPostSharingAutoDirectMessage',
        description: 'AutoPostSharingAutoDirectMessageDescription',
      },
      {
        icon: 'chart-line',
        title: 'PromotionalStatistics',
        description: 'PromotionalStatisticsDescription',
      },
      {
        icon: 'shield-virus',
        title: 'SmartModSmartPromotion',
        description: 'SmartModSmartPromotionDescription',
      },
    ],
  }),
};
</script>