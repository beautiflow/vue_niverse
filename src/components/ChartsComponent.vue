<script setup>
import { defineProps, computed, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";

/**
 * Props 정의
 *
 * @prop {String} type - 차트 종류
 * @prop {String} [title] - 차트 제목
 * @prop {String} [subtitle] - 차트 부제목
 * @prop {Array} series - 차트 데이터 배열 (필수)
 * @prop {Object} [xaxis] - X축 설정
 * @prop {Object} [yaxis] - Y축 설정
 * @prop {Object} [options] - ApexCharts 커스텀 옵션
 * @prop {String|Number} [width='100%'] - 차트 너비
 * @prop {String|Number} [height=350] - 차트 높이
 */
const props = defineProps({
  type: {
    type: String,
    default: 'line',
    validator: (value) => {
      const validTypes = ['line', 'area', 'bar', 'pie', 'donut', 'radialBar', 'scatter', 'bubble', 'heatmap', 'treemap', 'boxPlot', 'candlestick', 'radar', 'polarArea', 'rangeBar'];
      return validTypes.includes(value);
    }
  },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  series: {
    type: Array,
    required: true,
    validator: (value) => {
      return Array.isArray(value) && value.length > 0;
    }
  },
  xaxis: {
    type: Object,
    default: () => ({
      categories: []
    })
  },
  yaxis: {
    type: Object,
    default: () => ({
      show: true,
      showAlways: false
    })
  },
  options: { type: Object, default: () => ({}) },
  width: { type: [String, Number], default: '100%' },
  height: { type: [String, Number], default: 350 },
  autoUpdate: { type: Boolean, default: true },
});

// 차트 타입별 기본 설정
const defaultOptionsByType = {
  line: {
    chart: {
      type: 'line',
      toolbar: { show: true },
      zoom: { enabled: true }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    markers: {
      size: 4,
      hover: { size: 6 }
    },
    grid: {
      borderColor: '#000000',
      strokeDashArray: 10
    }
  },
  area: {
    chart: {
      type: 'area',
      toolbar: { show: true },
      zoom: { enabled: true }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: '#f1f1f1',
      strokeDashArray: 3
    }
  },
  bar: {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      zoom: { enabled: true }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: false,
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    grid: {
      borderColor: '#f1f1f1',
      strokeDashArray: 3
    },
  },
  pie: {
    chart: {
      type: 'pie',
      toolbar: { show: true },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: { width: 300 },
        legend: { position: 'bottom' }
      }
    }]
  },
  donut: {
    chart: {
      type: 'donut',
      toolbar: { show: false }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
            }
          }
        }
        ,
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center'
    }
  },
  radialBar: {
    chart: {
      type: 'radialBar',
      toolbar: { show: true }
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: '16px',
            fontWeight: 600,
            offsetY: -10
          },
          value: {
            show: true,
            fontSize: '14px',
            fontWeight: 400,
            offsetY: 5,
            formatter: function (val) {
              return parseInt(val) + '%';
            }
          }
        }
      }
    }
  },
  heatmap: {
    chart:{
      type: 'heatmap',
      toolbar: {show: true}
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,      // 색상 강도
        radius: 2,                // 네모 칸의 모서리 둥글기
        useFillColorAsStroke: true,
      }
    }
  },
  scatter: {
    chart: {
      type: 'scatter',
      toolbar: {show: true}
    },
    plotOptions: {
      scatter: {
        markers: {
          size: 6,
          shape: 'circle',
          strokeWidth: 1,
          hover: {
            size: 8,
            sizeOffset: 3
          }
        }
      }
    }
  }
};

/**
 * computed로 최종 options 통합
 */

const chartOptions = computed(() => {
  //  타이틀 설정
  const getTitleConfig = () => {
    if (!props.title && !props.subtitle) return {};

    const config = {};

    if (props.title) {
      config.title = {
        text: props.title,
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#263238'
        },
        ...props.options.title
      };
    }

    if (props.subtitle) {
      config.subtitle = {
        text: props.subtitle,
        align: 'center',
        style: {
          fontSize: '12px',
          color: '#546E7A'
        },
        ...props.options.subtitle
      };
    }

    return config;
  };

  // 2. 공통 옵션
  const baseOptions = defaultOptionsByType[props.type];
  const titleConfig = getTitleConfig();

  return {
    ...baseOptions,
    ...titleConfig,
    ...props.options,
    chart: {
      ...baseOptions.chart,
      ...props.options.chart
    }
  };
});

// Props 변경 감지 (디버깅용)
if (import.meta.env.DEV) {
  watch(() => props.series, (newVal) => {
    console.log('Chart series updated:', newVal);
  }, { deep: true });

  watch(() => props.options, (newVal) => {
    console.log('Chart options updated:', newVal);
  }, { deep: true });
}
</script>

<template>
  <div class="chart-container">
    <VueApexCharts
      :type="type"
      :title="title"
      :subtitle="subtitle"
      :series="series"
      :xaxis="xaxis"
      :yaxis="yaxis"
      :options="chartOptions"
      :width="width"
      :height="height"
      :autoUpdate="autoUpdate"
    />
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  padding: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 반응형 스타일 */
@media (max-width: 768px) {
  .chart-container {
    padding: 5px;
  }
}
</style>
