<template>
  <v-app>    
      <router-view />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Login from "./components/Login.vue";

export default Vue.extend({
  name: "App",
  components: {
    Login,
    HelloWorld,
  },

  data: () => ({
    //
  }),
});
</script>
