<template>
    <div id="app">
        <!-- Header store name with background -->
        <appHeader style="padding:20px"></appHeader>
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
