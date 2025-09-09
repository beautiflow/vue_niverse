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
})




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
          title="Sales and Percentage Comparison"
          subtitle="Monthly Performance"
          :options="chartOptions"
          :series="chartSeries"
          :height="400"
        />
      </div>
      <div class="charts-grid">
        <div class="chart-item">
          <ChartComponent
            type="pie"
            title="Fruit Distribution"
            :options="pieOptions"
            :series="pieSeries"
            :height="350"
          />
        </div>
        <div class="chart-item">
          <ChartComponent
            type="donut"
            title="Product Market Share"
            subtitle="2024 Q4"
            :options="donutOptions"
            :series="donutSeries"
            :height="350"
          />
        </div>
      </div>
      <div class="chart-wrapper">
        <ChartComponent
          type="area"
          title="Sales and Percentage Comparison"
          subtitle="Monthly Performance"
          :options="areaOptions"
          :series="areaSeries"
          :height="400"
        />
      </div>

      <div class="chart-wrapper">
        <ChartComponent
          type="heatmap"
          title="Sales and Percentage Comparison"
          subtitle="Monthly Performance"
          :options="heatmapOptions"
          :series="heatmapSeries"
          :height="400"
        />
      </div>

      <div class="chart-wrapper">
        <ChartComponent
          type="scatter"
          title="Sales and Percentage Comparison"
          subtitle="Monthly Performance"
          :options="scatterOptions"
          :series="scatterSeries"
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
