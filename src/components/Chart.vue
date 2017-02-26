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
  let datas = [];
  let myChart;
  let intialized = false;
  export default {
    beforeDestroy() {
      Functions.storage.db.ref('responseTimes').child(Functions.user.uid).child(this.niceName).off();
    },
    mounted() {
      let ctx = document.getElementById("myChart");
      myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: `${this.niceName} Response Time (ms)`,
            data: datas,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
        }
      });
      intialized = true;
    },
    data() {
      return {
        niceName: this.$route.query.niceName,
        data: this.getChartData(),
      }
    },
    methods: {
      getChartData() {
        Functions.checkAuth().then(() => {
          Functions.storage.db.ref('responseTimes').child(Functions.user.uid).child(this.niceName).limitToLast(30).on('child_added', function (data) {
            let response = data.val();
            let startTime = new Date(response.startTime);
            labels.push(startTime.getHours() + ':' + startTime.getMinutes());
            datas.push(response.responseTime);
            if (intialized === true) {
              if (labels.length > 30) {
                labels.shift();
                datas.shift();
              }
              myChart.update();
            }
          });
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
    height: 100%;
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
