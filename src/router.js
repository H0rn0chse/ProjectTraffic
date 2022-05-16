import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import LoginView from "./views/LoginView.vue";
import ProjectView from "./views/ProjectView.vue";
import SettingsView from "./views/SettingsView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/projects",
        name: "projects",
        component: ProjectView,
    },
    {
        path: "/settings",
        name: "settings",
        component: SettingsView,
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
