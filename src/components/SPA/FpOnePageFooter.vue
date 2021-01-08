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
          <vs-list-header :title="$t(item.headerTitle)" color="dark"></vs-list-header>
          <vs-list-item
            v-show="item.type === 1"
            class="ml-0"
            v-for="(subItem, indextrSubItem1) in item.subItems"
          >
            <template slot="avatar">{{$t(subItem.text)}}</template>
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
                class="w-full text-left pl-0"
              >{{$t(subItem.text)}}</vs-button>
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
        headerTitle: 'FollowersPark',
        type: 1,
        subItems: [
          {
            text: 'FooterDescription',
          },
        ],
      },
      {
        headerTitle: 'OtherPages',
        type: 2,
        subItems: [
          {
            text: 'UserAgreement',
            link: '/offer',
          },
          {
            text: 'ConfidentialityAgreement',
            link: '/policy',
          },
          {
            text: 'BLOG',
            link: '/blog',
          },
          {
            text: 'SiteMap',
            link: '/site-map',
          },
        ],
      },
      {
        headerTitle: 'Contact',
        type: 3,
        subItems: [
          {
            icon: 'location_on',
            text: '250 Bush St. Floor 17 San Francisco, CA 94104 United States',
          },
          {
            icon: 'alternate_email',
            text: 'info@followerspark.com',
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