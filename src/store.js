import { createStore } from "vuex";

const items = new Array(20).fill(0).map((val, index) => {
    return {
        id: index.toString(),
        name: `Card No${index}`
    };
});
console.log(items);

export default createStore({
    state: {
        projects: [{
            id: "0001",
            name: "Lorem Ipsum"
        }, {
            id: "0002",
            name: "Dolor Sit"
        }],
        tmp: items
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    },
});
