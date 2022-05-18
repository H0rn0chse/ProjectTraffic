import { createApp } from "vue";
// eslint-disable-next-line object-curly-newline
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import autocolors from "chartjs-plugin-autocolors";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, autocolors);

window.store = store;

loadFonts();

const identifier = "H0rn0chse/dark-mode-toggle";
const options = {
    method: "GET",
    headers: {
        accept: "application/vnd.github.v3+json"
    }
};
/*
fetch(`https://api.github.com/repos/${identifier}/traffic/views`, options)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log(json);
    })
    .catch((err) => {
        console.error(err);
    }); */

createApp(App)
    .use(router)
    .use(store)
    .use(vuetify)
    .mount("#app");
