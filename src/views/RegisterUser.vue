<template>
  <div class="home">
    <Register msg="Register App" />
  </div>
</template>

<script>
import Register from "@/components/Register.vue";

export default {
  name: "RegisterUser",
  components: {
    Register,
  },
};
</script>
