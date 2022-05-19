<template>
    <div class="d-flex flex-row w-100 align-start">
        <div class="d-flex flex-column w-100 mx-8">
            <h1 class="display-2 font-weight-bold mb-3">
                Project Traffic Summary
            </h1>
            <div class="d-flex flex-row w-100 mb-2">
                <v-btn
                    class="me-2"
                    title="Reset Filter and Grouping"
                    @click="resetFilter"
                >
                    Reset Filter and Grouping
                </v-btn>
                <v-btn
                    class="me-2"
                    title="Redraw Chart"
                    @click="redrawChart"
                >
                    Redraw Chart
                </v-btn>
            </div>
            <v-expansion-panels class="mb-10">
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        Filter And Group Data
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <div class="d-flex flex-row w-100">
                            <v-radio-group
                                v-model="groupBy"
                                inline
                                label="GroupBy"
                            >
                                <v-radio
                                    v-for="(option, i) in groupOptions"
                                    :key="i"
                                    :label="option.label"
                                    :value="option.value"
                                ></v-radio>
                            </v-radio-group>
                        </div>
                        <div class="d-flex flex-row w-100">
                            <v-select
                                v-model="filteredProviderTypes"
                                :items="providerTypes"
                                label="Filter by ProviderType"
                                multiple
                                chips
                                persistent-hint
                                dense
                            ></v-select>
                        </div>
                        <div class="d-flex flex-row w-100">
                            <v-select
                                v-model="filteredProviders"
                                :items="providers"
                                label="Filter by DataProvider"
                                multiple
                                chips
                                persistent-hint
                                dense
                            ></v-select>
                        </div>
                        <div class="d-flex flex-row w-100">
                            <v-select
                                v-model="filteredProjects"
                                :items="projects"
                                label="Filter by Project"
                                multiple
                                chips
                                persistent-hint
                                dense
                            ></v-select>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
            <bar
                ref="chart"
                :chart-options="chartOptions"
                :chart-data="chartData"
                chart-id="bar-chart"
                dataset-id-key="labels"
                :width="width"
                :height="height"
            ></bar>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { Bar } from "vue-chartjs";
import { mapActions, mapGetters, mapState } from "vuex";
import { DATASET_TYPES } from "../store/data";
import { clone } from "../store/shared";
import { lighten } from "../utils/colors";

export default defineComponent({
    name: "HomeView",
    data: () => ({
        width: 600,
        height: 400,
        chartOptions: {
            responsive: false,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        title: (tooltipItems) => {
                            return `${tooltipItems[0].dataset.stack}: ${tooltipItems[0].label}`;
                        },
                        label: (tooltipItem) => {
                            if (tooltipItem.dataset.custom.type === DATASET_TYPES.Unique) {
                                return `Unique: ${tooltipItem.raw}`;
                            }
                            return `Views: ${tooltipItem.raw + tooltipItem.dataset.custom.offset[tooltipItem.dataIndex]}`;
                        },
                    }
                },
                autocolors: {
                    customize (context) {
                        const colors = context.colors;
                        return {
                            background: lighten(colors.background, 0.2),
                        };
                    },
                }
            }
        }
    }),
    computed: {
        ...mapGetters("data", {
            chartData: "filteredAndGroupedData",
        }),
        ...mapState("data", {
            filter: "filter",
            group: "group",
            groupOptions: (state) => {
                return Object.values(state.groupOptions);
            }
        }),
        ...mapState("provider", {
            providers: (state) => {
                return state.dataProviders.map((provider) => {
                    return { value: provider.id, title: provider.name };
                });
            },
            providerTypes: (state) => {
                return state.supportedDataProviderTypes.map((provider) => {
                    return { value: provider.id, title: provider.name };
                });
            },
        }),
        ...mapState("project", {
            projects: (state) => {
                return state.projects.map((project) => {
                    return { value: project.id, title: project.name };
                });
            }
        }),
        groupBy: {
            get () {
                return this.group.by;
            },
            set (newValue) {
                this.updateGroupWithProperty("by", newValue);
            }
        },
        filteredProviderTypes: {
            get () {
                return this.filter.providerTypes;
            },
            set (newValue) {
                this.updateFilterWithProperty("providerTypes", newValue);
            }
        },
        filteredProviders: {
            get () {
                return this.filter.providers;
            },
            set (newValue) {
                this.updateFilterWithProperty("providers", newValue);
            }
        },
        filteredProjects: {
            get () {
                return this.filter.projects;
            },
            set (newValue) {
                this.updateFilterWithProperty("projects", newValue);
            }
        },
    },
    methods: {
        ...mapActions("data", [
            "updateFilter",
            "updateGroup",
        ]),
        updateFilterWithProperty (propName, propValue) {
            const newFilter = clone(this.filter);
            newFilter[propName] = propValue;
            this.updateFilter(newFilter);
        },
        updateGroupWithProperty (propName, propValue) {
            const newGroup = clone(this.group);
            newGroup[propName] = propValue;
            this.updateGroup(newGroup);
        },
        resetFilter () {
            this.groupBy = "none";
            this.filteredProviderTypes = [];
            this.filteredProviders = [];
            this.filteredProjects = [];
        },
        redrawChart () {
            this.$refs.chart.chart.reset();
            this.$refs.chart.chart.update();
        }
    },
    components: { Bar },
});
</script>
