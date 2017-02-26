<template>
  <nav class="sidebar">
    <ul>
      <li><router-link to="/">Dashboard</router-link></li>
      <li><router-link to="/add-monitor">Add Monitor</router-link></li>
      <li class="logout"><a v-on:click="logout()">Logout</a></li>
    </ul>
  </nav>
</template>

<script>
  import Functions from '../../classes/functions';
  import router from '../../router';
  export default {
    name: 'Sidebar',
    methods: {
      logout: function() {
        Functions.storage.auth.signOut().then(() => {
          router.go('/');
        }, function(error) {
          console.log(error);
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  nav {
    position: fixed;
    background-color: #EEEEEE;
    display: inline-block;
    min-width: 250px;
    min-height:100vh;
    ul {
      padding:0;
      margin:0;
      list-style-type: none;
      li {
        border-bottom:1px solid #ccc;
        display: block;
        a {
          color: #000;
          display: block;
          text-align: center;
          text-decoration: none;
          padding:1em;
          transition: all .5s;
        }
        a:hover {
          background-color: #ccc;
        }
      }
    }
  }
  .logout {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 250px;
    border-top: 1px solid #ccc;
    cursor: pointer;
  }
</style>
