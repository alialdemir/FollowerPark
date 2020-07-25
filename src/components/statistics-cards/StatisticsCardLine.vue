<!-- =========================================================================================
    File Name: StatisticsCard.vue
    Description: Statistics card component
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <vx-card class="overflow-hidden statistics-card-min-height">
    <div slot="no-body">
      <div v-if="isActive=== true" class="space"></div>
      <feather-icon
        v-if="isActive === false"
        :icon="isActive === true ? 'CheckIcon' : isActive === false ? 'XIcon' : ''"
        class="inline-flex rounded-full mx-2 text-right mt-2"
        :class="[`text-dark`, {'mb-4': !iconRight}]"
        :style="{background: `rgba(var(--vs-${isActive === true ? 'success' : 'danger'}))`}"
      ></feather-icon>

      <fp-new-pulse v-if="isNewPulse" class="inline-flex self-end absolute" />

      <div
        class="p-6 cursor-pointer"
        :class="{
              'flex justify-between flex-row-reverse items-center': iconRight,
              'text-center': !iconRight && hideChart,
              'pb-0': !hideChart
            }"
      >
        <feather-icon
          :icon="icon"
          class="p-3 inline-flex rounded-full"
          :class="[`text-${color}`, {'mb-4': !iconRight}]"
          :style="{background: `rgba(var(--vs-${color}),.15)`}"
        ></feather-icon>
        <div>
          <h3
            :style="{color: `rgba(var(--vs-${textColor}))`}"
            class="mb-1 font-bold"
          >{{ statistic }}</h3>
          <span class="whitespace-pre-wrap">{{ statisticTitle }}</span>
        </div>
      </div>

      <div class="line-area-chart" v-if="!hideChart">
        <vue-apex-charts
          ref="apexChart"
          :type="type"
          height="100"
          width="100%"
          :options="chartOptions"
          :series="chartData"
        />
      </div>
    </div>
  </vx-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import chartConfigs from './chartConfigs.js';
import _color from '@/assets/utils/color.js';

export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    statistic: {
      type: [Number, String],
      required: true,
    },
    statisticTitle: {
      type: String,
    },
    chartData: {
      // type: Array,
      // required: true
    },
    color: {
      type: String,
      default: 'primary',
    },
    textColor: {
      type: String,
      default: 'primary',
    },
    colorTo: {
      type: String,
    },
    // chartType: {
    //     type: String,
    //     default: 'line-chart',
    // },
    type: {
      type: String,
      default: 'line',
    },
    iconRight: {
      type: Boolean,
      default: false,
    },
    hideChart: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isNewPulse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chartOptions: null,
    };
  },
  watch: {
    themePrimaryColor() {
      this.$refs.apexChart.updateOptions({
        theme: { monochrome: { color: this.getHex(this.color) } },
      });
    },
  },
  computed: {
    themePrimaryColor() {
      return this.$store.state.themePrimaryColor;
    },
  },
  methods: {
    getHex(color) {
      if (_color.isColor(color)) {
        let rgb = window
          .getComputedStyle(document.documentElement)
          .getPropertyValue(`--vs-${color}`);
        rgb = rgb.split(',');
        return (
          '#' +
          (
            (1 << 24) +
            (Number(rgb[0]) << 16) +
            (Number(rgb[1]) << 8) +
            Number(rgb[2])
          )
            .toString(16)
            .slice(1)
        );
      }
      return color;
    },
    gradientToColor(color) {
      let gradientToColors = {
        primary: '#A9A2F6',
        success: '#55DD92',
        warning: '#ffc085',
        danger: '#F97794',
      };

      return gradientToColors[color]
        ? gradientToColors[color]
        : gradientToColors['primary'];
    },
  },
  components: {
    VueApexCharts,
  },
  created() {
    if (this.type == 'area') {
      // assign chart options
      this.chartOptions = Object.assign({}, chartConfigs.areaChartOptions);

      this.chartOptions['theme'] = {
        monochrome: {
          enabled: true,
          color: this.getHex(this.color),
          shadeTo: 'light',
          shadeIntensity: 0.65,
        },
      };
    } else if (this.type == 'line') {
      // Assign chart options
      this.chartOptions = JSON.parse(
        JSON.stringify(chartConfigs.lineChartOptions)
      );

      this.chartOptions.fill.gradient.gradientToColors = [
        this.gradientToColor(this.colorTo || this.color),
      ];
      this.chartOptions.colors = [this.getHex(this.color)];
    }
  },
};
</script>
<style>
.statistics-card-min-height {
  min-height: 300px;
}

.new-pulse {
  right: 50px;
  top: 10px;
}

.space {
  height: 46px;
}
</style>