<template>
    <v-container>
        <v-row
            class="text-center"
            justify="center"
        >
            <v-col>
                <h1 class="display-2 font-weight-bold mb-3">
                    Projects
                </h1>
            </v-col>
        </v-row>
        <v-row
            class="text-center d.flex-row"
            justify="center"
        >
                <v-card
                    class="ma-3"
                    v-for="(item, i) in items"
                    :key="i"
                    :title="item.name"
                    width="200px"
                    tabindex="0"
                    @keyup.enter="openProject(item.id)"
                    @click="openProject(item.id)"
                    contained-text
                >
                </v-card>
                <add-project-card
                    @save="addProjectAndNavigate"
                ></add-project-card>
        </v-row>
    </v-container>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";

import AddProjectCard from "../components/AddProjectCard.vue";

export default defineComponent({
    name: "ProjectListView",
    computed: {
        ...mapState("project", {
            items: "projects"
        }),
        ...mapGetters("project", [
            "latestProject"
        ]),
    },
    methods: {
        ...mapActions("project", [
            "setCurrentProject",
            "addProject",
        ]),
        addProjectAndNavigate (evt) {
            this.addProject(evt);
            this.openProject(this.latestProject);
        },
        openProject (id) {
            this.setCurrentProject(id);
            this.$router.push(`/project/${id}`);
        }
    },
    components: {
        AddProjectCard,
    }
});
</script>
