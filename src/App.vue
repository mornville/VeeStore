<template>
  <div id="app">
 <!-- Header store name with background -->
    <appHeader store_name="Sadda Adda" store_desc="Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life" style="padding:20px"></appHeader>
    <appMenu></appMenu>
      </div>
</template>

<script>
import appHeader from "./components/header.vue";
import appMenu from "./components/menu.vue";

export default {
  name: "app",
  components: {
    appHeader,
    appMenu
  }
};
</script>

<style>

</style>
