<template>
  <div class="add-monitor">
    <div class="wrapper">
      <form @submit.prevent="addMonitor(monitor)">
        <h2>Add Monitor</h2>
        <select v-model="monitor.httpType">
          <option value="http://">HTTP</option>
          <option value="https://">HTTPS</option>
        </select>
        <div class="group">
          <input type="text" v-model="monitor.url" required>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>URL</label>
        </div>
        <div class="group">
          <input type="text" v-model="monitor.niceName" required>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Nice Name</label>
        </div>
        <transition name="fade">
          <div class="errors" v-if="monitor.errors">
            <p>{{ monitor.errors }}</p>
          </div>
        </transition>
        <button>Add Monitor</button>
      </form>
    </div>
  </div>
</template>

<script scoped>
  import Functions from '../classes/functions';
  import router from '../router';

  export default {
    name: 'Add-Monitor',
    data () {
      return {
        monitor: {
          url: null,
          niceName: null,
          httpType: 'http://',
          followRedirects: true,
          errors: null
        }
      }
    },
    methods: {
      addMonitor(monitor) {
        if (monitor.httpType.indexOf('http') !== -1 && monitor.url && monitor.niceName) {
          Functions.storage.storeMonitor({url: monitor.httpType + monitor.url, niceName: monitor.niceName});
          this.monitor.url = null;
          this.monitor.niceName = null;
          this.monitor.followRedirects = true;
          this.monitor.errors = 'Monitor Added Successfully';
        } else {
          this.monitor.errors = 'Invalid URL';
        }
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0
  }

  button {
    padding: 1em;
    border: 0;
    font-size: 1.3em;
    cursor: pointer;
    color: #fff;
    transition: all 1s;
  }

  button:hover {
    background-color: #ccc;
  }

  .add-monitor {
    .wrapper {
      margin-left: 250px;
      text-align: center;
      form {
        display: inline-block;
      }
    }
  }

  * {
    box-sizing: border-box;
  }

  /* basic stylings ------------------------------------------ */
  h2 {
    text-align: center;
    margin-bottom: 50px;
  }

  h2 small {
    font-weight: normal;
    color: #888;
    display: block;
  }

  .footer {
    text-align: center;
  }

  .footer a {
    color: #53B2C8;
  }

  /* form starting stylings ------------------------------- */
  .group {
    position: relative;
    margin-bottom: 45px;
  }

  input {
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 300px;
    border: none;
    border-bottom: 1px solid #757575;
  }

  input:focus {
    outline: none;
  }

  /* LABEL ======================================= */
  label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  /* active state */
  input:focus ~ label, input:valid ~ label {
    top: -20px;
    font-size: 14px;
    color: #5264AE;
  }

  /* BOTTOM BARS ================================= */
  .bar {
    position: relative;
    display: block;
    width: 300px;
  }

  .bar:before, .bar:after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #5264AE;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  .bar:before {
    left: 50%;
  }

  .bar:after {
    right: 50%;
  }

  /* active state */
  input:focus ~ .bar:before, input:focus ~ .bar:after {
    width: 50%;
  }

  /* HIGHLIGHTER ================================== */
  .highlight {
    position: absolute;
    height: 60%;
    width: 100px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
  }

  /* active state */
  input:focus ~ .highlight {
    -webkit-animation: inputHighlighter 0.3s ease;
    -moz-animation: inputHighlighter 0.3s ease;
    animation: inputHighlighter 0.3s ease;
  }

  /* ANIMATIONS ================ */
  @-webkit-keyframes inputHighlighter {
    from {
      background: #5264AE;
    }
    to {
      width: 0;
      background: transparent;
    }
  }

  @-moz-keyframes inputHighlighter {
    from {
      background: #5264AE;
    }
    to {
      width: 0;
      background: transparent;
    }
  }

  @keyframes inputHighlighter {
    from {
      background: #5264AE;
    }
    to {
      width: 0;
      background: transparent;
    }
  }
</style>
