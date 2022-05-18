import { generateId, clone } from "./shared";

const items = [{
    id: "project-0001",
    name: "DarkModeToggle",
    dataProviderLinks: [{
        id: "link-0001",
        dataProvider: "provider-0001",
        identifier: "H0rn0chse/dark-mode-toggle"
    }, {
        id: "link-0002",
        dataProvider: "provider-0002",
        identifier: "Dark Mode Toggle"
    }]
}, {
    id: "project-0002",
    name: "NightSky",
    dataProviderLinks: [{
        id: "link-0003",
        dataProvider: "provider-0001",
        identifier: "H0rn0chse/NightSky"
    }, {
        id: "link-0004",
        dataProvider: "provider-0002",
        identifier: "NightSky"
    }]
}];

const initialState = () => ({
    currentProject: {},
    projects: items,
});

const getters = {
    latestProject (state) {
        return state.projects[state.projects.length - 1].id;
    }
};

const mutations = {
    setCurrentProject (state, projectId) {
        let currentProject = state.projects.find((project) => project.id === projectId);
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
    },
    deleteProject (state, projectId) {
        const projectIndex = state.projects.findIndex((project) => project.id === projectId);
        if (projectIndex > -1) {
            state.projects.splice(projectIndex, 1);
        }
    },
    addProject (state, data) {
        state.projects.push({
            id: generateId(),
            name: data.name,
            dataProviderLinks: [],
        });
    },
    saveCurrentProject (state) {
        const newProjectData = clone(state.currentProject);
        const projectIndex = state.projects.findIndex((project) => project.id === newProjectData.id);
        if (projectIndex > -1) {
            state.projects[projectIndex] = newProjectData;
        }
    }
};

const actions = {
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
    deleteProject (context, projectId) {
        context.commit("deleteProject", projectId);
    },
    addProject (context, data) {
        context.commit("addProject", data);
    },
    saveCurrentProject (context) {
        context.commit("saveCurrentProject", null);
    },
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations,
    modules: {}
};
