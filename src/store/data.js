import { generateId, clone } from "./shared";

export const DATASET_TYPES = Object.freeze({
    Count: "count",
    Unique: "unique"
});

const GROUP_OPTIONS = Object.freeze({
    None: {
        label: "None",
        value: "none"
    },
    DataProvider: {
        label: "DataProvider",
        value: "provider"
    },
    Project: {
        label: "Project",
        value: "project"
    },
});

function generateNumber (min, max) {
    return Math.round(min + Math.random() * (max - min));
}

function generateViews (minUniques, maxUniques, maxCount) {
    return new Array(14).fill(0).map((val, index) => {
        const date = `2022-05-${(index + 1).toString().padStart(2, "0")}`;
        const unique = generateNumber(minUniques, maxUniques);
        const count = generateNumber(unique, maxCount);
        return {
            date,
            unique,
            count
        };
    });
}

function getLabels () {
    return new Array(14).fill(0).map((val, index) => {
        return `2022-05-${(index + 1).toString().padStart(2, "0")}`;
    });
}

function formatLabels (labels) {
    return labels.map((label) => {
        const [year, month, day] = label.split("-");
        return `${day}.${month}`;
    })
}

function getDatasets (links, labels, datasetLabel) {
    const dataCount = labels.reduce((data, label) => {
        data[label] = 0;
        return data;
    }, {});
    const dataUnique = labels.reduce((data, label) => {
        data[label] = 0;
        return data;
    }, {});
    links.forEach((link) => {
        link.views.forEach((viewData) => {
            if (labels.includes(viewData.date)) {
                dataCount[viewData.date] += viewData.count - viewData.unique;
                dataUnique[viewData.date] += viewData.unique;
            }
        });
    });
    return [{
        label: `Unique/${datasetLabel}`,
        data: Object.values(dataUnique),
        stack: datasetLabel,
        custom: {
            type: DATASET_TYPES.Unique,
        },
    }, {
        label: `Views/${datasetLabel}`,
        data: Object.values(dataCount),
        stack: datasetLabel,
        custom: {
            type: DATASET_TYPES.Count,
            offset: Object.values(dataUnique),
        },
    }];
}

const cache = {
    "link-0001": {
        views: generateViews(5, 20, 100),
        referrer: ["Google"]
    },
    "link-0002": {
        views: generateViews(3, 10, 40),
        referrer: ["github.com", "webcomponents.org"]
    },
    "link-0003": {
        views: generateViews(5, 10, 50),
        referrer: ["Google", "stackoverflow.com"]
    },
    "link-0004": {
        views: generateViews(1, 5, 15),
        referrer: ["github.com", "npmjs.com"]
    }
};

const initialState = () => ({
    currentFilter: {},
    data: cache,
    group: {
        by: "none"
    },
    filter: {
        providerTypes: [],
        providers: [],
        projects: [],
    },
    groupOptions: GROUP_OPTIONS
});

const getters = {
    groupedLinks (state, localGetters, rootState, rootGetters) {
        const linkMap = rootGetters["project/linkMap"];
        const projectMap = rootGetters["project/projectMap"];
        const providerMap = rootGetters["provider/providerMap"];
        const links = Object.keys(state.data);

        let groups, groupData;
        switch (state.group.by) {
            case GROUP_OPTIONS.Project.value:
                groupData = links.reduce((map, link) => {
                    const projectId = linkMap[link].project;
                    if (!map[projectId]) {
                        map[projectId] = [];
                    }
                    map[projectId].push(link);
                    return map;
                }, {});
                groups = Object.keys(groupData).map((projectId) => {
                    return {
                        name: projectMap[projectId].name,
                        links: groupData[projectId],
                    };
                });
                break;
            case GROUP_OPTIONS.DataProvider.value:
                groupData = links.reduce((map, link) => {
                    const dataProviderId = linkMap[link].dataProvider;
                    if (!map[dataProviderId]) {
                        map[dataProviderId] = [];
                    }
                    map[dataProviderId].push(link);
                    return map;
                }, {});
                groups = Object.keys(groupData).map((providerId) => {
                    return {
                        name: providerMap[providerId].name,
                        links: groupData[providerId],
                    };
                });
                break;
            default: // GROUP_OPTIONS.None
                groups = [{
                    name: "All",
                    links
                }];
        }
        return groups;
    },
    filteredLinks (state, localGetters, rootState, rootGetters) {
        const links = Object.keys(state.data);
        const linkMap = rootGetters["project/linkMap"];

        return links.filter((linkId) => {
            if (state.filter.providerTypes.length) {
                const providerType = linkMap[linkId].providerType;
                if (!state.filter.providerTypes.includes(providerType)) {
                    return false;
                }
            }
            if (state.filter.providers.length) {
                const providerId = linkMap[linkId].dataProvider;
                if (!state.filter.providers.includes(providerId)) {
                    return false;
                }
            }
            if (state.filter.projects.length) {
                const projectId = linkMap[linkId].project;
                if (!state.filter.projects.includes(projectId)) {
                    return false;
                }
            }
            return true;
        });
    },
    filteredAndGroupedData (state, localGetters) {
        const groups = localGetters.groupedLinks;
        const filteredLinks = localGetters.filteredLinks;
        const labels = getLabels();

        const datasetCollection = groups.reduce((datasets, group) => {
            const groupData = group.links
                .filter((linkId) => {
                    return filteredLinks.includes(linkId);
                })
                .map((linkId) => {
                    return state.data[linkId];
                });

            if (!groupData.length) {
                return datasets;
            }

            const groupDatasets = getDatasets(groupData, labels, group.name);
            return [
                ...datasets,
                ...groupDatasets
            ];
        }, []);

        const result = {
            labels: formatLabels(labels),
            datasets: datasetCollection
        };
        console.log(result);
        return result;
    }
};

const mutations = {
    updateFilter (state, newFilter) {
        state.filter = newFilter;
    },
    updateGroup (state, newGroup) {
        state.group = newGroup;
    },
};

const actions = {
    updateFilter (context, newFilter) {
        context.commit("updateFilter", clone(newFilter));
    },
    updateGroup (context, newGroup) {
        context.commit("updateGroup", clone(newGroup));
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
