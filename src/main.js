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

const projectPromise = fetch("/state/projects")
    .then((response) => {
        return response.json();
    })
    .then((projects) => {
        projects.forEach((project) => {
            store.dispatch("project/addProject", project);
        });
    })
    .catch((err) => {
        console.error(err);
    });

const providerPromise = fetch("/state/dataProviders")
    .then((response) => {
        return response.json();
    })
    .then((dataProviders) => {
        dataProviders.forEach((provider) => {
            store.dispatch("provider/addProvider", provider);
        });
    })
    .catch((err) => {
        console.error(err);
    });

fetch("/config/providerTypes")
    .then((response) => {
        return response.json();
    })
    .then((types) => {
        store.commit("provider/setSupportedProviderTypes", types);
    })
    .catch((err) => {
        console.error(err);
    });

Promise.all([
    projectPromise,
    providerPromise
]).then(() => {
    const linkMap = store.getters["project/linkMap"];
    const promises = Object.keys(linkMap).map(async (linkId) => {
        const link = linkMap[linkId];
        const url = `/data/traffic?identifier=${encodeURIComponent(link.identifier)}&provider=${encodeURIComponent(link.providerType)}`;
        const response = await fetch(url);
        const result = await response.json();
        return {
            id: linkId,
            data: result,
        };
    });
    return Promise.all(promises);
}).then((results) => {
    const data = results.reduce((map, result) => {
        map[result.id] = result.data;
        return map;
    }, {});
    store.commit("data/setData", data);
});

createApp(App)
    .use(router)
    .use(store)
    .use(vuetify)
    .mount("#app");
