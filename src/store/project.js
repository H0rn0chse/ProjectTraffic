import { generateId, clone } from "./shared";

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
            name: data.name
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