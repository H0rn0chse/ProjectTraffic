<template>
    <div class="d-flex flex-row w-100 align-start">
        <div
            class="d-flex flex-column w-100 mx-8"
            :style="{ maxWidth: '80em' }"
        >
            <div class="d-flex flex-row align-center mb-2">
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
                    {{projectNameLocal}}
                </h1>
                <span
                    class="align-self-end ms-4 pb-2"
                    :style="{ cursor: 'pointer' }"
                    tabindex="0"
                    @keyup.enter="navToDashboard"
                    @click="navToDashboard"
                >
                    Navigate to Dashboard
                </span>
            </div>
            <h2 class="mb-2">Settings</h2>
            <div class="d-flex flex-row">
                <v-text-field
                    label="Project Name"
                    v-model="projectNameLocal"
                ></v-text-field>
            </div>
            <h3 class="mb-2">Connections</h3>
            <data-provider-row
                v-for="(dataProviderLink, i) in currentProject.dataProviderLinks"
                :key="i"
                ref="dataProviderLinks"
                :linkId="dataProviderLink.id"
                :linkTypeId="dataProviderLink.dataProvider"
                :linkIdentifier="dataProviderLink.identifier"
                @remove="removeDataProvider"
                @update="updateDataProvider"
            ></data-provider-row>
            <div class="d-flex flex-row justify-center">
                <add-data-provider-row-btn
                    @save="addDataProvider"
                ></add-data-provider-row-btn>
            </div>
            <v-divider class="my-2"></v-divider>
            <div class="d-flex flex-row justify-end">
                <v-btn
                    class="mx-2"
                    title="Save Project"
                    @click="saveProject"
                >
                    Save
                </v-btn>
                <v-btn
                    class="mx-2"
                    title="Reset Changes"
                    @click="resetChanges"
                >
                    Reset
                </v-btn>
                <v-btn
                    class="mx-2"
                    title="Delete Project"
                    @click="deleteProjectAndNavBack"
                    color="error"
                >
                    Delete
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";

import DataProviderRow from "../components/DataProviderRow.vue";
import AddDataProviderRowBtn from "../components/AddDataProviderRowBtn.vue";
import { GROUP_OPTIONS } from "../store/data.js";

export default defineComponent({
    name: "ProjectView",
    mounted () {
        const projectId = this.$route.params.id;
        if (this.projectIds.includes(projectId)) {
            this.setCurrentProject(this.$route.params.id);
        } else {
            this.navBack();
        }
    },
    data: () => ({
        // todo implement dirty handling
        dirty: false,
    }),
    computed: {
        ...mapGetters("project", [
            "projectIds",
        ]),
        ...mapState("project", [
            "currentProject",
        ]),
        projectNameLocal: {
            get () {
                return this.currentProject?.name || "";
            },
            set (newValue) {
                this.dirty = true;
                this.updateProjectName(newValue);
            }
        }
    },
    methods: {
        ...mapActions("project", [
            "deleteProject",
            "setCurrentProject",
            "updateProjectName",
            "addDataProviderLink",
            "updateDataProviderLink",
            "removeDataProviderLink",
            "saveCurrentProject",
        ]),
        ...mapActions("data", [
            "updateFilter",
            "updateGroup",
        ]),
        navBack () {
            this.$router.push("/projects");
        },
        navToDashboard () {
            const filter = {
                providerTypes: [],
                providers: [],
                projects: [this.currentProject.id],
            };
            this.updateFilter(filter);
            this.updateGroup({ by: GROUP_OPTIONS.None.value });
            this.$router.push("/");
        },
        saveProject () {
            this.saveCurrentProject();
            this.dirty = false;
        },
        addDataProvider (evt) {
            this.dirty = true;
            const props = {
                dataProvider: evt.typeId,
                identifier: evt.identifier
            };
            this.addDataProviderLink(props);
        },
        updateDataProvider (evt) {
            this.dirty = true;
            const props = {};
            if (evt.linkTypeId) {
                props.dataProvider = evt.linkTypeId;
            }
            if (evt.linkIdentifier) {
                props.identifier = evt.linkIdentifier;
            }
            this.updateDataProviderLink({ linkId: evt.id, props });
        },
        removeDataProvider (evt) {
            this.dirty = true;
            this.removeDataProviderLink({ linkId: evt.id });
        },
        resetChanges () {
            this.setCurrentProject(this.$route.params.id);
            this.dirty = false;
        },
        deleteProjectAndNavBack () {
            // todo confirmation
            this.dirty = false;
            this.deleteProject(this.currentProject.id);
            this.navBack();
        }
    },
    components: {
        DataProviderRow,
        AddDataProviderRowBtn,
    }
});
</script>
