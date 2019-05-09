<template>
    <div id="app" >
        <!-- Header store name with background -->
        <appHeader></appHeader>
        <appMenu></appMenu>
    </div>
</template>

<script>
    import appHeader from "./components/header-uikit.vue";
    import appMenu from "./components/Menu-uikit.vue";

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
