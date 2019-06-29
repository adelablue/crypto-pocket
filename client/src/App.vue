<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Always expand</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample02">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
           <li class="nav-item">
            <router-link class="nav-link" to="/portfolio" v-if="isAuthenticated">Portfolio</router-link>
          </li>
           <li class="nav-item">
            <router-link class="nav-link" to="/admin/currencies" v-if="isAdmin">Manage Currencies</router-link>
          </li>
           <li class="nav-item">
            <router-link class="nav-link" to="/login" v-if="!isAuthenticated">Login</router-link>
            <a href="#" class="nav-link" @click.prevent="logout" v-else>Logout</a>
          </li>
           <li class="nav-item">
            <router-link class="nav-link" to="/register" v-if="!isAuthenticated">Register</router-link>
          </li>
          
        </ul>
      </div>
    </nav>
    <div id="page-content-container" class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import {EventBus} from './event-bus';
export default {
  data() {
    return {
      isAdmin: false,
      isAuthenticated: false
    }
  },
  created() {
    EventBus.$on('login', this.login);

    if (localStorage.getItem('token')) {
      this.isAuthenticated = true;
    }

    let user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.isAdmin = user.isAdmin;
    }
  },
  methods: {
    login(data) {

      this.error = '';

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      this.isAuthenticated = true;
      this.isAdmin = data.user.isAdmin;


      this.$router.push('/portfolio');
    },
    logout(data) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      this.isAuthenticated = false;
      this.isAdmin = false;

      this.$router.push('/');
    },


  }
}
</script>
<style>
#page-content-container {
  margin-top: 60px;
}
  
</style>