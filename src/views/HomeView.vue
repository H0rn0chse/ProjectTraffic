<template>
    <div class="d-flex flex-row w-100 align-start">
        <div class="d-flex flex-column w-100 mx-8">
            <h1 class="display-2 font-weight-bold mb-3">
                Project Traffic Summary
            </h1>
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

export default defineComponent({
    name: "HomeView",
    data: () => ({
        chartData: {
            labels: ["January", "February", "March"],
            datasets: [{
                label: "Dataset 1",
                data: [40, 20, 12]
            }]
        },
        chartOptions: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "Chart.js Bar Chart"
                }
            }
        }
    }),
    components: { Bar },
});
</script>
