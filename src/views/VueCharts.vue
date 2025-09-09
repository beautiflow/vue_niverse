<script setup>
import SideNavbar from '@/components/SideNavbar.vue';
import ChartComponent from '@/components/ChartsComponent.vue';
import { ref } from 'vue';

const chartSeries = ref([
  {
    type: 'line',
    name: 'Sales',
    data: [30, 40, 45, 50, 49, 60, 70, 91]
  },
  {
    type: 'bar',
    name: 'percent',
    data: [10, 15, 12, 21, 5, 9, 14, 2]
  }
]);

const chartOptions = ref({
  chart: {
    id: 'my-first-chart',
    stacked: false,
  },
  title: {
    text: 'line and bar charts'
  },
  stroke: {
    width: [2, 0],
    curve: 'smooth'
  },
  plotOptions: {
    bar: {
      columnWidth: '50%'
    }
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
  },
  yaxis: [
    {
      title: {
        text: 'Sales',
      },
    },
    {
      opposite: true,
      title: {
        text: 'Percent',
      },
    }
  ],
  colors: ['#008FFB', '#00E396'],
  tooltip: {
    shared: true,
    intersect: false
  }
});

// Pie Series 데이터
const pieSeries = ref([44, 55, 13, 43, 22]);

// Pie Options
const pieOptions = ref({
  chart: {
    type: 'pie'
  },
  title: {
    text: 'pie charts'
  },
  labels: ['Apple', 'Mango', 'Orange', 'Watermelon', 'Grape'],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: { width: 200 },
      legend: {
        position: 'bottom',
      },

    }
  }],
  colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
});

// Donut Series 데이터 (pie와 동일하게 사용 가능)
const donutSeries = ref([44, 55, 13, 43, 22]);

// Donut Options
const donutOptions = ref({
  chart: {
    type: 'donut'
  },
  title: {
    text: 'donut charts'
  },
  labels: ['Apple', 'Mango', 'Orange', 'Watermelon', 'Grape'],
  colors: ['#775DD0', '#00E396', '#FEB019', '#FF4560', '#008FFB'],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: { width: 200 },
      legend: { position: 'bottom' }
    }
  }]
});

const areaSeries = ref([
  {
    name: 'Product A',
    data: [30, 50, 40, 60, 70, 50, 80, 90]
  },
  {
    name: 'Product B',
    data: [20, 40, 30, 50, 60, 40, 70, 80]
  }
]);

// Area Options
const areaOptions = ref({
  chart: {
    type: 'area',
    height: 350,
    toolbar: { show: true }
  },
  title: {
    text: 'area charts'
  },
  colors: ['#00E396', '#008FFB'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth' },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
  },
  yaxis: {
    title: { text: 'Sales' }
  },
  tooltip: {
    shared: true,
    intersect: false
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: { height: 250 },
      legend: { position: 'bottom' }
    }
  }]
});

const heatmapSeries = ref([{
  name: 'V', // 행 이름
  data: [{
    x: 'A', // 열 이름
    y: 9.63
  }, {
    x: 'B',
    y: 4.18
  }, {
    x: 'C',
    y: 3.08
  }, {
    x: 'D',
    y: 4.01
  }, {
    x: 'E',
    y: 3.87
  }]
}, {
  name: 'W',
  data: [{
    x: 'A',
    y: 1.54
  }, {
    x: 'B',
    y: 4.35
  }, {
    x: 'C',
    y: 7.23
  }, {
    x: 'D',
    y: 4.25
  }, {
    x: 'E',
    y: 1.94
  }]
}, {
  name: 'X',
  data: [{
    x: 'A',
    y: 3.55
  }, {
    x: 'B',
    y: 8.93
  }, {
    x: 'C',
    y: 8.98
  }, {
    x: 'D',
    y: 3.23
  }, {
    x: 'E',
    y: 0.01
  }]
}, {
  name: 'Y',
  data: [{
    x: 'A',
    y: 1.39
  }, {
    x: 'B',
    y: 8.55
  }, {
    x: 'C',
    y: 7.10
  }, {
    x: 'D',
    y: 9.88
  }, {
    x: 'E',
    y: 6.00
  }]
}, {
  name: 'Z',
  data: [{
    x: 'A',
    y: 0.39
  }, {
    x: 'B',
    y: 2.95
  }, {
    x: 'C',
    y: 0.17
  }, {
    x: 'D',
    y: 1.11
  }, {
    x: 'E',
    y: 7.28
  }]
}]);

