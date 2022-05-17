import { generateId, clone } from "./shared";

const initialState = () => ({
    currentProvider: {},
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
});

const getters = {
    latestProvider (state) {
        return state.dataProviders[state.dataProviders.length - 1].id;
    }
};

const mutations = {
    setCurrentProvider (state, providerId) {
        let currentProvider = state.dataProviders.find((provider) => provider.id === providerId);
        if (!currentProvider) {
            currentProvider = state.dataProviders[0];
        }
        state.currentProvider = clone(currentProvider);
    },
    updateProviderName (state, newName) {
        state.currentProvider.name = newName;
    },
    updateProviderType (state, newType) {
        state.currentProvider.type = newType;
    },
    deleteProvider (state, providerId) {
        const providerIndex = state.dataProviders.findIndex((provider) => provider.id === providerId);
        if (providerIndex > -1) {
            state.dataProviders.splice(providerIndex, 1);
        }
    },
    addProvider (state, data) {
        state.dataProviders.push({
            id: generateId(),
            name: data.name,
            type: data.type,
        });
    },
    saveCurrentProvider (state) {
        const newProviderData = clone(state.currentProvider);
        const providerIndex = state.dataProviders.findIndex((provider) => provider.id === newProviderData.id);
        if (providerIndex > -1) {
            state.dataProviders[providerIndex] = newProviderData;
        }
    }
};

const actions = {
    setCurrentProvider (context, providerId) {
        context.commit("setCurrentProvider", providerId);
    },
    updateProviderName (context, newName) {
        context.commit("updateProviderName", newName);
    },
    updateProviderType (context, newType) {
        context.commit("updateProviderType", newType);
    },
    deleteProvider (context, providerId) {
        context.commit("deleteProvider", providerId);
    },
    addProvider (context, data) {
        context.commit("addProvider", data);
    },
    saveCurrentProvider (context) {
        context.commit("saveCurrentProvider", null);
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
