<template>
  <div id="app">
    <appHeader store_name="Sadda Adda" store_desc="Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life" style="padding:20px" />
  </div>
</template>

<script>
import appHeader from "./components/header.vue";

export default {
  name: "app",
  components: {
    appHeader
  }
};
</script>

<style>

</style>
