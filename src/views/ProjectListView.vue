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
                <v-card
                    class="ma-3 justify-center align-center d-flex"
                    width="200px"
                    tabindex="0"
                    @keyup.enter="addProject"
                    @click="addProject"
                    contained-text
                >
                    <v-icon
                        title="Add Project"
                        icon="mdi-plus"
                    ></v-icon>
                </v-card>
        </v-row>
    </v-container>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
    name: "ProjectListView",
    computed: {
        ...mapState({
            items: "tmp"
        })
    },
    methods: {
        ...mapActions(["setCurrentProject"]),
        addProject () {
            alert("Add Project");
        },
        openProject (id) {
            this.setCurrentProject(id);
            this.$router.push("/project");
        }
    }
});
</script>
