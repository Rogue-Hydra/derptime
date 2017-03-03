<template>
  <div class="dashboard">
    <transition-group name="monitors" class="monitors" tag="div">
      <div class="monitor" v-for="monitor in monitors" :key="monitor.url">
        <div v-if="monitor.timings.firstByte <= 1000 && monitor.responseTime !== 2147000000">
          <div class="details">
            <router-link :to="{path: 'chart', query: { niceName: monitor.niceName }}">
              <p class="domain">{{ monitor.niceName }}</p>
              <p class="status-live status-circle"></p>
            </router-link>
          </div>
          <div class="actions" v-on:click="removeMonitor(monitor)">
            <div class="remove">Remove</div>
          </div>
          <p class="color-green response">Response Time: {{ Math.floor(monitor.timings.firstByte) }}ms</p>
        </div>
        <div v-else-if="monitor.timings.firstByte > 1000 && monitor.responseTime !== 2147000000">
          <div class="details">
            <router-link :to="{path: 'chart', query: { niceName: monitor.niceName }}">
              <p class="domain">{{ monitor.niceName }}</p>
              <p class="status-warning status-circle"></p>
            </router-link>
          </div>
          <div class="actions" v-on:click="removeMonitor(monitor)">
            <div class="remove">Remove</div>
          </div>
          <p class="color-orange response">Response Time: {{ Math.floor(monitor.timings.firstByte) }}ms</p>
        </div>
        <div v-else>
          <div class="details">
            <router-link :to="{path: 'chart', query: { niceName: monitor.niceName }}">
              <p class="domain">{{ monitor.niceName }}</p>
              <p class="status-down status-circle"></p>
            </router-link>
          </div>
          <div class="actions" v-on:click="removeMonitor(monitor)">
            <div class="remove">Remove</div>
          </div>
          <p class="color-red response">OFFLINE</p>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script scoped>
  import Functions from '../classes/functions';

  export default {
    name: 'Dashboard',
    data() {
      return {
        monitors: this.getMonitors(true),
        active: false,
        first: true,
      }
    },
    methods: {
      getMonitors(first = false) {
        let monitorsArray = [];
        Functions.storage.db.ref('responseTime').child(Functions.user.uid).on('child_added', (snapshot) => {
          monitorsArray.push(snapshot.val());
        });

        monitorsArray.sort((a, b) => {
          return b.timings.firstByte - a.timings.firstByte;
        });
        if (!first) {
          this.monitors = monitorsArray;
          setTimeout(() => {
            this.getMonitors();
          }, 5000);
        } else {
          this.getMonitors();
          return monitorsArray;
        }
      },
      removeMonitor(monitor) {
        let monitorsRef = Functions.storage.db.ref('monitors').child(Functions.user.uid).child(monitor.niceName);
        let responseTimeRef = Functions.storage.db.ref('responseTime').child(Functions.user.uid).child(monitor.niceName);
        let responseTimesRef = Functions.storage.db.ref('responseTimes').child(Functions.user.uid).child(monitor.niceName);

        monitorsRef.remove();
        responseTimeRef.remove();
        responseTimesRef.remove();

        this.monitors = this.monitors.filter((el) => {
          return el.niceName !== monitor.niceName;
        });
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #myChart {
    margin-left: 250px;
  }

  .monitors-enter-active, .monitors-leave-active {
    transition: all 1s;
  }

  .monitors-move {
    transition: transform .8s;
  }

  .monitors-enter, .monitors-leave-to /* .list-leave-active for <2.1.8 */
  {
    opacity: 0;
    transform: translateY(30px);
  }

  .actions {
    visibility: hidden;
    opacity: 0;
    transition: visibility .5s, opacity .5s;
  }

  .monitors {
    margin-left: 250px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    padding: 0 .5em;
    .monitor {
      display: inline-block;
      position: relative;
      background-color: #EEEEEE;
      margin-top: 1em;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      flex-shrink: 1;
      flex-basis: calc((95% / 1));
      border-radius: 0 0 10px 10px;
      flex-grow: 1;
      margin: 1em .5em 0 .5em;
      &:hover {
        .actions {
          visibility: visible;
          opacity: 1;
        }
      }
      .details {
        a {
          color: #000
        }
      ;
        padding: 1em 2em;
        width: 100%;
        p {
          display: inline-block;
          vertical-align: middle;
        }
      }
      .response {
        text-decoration: none;
        display: block;
        text-align: center;
        background-color: #ccc;
        padding: 1em;
        margin: 0;
        color: #fff;
        border-radius: 0 0 10px 10px;
      }
      .actions {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        text-align: center;
        background-color: #ccc;
        padding: 1em;
        margin: 0;
        color: #fff;
        border-radius: 0 0 10px 10px;
      }
      .status-live, .status-warning, .status-down {
        width: 15px;
        height: 15px;
        border-radius: 99999px;
        margin-left: 2em;
        float: right;
      }

      .status-live {
        background-color: #43A047;
      }
      .status-down {
        background-color: #c62828;
      }

      .status-warning {
        background: #F57C00;
      }

      @media(min-width: 750px) {
        flex-basis: calc((95% / 2));
      }
      @media(min-width: 1100px) {
        flex-basis: calc((95% / 3));
      }
      @media(min-width: 1460px) {
        flex-basis: calc((95% / 4));
      }
      @media(min-width: 1800px) {
        flex-basis: calc((95% / 5));
      }
      @media(min-width: 1800px) {
        flex-basis: calc((95% / 6));
      }
      .color-red {
        background-color: #c62828 !important;
      }

      .color-green {
        background-color: #43A047 !important;
      }

      .color-orange {
        background-color: #F57C00 !important;
      }
    }
  }
</style>
