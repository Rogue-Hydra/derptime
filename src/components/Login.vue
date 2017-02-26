<template>
  <div class="login">
    <h2>Login | Derptime</h2>
    <form @submit.prevent="login(user)">
      <div class="group">
        <i class="fa fa-user" aria-hidden="true"></i>
        <input type="email" v-model="user.email" placeholder="Email" required>
      </div>
      <div class="group">
        <i class="fa fa-lock" aria-hidden="true"></i>
        <input type="password" v-model="user.password" placeholder="Password" required>
      </div>
      <transition name="fade">
        <div class="errors" v-if="user.errors">
          <p>{{ user.errors }}</p>
        </div>
      </transition>
      <button>Sign In</button>
    </form>
  </div>
</template>

<script>
  import Functions from '../classes/functions';
  import router from '../router';

  export default {
    name: 'Login',
    data () {
      return {
        user: {
          email: null,
          password: null,
          errors: null,
        }
      }
    },
    methods: {
      login(user) {
        Functions.storage.auth.signInWithEmailAndPassword(user.email, user.password).then((user) => {
          router.go('/');
        }).catch((err) => {
          this.user.errors = 'Incorrect Email or Password';
          console.log(err);
        });
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
  * {
    box-sizing: border-box;
  }

  .errors p {
    margin: 1em 0 0 0;
    background-color: #e53935;
    padding: 1em;
    border-radius: 5px;
    color: #fff;
  }

  .login {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    h2 {
      text-align: center;
    }
    form {
      display: inline-block;
      margin: 0 auto;
      text-align: center;

      .group {
        background-color: #3b4148;
        border-radius: 5px;
        margin-top: 1em;
        i, input {
          display: inline-block;
          vertical-align: middle;
        }
        i {
          color: #606468;
          padding: 1.4em;
          background-color: #363b41;
          border-radius: 5px;
        }
        input {
          margin-left: -4px;
          background-color: transparent;
          border: none;
          font-size: .9em;
          color: #fff;
          height: 62px;
          width: 201px;
          padding: .5em;
          transition: all 1s;
          &:focus {
            background-color: rgba(255, 255, 255, .25);
            outline: none;
          }
        }
      }
      button {
        border: none;
        width: 100%;
        margin-top: 1em;
        border-radius: 5px;
        padding: 1em;
        font-size: 1em;
        background-color: #2196F3;
        color: #fff;
        transition: all 1s;
        cursor: pointer;
        &:hover {
          background-color: #1E88E5;
        }
      }
    }
  }

  * {
    box-sizing: border-box;
  }

  /* basic stylings ------------------------------------------ */
  .container {
    width: 600px;
    margin: 30px auto 0;
    display: block;
    background: #FFF;
    padding: 10px 50px 50px;
  }
</style>
