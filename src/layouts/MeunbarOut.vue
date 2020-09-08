<template>
  <div id="app">
    <v-app id="inspire">
      <v-card color="grey lighten-4" flat height="60px" tile fixed>
        <v-toolbar dense fixed color="primary" dark>
          <v-app-bar-nav-icon falt to="/"></v-app-bar-nav-icon>
          <v-toolbar-title>Title</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn falt to="/register" dark text roundedn>Register</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <!-- <v-btn icon class="signout icon" @click="logout">
            <v-icon>mdi-account</v-icon>
          </v-btn>-->
        </v-toolbar>
      </v-card>
      <v-main>
        <slot />
      </v-main>
    </v-app>
    <v-footer dense color="primary lighten-1" dark fixed>
      <v-spacer></v-spacer>
      <div>BuisnessBloc&nbsp; &copy; {{ new Date().getFullYear() }}</div>
      <v-spacer></v-spacer>
    </v-footer>
  </div>
</template>
<script>
import Login from '@/components/Login.vue';

export default {
  name: 'MeunbarOut',
  components: {},
  // methods: {
  //   logout() {
  //     localStorage.removeItem('LoginResult');
  //     localStorage.removeItem('Token');
  //     this.$router.push('/');
  //   },
  // },
};
</script>
