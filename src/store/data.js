import { generateId, clone } from "./shared";

export const DATASET_TYPES = {
    Count: "count",
    Unique: "unique"
};

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
        // eslint-disable-next-line no-param-reassign
        data[label] = 0;
        return data;
    }, {});
    const dataUnique = labels.reduce((data, label) => {
        // eslint-disable-next-line no-param-reassign
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
    data: cache
});

const getters = {
    filteredAndGroupedData (state) {
        // todo apply filter
        const labels = getLabels();

        const group1 = ["link-0001", "link-0002"].map((linkId) => {
            return state.data[linkId];
        });
        const group2 = ["link-0003", "link-0004"].map((linkId) => {
            return state.data[linkId];
        });

        const datasets = [
            ...getDatasets(group1, labels, "DarkModeToggle"),
            ...getDatasets(group2, labels, "NightSky"),
        ];

        const result = {
            labels: formatLabels(labels),
            datasets
        };
        console.log(result);
        return result;
    }
};

const mutations = {
};

const actions = {
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations,
    modules: {}
};