const heatmapOptions = ref({
  chart: {
    type: 'heatmap'
  },
  title: {
    text: 'heatmap charts'
  },
  // 히트맵 전용 옵션
  plotOptions: {
    heatmap: {
      shadeIntensity: 0.5,
      // 색상 스케일 설정
      colorScale: {
        ranges: [{
          from: 0,
          to: 2,
          name: '낮음',
          color: '#520023'
        }, {
          from: 2.1,
          to: 5,
          name: '보통',
          color: '#890F3B'
        }, {
          from: 5.1,
          to: 10,
          name: '높음',
          color: '#D4415C'
        }]
      }
    }
  }
});

const scatterSeries = ref([
  {
    name: "SAMPLE A",
    data: [
      [16.4, 5.4], [21.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2], [10.9, 7.4], [10.9, 0], [10.9, 8.2], [16.4, 0], [16.4, 1.8], [13.6, 0.3], [13.6, 0], [29.9, 0], [27.1, 2.3], [16.4, 0], [13.6, 3.7], [10.9, 5.2], [16.4, 6.5], [10.9, 0], [24.5, 7.1], [10.9, 0], [8.1, 4.7], [19, 0], [21.7, 1.8], [27.1, 0], [24.5, 0], [27.1, 0], [29.9, 1.5], [27.1, 0.8], [22.1, 2]]
  },{
    name: "SAMPLE B",
    data: [
      [36.4, 13.4], [1.7, 11], [5.4, 8], [9, 17], [1.9, 4], [3.6, 12.2], [1.9, 14.4], [1.9, 9], [1.9, 13.2], [1.4, 7], [6.4, 8.8], [3.6, 4.3], [1.6, 10], [9.9, 2], [7.1, 15], [1.4, 0], [3.6, 13.7], [1.9, 15.2], [6.4, 16.5], [0.9, 10], [4.5, 17.1], [10.9, 10], [0.1, 14.7], [9, 10], [12.7, 11.8], [2.1, 10], [2.5, 10], [27.1, 10], [2.9, 11.5], [7.1, 10.8], [2.1, 12]]
  },{
    name: "SAMPLE C",
    data: [
      [21.7, 3], [23.6, 3.5], [24.6, 3], [29.9, 3], [21.7, 20], [23, 2], [10.9, 3], [28, 4], [27.1, 0.3], [16.4, 4], [13.6, 0], [19, 5], [22.4, 3], [24.5, 3], [32.6, 3], [27.1, 4], [29.6, 6], [31.6, 8], [21.6, 5], [20.9, 4], [22.4, 0], [32.6, 10.3], [29.7, 20.8], [24.5, 0.8], [21.4, 0], [21.7, 6.9], [28.6, 7.7], [15.4, 0], [18.1, 0], [33.4, 0], [16.4, 0]]
  }
]);

const scatterOptions = ref({
  chart: {
    height: 350,
    type: 'scatter',
    zoom: {
      enabled: true,
      type: 'xy'
    }
  },
  title: {
    text: 'scatter charts'
  },
  xaxis: {
    tickAmount: 10,
    labels: {
      formatter: function(val) {
        return parseFloat(val).toFixed(1)
      }
    }
  },
  yaxis: {
    tickAmount: 7
  }
});

const radialBarSeries = ref([44, 55, 67, 83]);

