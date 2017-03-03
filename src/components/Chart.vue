<template>
  <div class="charts">
    <canvas id="myChart" width="1280" height="720"></canvas>
  </div>
</template>

<script scoped>
  import Functions from '../classes/functions';
  import Chart from 'chart.js';
  import router from '../router';

  let labels = [];
  let dataArray = [];
  let myChart;
  let initialized = false;
  let colours = ['#f44336', '#3F51B5', '#E91E63', '#00BCD4', '#4CAF50', '#FFEB3B', '#9E9E9E', '#FF9800', '#9C27B0'];
  export default {
    created() {
      this.getChartData();
    },
    beforeDestroy() {
      if (this.arrayOfNames.length > 1) {
        this.arrayOfNames.forEach((name) => {
          Functions.storage.db.ref('responseTimes').child(Functions.user.uid).child(name).off();
        });
      } else {
        Functions.storage.db.ref('responseTimes').child(Functions.user.uid).child(this.niceName).off();
      }
      labels = [];
      dataArray = [];
      initialized = false;
    },
    mounted() {
      let ctx = document.getElementById("myChart");
      myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: dataArray
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            line: {
              tension: 0,
            },
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
        }
      });
      initialized = true;
    },
    data() {
      return {
        niceName: this.$route.query.niceName,
        arrayOfNames: this.$route.query.niceName.split(','),
      }
    },
    methods: {
      getChartData() {
        function selectColor(colorNum, colors, opacity) {
          if (colors < 1) colors = 1; // defaults to one color - avoid divide by zero
          return "hsla(" + (colorNum * (360 / colors) % 360) + ",100%,50%," + opacity + ")";
        }

        Functions.checkAuth().then(() => {
          if (this.arrayOfNames.length > 1) {
            this.arrayOfNames.forEach((niceName) => {
              Functions.storage.db.ref('responseTimes').child(Functions.user.uid).child(niceName).limitToLast(90).on('child_added', (data) => {
                let response = data.val();
                let index = this.arrayOfNames.indexOf(response.niceName);

                if (!dataArray[index]) {
                  dataArray.push({
                    label: response.niceName,
                    data: [response.timings.firstByte],
                    borderWidth: 1,
                    backgroundColor: selectColor(index, this.arrayOfNames.length, .2)
                  });
                } else {
                  dataArray[index].data.push(response.responseTime);
                }

                if (index === 0) {
                  if (labels.length % 5 === 0) {
                    let date = new Date(response.startTime);
                    labels.push(`${(date.getHours() < 10 ? '0' : '') + date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`);
                  } else {
                    labels.push('');
                  }
                }

                if (initialized === true) {
                  if (dataArray[index].data.length > 90) {
                    dataArray[index].data.shift();
                  }
                  if (labels.length > 90) {
                    labels.shift();
                  }
                  myChart.update();
                }
              });
            });
          } else {
            Functions.storage.db.ref('responseTimes').child(Functions.user.uid).child(this.niceName).limitToLast(90).on('child_added', function (data) {
              let response = data.val();
              let date = new Date(response.startTime);
              if (!dataArray[0]) {
                dataArray.push({
                  label: 'TCP (ms)',
                  data: [Math.floor(response.timings.tcp)],
                  borderWidth: 1,
                  backgroundColor: selectColor(3, 4, .5)
                });
                dataArray.push({
                  label: 'DNS (ms)',
                  data: [Math.floor(response.timings.dns)],
                  borderWidth: 1,
                  backgroundColor: selectColor(1, 4, .5)
                });
                dataArray.push({
                  label: 'First Byte (ms)',
                  data: [Math.floor(response.timings.firstByte)],
                  borderWidth: 1,
                  backgroundColor: selectColor(4, 4, .2)
                });
                dataArray.push({
                  label: 'Total inc Download (ms)',
                  data: [response.responseTime],
                  borderWidth: 1,
                  backgroundColor: selectColor(2, 4, .2)
                });
                labels.push(`${(date.getHours() < 10 ? '0' : '') + date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`)
              } else {
                labels.push(`${(date.getHours() < 10 ? '0' : '') + date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`);
                dataArray[0].data.push(Math.floor(response.timings.tcp));
                dataArray[1].data.push(Math.floor(response.timings.dns));
                dataArray[2].data.push(Math.floor(response.timings.firstByte));
                dataArray[3].data.push(Math.floor(response.responseTime));
              }
              if (initialized === true) {
                if (dataArray[0].data.length > 90) {
                  dataArray[0].data.shift();
                  dataArray[1].data.shift();
                  dataArray[2].data.shift();
                  dataArray[3].data.shift();
                }
                if (labels.length > 90) {
                  labels.shift();
                }
                myChart.update();
              }
            });
          }
        });
      }
    },
    name: 'Chart',
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #myChart {
    width: 100%;
    height: 100vh !important;
  }

  .charts {
    width: calc(100% - 280px);
    margin-left: 265px;
    margin-right: 15px;
    text-align: center;
    max-height: 100%;
    height: 100%;
  }
</style>
