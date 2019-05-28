const R_FACTOR = 4;
/**
 * Color for each category.
 */
const catColors = {
  'front':'rgba(184,224,210,0.8)',
  'data':'rgba(149,184,209,0.8)',
  'CI/CD':'rgba(255,107,107,0.8)',
  'cloud':'rgba(215,78,9,0.8)',
  'infra':'rgba(242,187,5,0.8)',
  'lang':'rgba(190,168,170,0.8)',
  'agile':'rgba(78,205,196,0.8)',
  'management':'rgba(132,59,98,0.8)',
  'back':'rgba(246,126,125,0.8)',
  'IA':'rgba(185,49,79,0.8)',
  'devops':'rgba(234,196,213,0.8)',
  'mobile':'rgba(93,188,210,0.8)',
  'other': 'rgba(4,67,137,0.8)',
  '????':'rgba(128,155,206,0.8)'
}

function createBubbleChart(data) {
  var ctx = document.getElementById('radar').getContext('2d');
  var bubbleChart = new Chart(ctx, {
    type: 'bubble',
    data: { datasets: data },
    options: {
      tooltips: {
          callbacks: {
              label: function(tooltipItem, data) {
                  var label = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].name;

                  if (label) {
                      label += ': ';
                  }
                  label += 'connais.=' + Math.round(tooltipItem.yLabel * 100) / 100;
                  label += ', envie=' + Math.round(tooltipItem.xLabel * 100) / 100;
                  label += ', nb=' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].r / R_FACTOR;
                  return label;
              }
          }
      },
      plugins: {
        datalabels: {
          anchor: function(context) {
            var value = context.dataset.data[context.dataIndex];
            return value.v < 50 ? 'end' : 'center';
          },
          align: function(context) {
            var value = context.dataset.data[context.dataIndex];
            return value.v < 50 ? 'end' : 'center';
          },
          color: function(context) {
            var value = context.dataset.data[context.dataIndex];
            //return value.v < 50 ? context.dataset.backgroundColor : 'white';
            return 'black';
          },
          font: {
            weight: 'normal'
          },
          formatter: function(value) {
            //return Math.round(value.v);
            if (value.r > 10)
              return value.name;
            return ''
          },
          offset: 2,
          padding: 0
        }
      },
      aspectRatio: 1,
      title: {
        display: false,
        text: 'Radar Zenika'
      }, 
      scales: {
        yAxes: [{ 
          ticks: {
            min: 0,
            max: 5
          },
          scaleLabel: {
            display: true,
            labelString: "Connaissance"
          }
        }],
        xAxes: [{ 
          ticks: {
            min: 0,
            max: 5
          },
          scaleLabel: {
            display: true,
            labelString: "Envie"
          }
        }]
      }
    }
  });

  return bubbleChart;
}