import { generateId, clone } from "./shared";

const initialState = () => ({
    currentProject: {
        dataProviderLinks: []
    },
    projects: [],
});

const getters = {
    projectIds (state) {
        return state.projects.map((project) => project.id);
    },
    latestProject (state) {
        return state.projects[state.projects.length - 1].id;
    },
    projectMap (state) {
        return state.projects.reduce((map, project) => {
            map[project.id] = {
                name: project.name,
            };
            return map;
        }, {});
    },
    linkMap (state, localGetters, rootState, rootGetters) {
        const providerMap = rootGetters["provider/providerMap"];
        return state.projects.reduce((map, project) => {
            project.dataProviderLinks.forEach((link) => {
                map[link.id] = {
                    project: project.id,
                    projectName: project.name,
                    dataProvider: link.dataProvider,
                    identifier: link.identifier,
                    dataProviderName: providerMap[link.dataProvider].name,
                    providerType: providerMap[link.dataProvider].type,
                };
            });
            return map;
        }, {});
    },
};

const mutations = {
    setCurrentProject (state, projectId) {
        let currentProject = state.projects.find((project) => project.id === projectId);
        if (!currentProject) {
            currentProject = state.projects[0];
        }
        if (currentProject) {
            state.currentProject = clone(currentProject);
        }
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
            id: data.id || generateId(),
            name: data.name,
            dataProviderLinks: data.dataProviderLinks || [],
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
