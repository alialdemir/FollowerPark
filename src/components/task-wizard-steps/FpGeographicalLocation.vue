
<template>
  <vx-card title="Search geographic location you want to find">
    <p>We recommend you to enter up to 10 geographic locations.</p>
    <div class="relative mb-4">
      <GmapMap
        :center="center"
        :zoom="zoom"
        style="width: 100%; height: 400px"
        @click="mapClicked"
        :options="{
            zoomControl: true,
            scaleControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            disableDefaultUi: false
          }"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        />
      </GmapMap>

      <div class="p-2 absolute bottom-0 w-full">
        <form class="flex" v-on:submit.prevent="onSearchGeographicalLocation">
          <vs-input
            v-model="search"
            icon="search"
            autofocus
            class="w-full mr-4"
            :warning="true"
            placeholder="Search"
          />
          <vs-button color="warning" type="filled" @click="onSearchGeographicalLocation">Search</vs-button>
        </form>
      </div>
    </div>

    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
        <vs-textarea
          class="w-full h-full location-links"
          v-model="georaphicalLocation"
          placeholder="For example: https://www.instagram.com/explore/locations/212903416"
          width="300px"
        />
      </vs-col>
      <vs-col vs-type="flex" vs-w="6" class="p-2">
        <vs-row class="location-links__chip overflow-y-auto">
          <vs-col
            :key="indextr"
            v-for="(item, indextr) in searchGeographicalLocation"
            vs-type="flex"
            class="cursor-pointer mt-2"
            vs-w="6"
          >
            <div @click="selectPlace(item)">
              <vs-chip
                :color="item.place.closable === true ? 'success':''"
                :closable="item.place.closable === true"
              >
                {{item.place.location.name}}
                <b>&nbsp;|&nbsp;</b>
                {{ item.place.location.pk}}
              </vs-chip>
            </div>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>

    <div class="flex items-center">
      <vs-checkbox color="success" v-model="interactWithPosts">interact with posts of the last</vs-checkbox>

      <vs-input-number v-model="interactWithPostsDays" />
      <p>days</p>
    </div>
  </vx-card>
</template>

<script>
import * as InsApi from '@/middleware/InsApi';
import { mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'fp-georaphical-location',
  created() {
    this.$store.dispatch('search', []);
  },

  data() {
    return {
      georaphicalLocation: '',
      zoom: 6,
      search: '',
      center: { lat: 39.925533, lng: 32.866287 },
      markers: [],
    };
  },

  watch: {
    georaphicalLocation(val) {
      if (val) {
        this.$store.dispatch('setTaskConfigurations', {
          georaphicalLocations: JSON.parse(JSON.stringify(val.split('\n'))),
        });
      }
    },
  },

  computed: {
    searchGeographicalLocation() {
      return this.$store.state.searchGeographicalLocation;
    },

    ...mapFields([
      'taskConfigurations.interactWithPosts',
      'taskConfigurations.interactWithPostsDays',
    ]),
  },

  methods: {
    mapClicked(marker) {
      /* const selectedPosition = {
        position: {
          lat: marker.latLng.lat(),
          lng: marker.latLng.lng(),
        },
      };

       this.markers.push(selectedPosition);
      */
    },

    addMarker(marker) {
      this.markers.push(marker);
    },

    onSearchGeographicalLocation() {
      if (this.search.trim() !== '') {
        this.$store.dispatch('postMessage', {
          type: 'GET',
          responseType: 'search',
          url: InsApi.search(this.search.trim()),
        });
      }
    },

    selectPlace(selectedItem) {
      const url = InsApi.exploreLocations(selectedItem.place.location.pk);
      if (
        this.georaphicalLocation.indexOf(url) !== -1 &&
        selectedItem.place.closable === true
      ) {
        this.georaphicalLocation = this.georaphicalLocation
          .replace(url + '\n', '')
          .replace(url, '')
          .trim();

        selectedItem.place.closable = false;

        this.$store.dispatch('selectSearchLocation', selectedItem);

        return;
      }

      this.addMarker({
        position: selectedItem.place.location,
      });

      this.center = {
        lat: selectedItem.place.location.lat,
        lng: selectedItem.place.location.lng,
      };

      this.zoom = 10;

      this.georaphicalLocation = `${this.georaphicalLocation}\n${url}`.trim();

      selectedItem.place.closable = true;

      this.$store.dispatch('selectSearchLocation', selectedItem);
    },
  },
};
</script>

<style>
.gmnoprint {
  bottom: 381px !important;
}

.location-links textarea,
.location-links,
.location-links__chip {
  max-height: 284px;
  height: 284px;
}

.location-links textarea,
.location-links {
  border: 1px solid #b8ddf8;
  border-radius: 5px;
  background: #fafdff;
}
</style>