const radialBarOptions = ref({
  chart: {
    height: 350,
    type: 'radialBar',
  },
  title: {
    text: 'radialBar charts'
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          fontSize: '22px',
        },
        value: {
          fontSize: '16px',
        },
        total: {
          show: true,
          label: 'Total',
          formatter: function () {
            return 249
          }
        }
      }
    }
  }
});

const bubbleSeries = ref([
  {
    name: 'Series 1',
    data: [
      { x: 10, y: 20, z: 15 },
      { x: 15, y: 25, z: 30 },
      { x: 20, y: 10, z: 10 },
      { x: 25, y: 35, z: 25 },
      { x: 30, y: 40, z: 20 }
    ]
  },
  {
    name: 'Series 2',
    data: [
      { x: 5, y: 15, z: 20 },
      { x: 10, y: 30, z: 10 },
      { x: 20, y: 25, z: 35 },
      { x: 25, y: 45, z: 30 },
      { x: 35, y: 50, z: 40 }
    ]
  }
]);

const bubbleOptions = {
  chart: {
    type: 'bubble',
    height: 350,
    toolbar: { show: true }
  },
  title: {
    text: 'bubble charts'
  },
  xaxis: {
    tickAmount: 12,
    type: 'numeric',
    title: { text: 'X Axis' }
  },
  yaxis: {
    max: 60,
    title: { text: 'Y Axis' }
  },
  fill: {
    opacity: 0.8
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " units";
      }
    }
  }
};

const treemapSeries = ref([
  {
    data: [
      {
        x: 'New Delhi',
        y: 218
      },
      {
        x: 'Kolkata',
        y: 149
      },
      {
        x: 'Mumbai',
        y: 184
      },
      {
        x: 'Ahmedabad',
        y: 55
      },
      {
        x: 'Bangaluru',
        y: 84
      },
      {
        x: 'Pune',
        y: 31
      },
      {
        x: 'Chennai',
        y: 70
      },
      {
        x: 'Jaipur',
        y: 30
      },
      {
        x: 'Surat',
        y: 44
      },
      {
        x: 'Hyderabad',
        y: 68
      },
      {
        x: 'Lucknow',
        y: 28
      },
      {
        x: 'Indore',
        y: 19
      },
      {
        x: 'Kanpur',
        y: 29
      }
    ]
  }
]);

const treemapOptions = ref({
  chart: {
    height: 350,
    type: 'treemap'
  },
  title: {
    text: 'treemap charts'
  },
  legend: {
    show: false
  },
});

const boxPlotSeries = ref([
  {
    data: [
      {
        x: 'Jan 2015',
        y: [54, 66, 69, 75, 88]
      },
      {
        x: 'Jan 2016',
        y: [43, 65, 69, 76, 81]
      },
      {
        x: 'Jan 2017',
        y: [31, 39, 45, 51, 59]
      },
      {
        x: 'Jan 2018',
        y: [39, 46, 55, 65, 71]
      },
      {
        x: 'Jan 2019',
        y: [29, 31, 35, 39, 44]
      },
      {
        x: 'Jan 2020',
        y: [41, 49, 58, 61, 67]
      },
      {
        x: 'Jan 2021',
        y: [54, 59, 66, 71, 88]
      }
    ]
  }
]);

const boxPlotOptions = ref({
  chart: {
    type: 'boxPlot',
    height: 350
  },
  title: {
    text: 'boxPlot charts'
  },
  plotOptions: {
    boxPlot: {
      colors: {
        upper: '#5C4742',
        lower: '#A5978B'
      }
    }
  }
});

