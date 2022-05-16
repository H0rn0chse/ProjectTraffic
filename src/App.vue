<template>
    <v-app>
        <nav-side-bar/>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>

import NavSideBar from "./components/NavSideBar.vue";

export default {
    name: "App",

    data: () => ({
        //
    }),

    components: {
        NavSideBar,
    },
};
</script>
