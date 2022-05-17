import { createStore } from "vuex";

const items = new Array(20).fill(0).map((val, index) => {
    return {
        id: index.toString(),
        name: `Card No${index}`,
        dataProviderLinks: [{
            id: "0001",
            dataProvider: "0001",
            identifier: "Dark Mode Toggle"
        }]
    };
});

function generateId () {
    return Date.now();
}

export function clone (value) {
    if (typeof value !== "object") {
        return value;
    }
    return JSON.parse(JSON.stringify(value));
}

export default createStore({
    state: {
        currentProjectId: "",
        currentProject: {},
        projects: items,
        dataProviders: [{
            id: "0001",
            name: "GitHub_H0rn0chse",
            type: "GitHub"
        }, {
            id: "0002",
            name: "Umami_H0rn0chse",
            type: "Umami"
        }],
        supportedDataProviderTypes: [
            "GitHub",
            "Umami"
        ]
    },
    getters: {
    },
    mutations: {
        setCurrentProject (state, projectId) {
            state.currentProjectId = projectId;
            let currentProject = state.projects.find((project) => project.id === state.currentProjectId);
            if (!currentProject) {
                currentProject = state.projects[0];
            }
            state.currentProject = clone(currentProject);
        },
        updateProjectName (state, newName) {
            state.currentProject.name = newName;
        },
        addDataProviderLink (state, data) {
            state.currentProject.dataProviderLinks.push({
                id: generateId(),
                dataProvider: data.dataProvider,
                identifier: data.identifier,
            });
        },
        updateDataProviderLink (state, data) {
            const link = state.currentProject.dataProviderLinks.find((dataProvider) => dataProvider.id === data.linkId);
            if (link) {
                Object.keys(data.props).forEach((name) => {
                    link[name] = data.props[name];
                });
            }
        },
        removeDataProviderLink (state, data) {
            const linkIndex = state.currentProject.dataProviderLinks.findIndex((link) => link.id === data.linkId);
            if (linkIndex > -1) {
                state.currentProject.dataProviderLinks.splice(linkIndex, 1);
            }
        }
    },
    actions: {
        setCurrentProject (context, projectId) {
            context.commit("setCurrentProject", projectId);
        },
        updateProjectName (context, newName) {
            context.commit("updateProjectName", newName);
        },
        addDataProviderLink (context, data) {
            context.commit("addDataProviderLink", data);
        },
        updateDataProviderLink (context, data) {
            context.commit("updateDataProviderLink", data);
        },
        removeDataProviderLink (context, data) {
            context.commit("removeDataProviderLink", data);
        },
    },
    modules: {
    },
});