const candlestickSeries = ref([
  { data: [{
      x: new Date(1538778600000),
      y: [6629.81, 6650.5, 6623.04, 6633.33]
    },
      {
        x: new Date(1538780400000),
        y: [6632.01, 6643.59, 6620, 6630.11]
      },
      {
        x: new Date(1538782200000),
        y: [6630.71, 6648.95, 6623.34, 6635.65]
      },
      {
        x: new Date(1538784000000),
        y: [6635.65, 6651, 6629.67, 6638.24]
      },
      {
        x: new Date(1538785800000),
        y: [6638.24, 6640, 6620, 6624.47]
      },
      {
        x: new Date(1538787600000),
        y: [6624.53, 6636.03, 6621.68, 6624.31]
      },
      {
        x: new Date(1538789400000),
        y: [6624.61, 6632.2, 6617, 6626.02]
      },
      {
        x: new Date(1538791200000),
        y: [6627, 6627.62, 6584.22, 6603.02]
      },
      {
        x: new Date(1538793000000),
        y: [6605, 6608.03, 6598.95, 6604.01]
      },
      {
        x: new Date(1538794800000),
        y: [6604.5, 6614.4, 6602.26, 6608.02]
      },
      {
        x: new Date(1538796600000),
        y: [6608.02, 6610.68, 6601.99, 6608.91]
      },
      {
        x: new Date(1538798400000),
        y: [6608.91, 6618.99, 6608.01, 6612]
      },
      {
        x: new Date(1538800200000),
        y: [6612, 6615.13, 6605.09, 6612]
      },
      {
        x: new Date(1538802000000),
        y: [6612, 6624.12, 6608.43, 6622.95]
      },
      {
        x: new Date(1538803800000),
        y: [6623.91, 6623.91, 6615, 6615.67]
      },
      {
        x: new Date(1538805600000),
        y: [6618.69, 6618.74, 6610, 6610.4]
      },
      {
        x: new Date(1538807400000),
        y: [6611, 6622.78, 6610.4, 6614.9]
      },
      {
        x: new Date(1538809200000),
        y: [6614.9, 6626.2, 6613.33, 6623.45]
      },
      {
        x: new Date(1538811000000),
        y: [6623.48, 6627, 6618.38, 6620.35]
      },
      {
        x: new Date(1538812800000),
        y: [6619.43, 6620.35, 6610.05, 6615.53]
      },
      {
        x: new Date(1538814600000),
        y: [6615.53, 6617.93, 6610, 6615.19]
      },
      {
        x: new Date(1538816400000),
        y: [6615.19, 6621.6, 6608.2, 6620]
      },
      {
        x: new Date(1538818200000),
        y: [6619.54, 6625.17, 6614.15, 6620]
      },
      {
        x: new Date(1538820000000),
        y: [6620.33, 6634.15, 6617.24, 6624.61]
      },
      {
        x: new Date(1538821800000),
        y: [6625.95, 6626, 6611.66, 6617.58]
      },
      {
        x: new Date(1538823600000),
        y: [6619, 6625.97, 6595.27, 6598.86]
      },
      {
        x: new Date(1538825400000),
        y: [6598.86, 6598.88, 6570, 6587.16]
      },
      {
        x: new Date(1538827200000),
        y: [6588.86, 6600, 6580, 6593.4]
      },
      {
        x: new Date(1538829000000),
        y: [6593.99, 6598.89, 6585, 6587.81]
      },
      {
        x: new Date(1538830800000),
        y: [6587.81, 6592.73, 6567.14, 6578]
      },
      {
        x: new Date(1538832600000),
        y: [6578.35, 6581.72, 6567.39, 6579]
      },
      {
        x: new Date(1538834400000),
        y: [6579.38, 6580.92, 6566.77, 6575.96]
      },
      {
        x: new Date(1538836200000),
        y: [6575.96, 6589, 6571.77, 6588.92]
      },
      {
        x: new Date(1538838000000),
        y: [6588.92, 6594, 6577.55, 6589.22]
      },
      {
        x: new Date(1538839800000),
        y: [6589.3, 6598.89, 6589.1, 6596.08]
      },
      {
        x: new Date(1538841600000),
        y: [6597.5, 6600, 6588.39, 6596.25]
      },
      {
        x: new Date(1538843400000),
        y: [6598.03, 6600, 6588.73, 6595.97]
      },
      {
        x: new Date(1538845200000),
        y: [6595.97, 6602.01, 6588.17, 6602]
      },
      {
        x: new Date(1538847000000),
        y: [6602, 6607, 6596.51, 6599.95]
      },
      {
        x: new Date(1538848800000),
        y: [6600.63, 6601.21, 6590.39, 6591.02]
      },
      {
        x: new Date(1538850600000),
        y: [6591.02, 6603.08, 6591, 6591]
      },
      {
        x: new Date(1538852400000),
        y: [6591, 6601.32, 6585, 6592]
      },
      {
        x: new Date(1538854200000),
        y: [6593.13, 6596.01, 6590, 6593.34]
      },
      {
        x: new Date(1538856000000),
        y: [6593.34, 6604.76, 6582.63, 6593.86]
      },
      {
        x: new Date(1538857800000),
        y: [6593.86, 6604.28, 6586.57, 6600.01]
      },
      {
        x: new Date(1538859600000),
        y: [6601.81, 6603.21, 6592.78, 6596.25]
      },
      {
        x: new Date(1538861400000),
        y: [6596.25, 6604.2, 6590, 6602.99]
      },
      {
        x: new Date(1538863200000),
        y: [6602.99, 6606, 6584.99, 6587.81]
      },
      {
        x: new Date(1538865000000),
        y: [6587.81, 6595, 6583.27, 6591.96]
      },
      {
        x: new Date(1538866800000),
        y: [6591.97, 6596.07, 6585, 6588.39]
      },
      {
        x: new Date(1538868600000),
        y: [6587.6, 6598.21, 6587.6, 6594.27]
      },
      {
        x: new Date(1538870400000),
        y: [6596.44, 6601, 6590, 6596.55]
      },
      {
        x: new Date(1538872200000),
        y: [6598.91, 6605, 6596.61, 6600.02]
      },
      {
        x: new Date(1538874000000),
        y: [6600.55, 6605, 6589.14, 6593.01]
      },
      {
        x: new Date(1538875800000),
        y: [6593.15, 6605, 6592, 6603.06]
      },
      {
        x: new Date(1538877600000),
        y: [6603.07, 6604.5, 6599.09, 6603.89]
      },
      {
        x: new Date(1538879400000),
        y: [6604.44, 6604.44, 6600, 6603.5]
      },
      {
        x: new Date(1538881200000),
        y: [6603.5, 6603.99, 6597.5, 6603.86]
      },
      {
        x: new Date(1538883000000),
        y: [6603.85, 6605, 6600, 6604.07]
      },
      {
        x: new Date(1538884800000),
        y: [6604.98, 6606, 6604.07, 6606]
      },
    ]}
]);

