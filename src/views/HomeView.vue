<template>
    <div class="d-flex flex-row w-100 align-start">
        <div class="d-flex flex-column w-100 mx-8">
            <h1 class="display-2 font-weight-bold mb-3">
                Project Traffic Summary
            </h1>
            <div class="d-flex flex-row w-100">
                <v-btn
                    title="All (Clear all preferences)"
                >
                    All
                </v-btn>
            </div>
            <div class="d-flex flex-row w-100">
                <v-radio-group
                    v-model="groupBy"
                    inline
                    label="GroupBy"
                >
                    <v-radio
                        label="None"
                        value="none"
                    ></v-radio>
                    <v-radio
                        label="DataProvider"
                        value="provider"
                    ></v-radio>
                    <v-radio
                        label="Project"
                        value="project"
                    ></v-radio>
                </v-radio-group>
            </div>
            <bar
                :chart-options="chartOptions"
                :chart-data="chartData"
                chart-id="bar-chart"
                dataset-id-key="labels"
                width.number="400"
                height.number="400"
            ></bar>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { Bar } from "vue-chartjs";
import { mapGetters } from "vuex";
import { DATASET_TYPES } from "../store/data";
import { lighten } from "../utils/colors";

export default defineComponent({
    name: "HomeView",
    data: () => ({
        groupBy: "none",
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
        })
    },
    components: { Bar },
});
</script>
