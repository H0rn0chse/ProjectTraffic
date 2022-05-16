<template>
    <v-container>
        <v-col>
            <v-row
                align="center"
                class="mb-2"
            >
                <v-icon
                    :style="{ cursor: 'pointer' }"
                    icon="mdi-chevron-left"
                    title="Back to Projects"
                    tabindex="0"
                    @keyup.enter="navBack"
                    @click="navBack"
                ></v-icon>
                <h1
                    class="display-2 font-weight-bold"
                    :style="{ cursor: 'pointer' }"
                    tabindex="0"
                    @keyup.enter="navBack"
                    @click="navBack"
                >
                    {{currentProject.name}}
                </h1>
            </v-row>
        </v-col>
        <v-row>
            <v-col>
                <h2 class="mb-2">Settings</h2>
                <v-row>
                    <v-text-field
                        label="Project Name"
                        v-model="projectName"
                    ></v-text-field>
                </v-row>
            </v-col>
            <v-col>
                <h2 class="mb-2" >Traffic</h2>
                <p>Right1</p>
                <p>Right2</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
    name: "ProjectView",
    mounted () {
        this.setCurrentProject(this.$route.params.id);
        this.setCurrentData();
    },
    beforeRouteEnter (to, from, next) {
        next((that) => {
            if (to.name === "project") {
                that.setCurrentData();
            }
        });
    },
    data: () => ({
        projectName: null
    }),
    computed: {
        ...mapGetters(["currentProject"]),
    },
    methods: {
        ...mapActions(["setCurrentProject"]),
        // separate data and model to enable cancel
        setCurrentData () {
            this.projectName = this.currentProject.name;
        },
        resetData () {
            this.projectName = null;
        },
        navBack () {
            this.resetData();
            this.$router.push("/projects");
        }
    }
});
</script>
