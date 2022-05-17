<template>
    <v-container class="d-flex flex-column">
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
        </div>
        <div class="d-flex flex-row flex-wrap w-100">
            <div class="d-flex flex-column flex-grow-1 px-2">
                <h2 class="mb-2">Settings</h2>
                <div class="d-flex flex-row">
                    <v-text-field
                        label="Project Name"
                        v-model="projectNameLocal"
                    ></v-text-field>
                </div>
                <h3 class="mb-2">DataProviders</h3>
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
                <div class="d-flex flex-row">
                    <v-btn
                        title="Save Project"
                        @click="saveProject"
                    >
                        Save
                    </v-btn>
                    <v-btn
                        title="Reset Changes"
                        @click="resetChanges"
                    >
                        Reset
                    </v-btn>
                </div>
            </div>
            <div class="d-flex flex-column flex-grow-1 px-2">
                <h2 class="mb-2" >Traffic</h2>
                <p>Right1</p>
                <p>Right2</p>
            </div>
        </div>
    </v-container>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

import DataProviderRow from "../components/DataProviderRow.vue";
import AddDataProviderRowBtn from "../components/AddDataProviderRowBtn.vue";

export default defineComponent({
    name: "ProjectView",
    mounted () {
        this.setCurrentProject(this.$route.params.id);
    },
    data: () => ({
        // todo implement dirty handling
        dirty: false,
    }),
    computed: {
        ...mapState([
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
        ...mapActions([
            "setCurrentProject",
            "updateProjectName",
            "addDataProviderLink",
            "updateDataProviderLink",
            "removeDataProviderLink",
        ]),
        navBack () {
            this.$router.push("/projects");
        },
        saveProject () {
            alert("todo: save")
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
        }
    },
    components: {
        DataProviderRow,
        AddDataProviderRowBtn,
    }
});
</script>
