<template>
  <div class="home">
    <Meunbar>
      <HelloWorld msg="Welcome-dashboard to Your Vue.js App" />
    </Meunbar>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Meunbar from "../layouts/Meunbar.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Meunbar,
  },
};
</script>
