<template>
  <div id="app">
    <v-app id="inspire">
      <v-card color="grey lighten-4" flat height="60px" tile>
        <v-toolbar dense fixed color="primary" dark>
          <v-app-bar-nav-icon falt to="/"></v-app-bar-nav-icon>
          <v-toolbar-title>Title</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn falt to="/status" dark text rounded>Status</v-btn>
          <!-- <v-spacer></v-spacer> -->
          <!-- <v-btn falt to="/" color="green" dark text rounded>Home Page</v-btn> -->
          <!-- <v-btn falt to="/status" color="green" dark text rounded>Open Status</v-btn> -->
          <v-btn falt to="/login" dark text roundedn>Login</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon class="sign out icon" @click="logout">
            <!-- <a class="item" @click="logout"> -->
            <v-icon>mdi-account</v-icon>
          </v-btn>
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
import Login from "@/components/Login.vue";

export default {
  name: "Meunbar",
  components: {},
  methods: {
    logout() {
      localStorage.removeItem("LoginResult");
      localStorage.removeItem("Token");
      this.$router.push("/login");
    },
  },
};
</script>
