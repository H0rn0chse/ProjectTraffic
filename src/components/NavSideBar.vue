<template>
    <v-navigation-drawer
        expand-on-hover
        rail
        bottom
        permanent
    >
        <v-list>
            <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                title="Sandra Adams"
                subtitle="sandra_a88@gmailcom"
            ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
            density="compact"
            nav
        >
            <v-list-item
                class="me-2"
                v-for="(item, i) in items"
                :key="i"
                :title="item.title"
                :value="item.value"
                :prepend-icon="item.icon"
                @click="handleClick(item.handler, item.arg)"
            >
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "NavSideBar",
    data: () => ({
        items: [
            {
                title: "Dashboard",
                icon: "mdi-home",
                value: "dashboard",
                handler: "navTo",
                arg: "/",
            }, {
                title: "Projects",
                icon: "mdi-format-list-text",
                value: "projects",
                handler: "navTo",
                arg: "/projects",
            }, {
                title: "Settings",
                icon: "mdi-cog",
                value: "settings",
                handler: "navTo",
                arg: "/settings",
            },
        ]
    }),
    methods: {
        handleClick (handlerName, arg) {
            this[handlerName](arg);
        },
        navTo (route) {
            this.$router.push(route);
        },

    }
});
</script>