const candlestickOptions = ref({
  chart: {
    type: 'candlestick',
    height: 350
  },
  title: {
    text: 'CandleStick Chart',
    align: 'left'
  },
  xaxis: {
    type: 'datetime'
  },
  yaxis: {
    tooltip: {
      enabled: true
    }
  }
});

const radarSeries = ref([
  {
    name: 'Series 1',
    data: [80, 50, 30, 40, 100, 20],
  }
]);

const radarOptions = ref({
  chart: {
    height: 350,
    type: 'radar',
  },
  title: {
    text: 'Basic Radar Chart'
  },
  yaxis: {
    stepSize: 20
  },
  xaxis: {
    categories: ['January', 'February', 'March', 'April', 'May', 'June']
  }
});

const polarAreaSeries = ref([14, 23, 21, 17, 15, 10, 12, 17, 21]);

const polarAreaOptions = ref({
  chart: {
    type: 'polarArea',
  },
  title: {
    text: 'polarArea charts'
  },
  stroke: {
    colors: ['#fff']
  },
  fill: {
    opacity: 0.8
  },
  labels: ['A','B','C','D','E','F','G','H','I'],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
});

const rangeBarSeries = ref([
  {
    data: [
      {
        x: 'Code',
        y: [
          new Date('2019-03-02').getTime(),
          new Date('2019-03-04').getTime()
        ]
      },
      {
        x: 'Test',
        y: [
          new Date('2019-03-04').getTime(),
          new Date('2019-03-08').getTime()
        ]
      },
      {
        x: 'Validation',
        y: [
          new Date('2019-03-08').getTime(),
          new Date('2019-03-12').getTime()
        ]
      },
      {
        x: 'Deployment',
        y: [
          new Date('2019-03-12').getTime(),
          new Date('2019-03-18').getTime()
        ]
      }
    ]
  }
]);

