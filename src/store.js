import { createStore } from "vuex";

const items = new Array(20).fill(0).map((val, index) => {
    return {
        id: index.toString(),
        name: `Card No${index}`
    };
});

export default createStore({
    state: {
        currentProjectId: null,
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
        currentProject (state) {
            if (!state.currentProjectId) {
                return state.tmp[0];
            }
            // todo: change tmp to productive
            return state.tmp.find((project) => {
                return project.id === state.currentProjectId;
            });
        }
    },
    mutations: {
        setCurrentProject (state, projectId) {
            state.currentProjectId = projectId;
        },
    },
    actions: {
        setCurrentProject (context, projectId) {
            context.commit("setCurrentProject", projectId);
        },
    },
    modules: {
    },
});
