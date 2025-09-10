
export const defaultOptionsByType = {
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
    title: {
      text: ''
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
    dataLabels: {
      enabled: true,
    },
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
    title: {
      text: ''
    },
    dataLabels: {
      enabled: true,
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
    title: {
      text: ''
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
    title: {
      text: ''
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
        },
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
    title: {
      text: ''
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
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((acc, curr) => acc + curr, 0);
            }
          },
          enabled: true
        }
      }
    }
  },
  bubble: {
    chart: {
      type: 'bubble',
      toolbar: {show: true}
    },
    title: {
      text: ''
    },

  },
  heatmap: {
    chart:{
      type: 'heatmap',
      toolbar: {show: true}
    },
    title: {
      text: ''
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 2,
        useFillColorAsStroke: true,
      }
    }
  },
  scatter: {
    chart: {
      type: 'scatter',
      toolbar: {show: true}
    },
    title: {
      text: ''
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
  },
  treemap: {
    chart: {
      type: 'treemap',
      toolbar: {show: true}
    },
    title: {
      text: ''
    },
    plotOptions: {
      treemap: {
        distributed: true,   // 각 블록을 다른 색상으로
        enableShades: false,  // 음영 효과
        shadeIntensity: 0.5, // 색상 강도
        reverseNegativeShade: true, // 음수값 반전
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '14px',
            fontWeight: 'bold'
          }
        }
      }
    }
  },
  boxPlot: {
    chart: {
      type: 'boxPlot',
      toolbar: {show: true}
    },
    title: {
      text: ''
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: '#5C4742',   // 상자 윗부분 색
          lower: '#A5978B'    // 상자 아랫부분 색
        }
      }
    },
    stroke: {
      colors: ['#6c757d'],   // 선 색상
      width: 1
    }
  },
  candlestick: {
      chart: {
        type: 'candlestick',
        toolbar: { show: true }
      },
    title: {
      text: ''
    },
      plotOptions: {
        candlestick: {
          colors: {
            upward: '#00B746',   // 상승봉 색상 (양봉)
            downward: '#EF403C'  // 하락봉 색상 (음봉)
          },
          wick: {
            useFillColor: true   // 봉꼬리 색상을 캔들 색상과 동일하게
          }
        }
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }

  },
  radar: {
    chart: {
      type: 'radar',
      toolbar: {show: true}
    },
    title: {
      text: ''
    },
    plotOptions: {
      radar: {
        size: 140,            // 차트 크기
        polygons: {
          strokeColors: '#e9e9e9',   // 바깥 라인 색
          fill: {
            colors: ['#f8f8f8', '#fff'] // 안쪽 구역 배경 번갈아 색상
          }
        }
      }
    },
    stroke: {
      width: 2
    },
    fill: {
      opacity: 0.3
    },
    markers: {
      size: 4,
      colors: ['#2033f6'],
      strokeColor: '#ffffff',
      strokeWidth: 2
    },
  },
  polarArea: {
    chart: {
      type: 'polarArea',
      toolbar: { show: true}
    },
    title: {
      text: ''
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 1,
          strokeColor: '#e9e9e9'
        },
        spokes: {
          strokeWidth: 1,
          connectorColors: '#e9e9e9'
        },
        startAngle: 0,
        endAngle: 360,
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center'
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    fill: {
      opacity: 0.8
    },

  },
  rangeBar: {
    chart: {
      type: 'rangeBar',
      toolbar: { show: true}
    },
    title: {
      text: ''
    },
    plotOptions: {

    }
  }
};