const rangeBarOptions = ref({
  chart: {
    height: 350,
    type: 'rangeBar'
  },
  plotOptions: {
    bar: {
      horizontal: true
    }
  },
  title: {
    text: 'rangeBar charts'
  },
  xaxis: {
    type: 'datetime'
  }
});




</script>

<template>
  <div class="dashboard">
    <SideNavbar />
    <div class="main-content">
      <h1 style="text-align: center; font-weight: bold; margin-bottom: 30px;">
        Vue Chart
      </h1>
      <div class="chart-wrapper">
        <ChartComponent
          type="line"
          :series="chartSeries"
          :options="chartOptions"
          :height="400"
        />
      </div>
      <div class="chart-wrapper">
        <ChartComponent
          type="area"
          :series="areaSeries"
          :options="areaOptions"
          :height="400"
        />
      </div>
      <div class="charts-grid">
        <div class="chart-item">
          <ChartComponent
            type="pie"
            :series="pieSeries"
            :options="pieOptions"
            :height="350"
          />
        </div>
        <div class="chart-item">
          <ChartComponent
            type="donut"
            :series="donutSeries"
            :options="donutOptions"
            :height="350"
          />
        </div>
      </div>
      <div class="chart-wrapper">
        <ChartComponent
          type="radialBar"
          :series="radialBarSeries"
          :options="radialBarOptions"
          :height="400"
        />
      </div>
      <div class="chart-wrapper">
        <ChartComponent
          type="scatter"
          :series="scatterSeries"
          :options="scatterOptions"
          :height="400"
        />
      </div>
      <div class="charts-grid">
        <ChartComponent
          type="bubble"
          :series="bubbleSeries"
          :options="bubbleOptions"
          :height="400"
        />
        <ChartComponent
          type="heatmap"
          :series="heatmapSeries"
          :options="heatmapOptions"
          :height="400"
        />
      </div>

      <div class="charts-grid">
        <ChartComponent
          type="treemap"
          :series="treemapSeries"
          :options="treemapOptions"
          :height="400"
        />
        <ChartComponent
          type="boxPlot"
          :series="boxPlotSeries"
          :options="boxPlotOptions"
          :height="400"
        />
      </div>

      <div class="chart-wrapper">
        <ChartComponent
          type="candlestick"
          :series="candlestickSeries"
          :options="candlestickOptions"
          :height="400"
        />
      </div>

      <div class="charts-grid">
        <ChartComponent
          type="radar"
          :series="radarSeries"
          :options="radarOptions"
          :height="400"
        />
        <ChartComponent
          type="polarArea"
          :series="polarAreaSeries"
          :options="polarAreaOptions"
          :height="400"
        />
      </div>
      <div class="chart-wrapper">
        <ChartComponent
          type="rangeBar"
          :series="rangeBarSeries"
          :options="rangeBarOptions"
          :height="400"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 250px;
}

.chart-wrapper {
  margin-bottom: 30px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.chart-item {
  background: white;
  border-radius: 8px;
  padding: 5px;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 10px;
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
