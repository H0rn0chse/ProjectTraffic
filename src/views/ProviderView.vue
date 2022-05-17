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
                    title="Back to Providers"
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
                    {{providerNameLocal}}
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
                    label="Provider Name"
                    v-model="providerNameLocal"
                ></v-text-field>
            </div>
            <div class="d-flex flex-row">
                <v-select
                    label="DataProviderType"
                    :items="supportedDataProviderTypes"
                    v-model="typeIdLocal"
                ></v-select>
            </div>
            <v-divider class="my-2"></v-divider>
            <div class="d-flex flex-row justify-end">
                <v-btn
                    class="mx-2"
                    title="Save Provider"
                    @click="saveProvider"
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
                    title="Delete Provider"
                    @click="deleteProviderAndNavBack"
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
import { mapActions, mapState } from "vuex";

export default defineComponent({
    name: "ProviderView",
    mounted () {
        this.setCurrentProvider(this.$route.params.id);
    },
    data: () => ({
        // todo implement dirty handling
        dirty: false,
    }),
    computed: {
        ...mapState("provider", [
            "currentProvider",
            "supportedDataProviderTypes",
        ]),
        providerNameLocal: {
            get () {
                return this.currentProvider?.name || "";
            },
            set (newValue) {
                this.dirty = true;
                this.updateProviderName(newValue);
            }
        },
        typeIdLocal: {
            get () {
                return this.currentProvider?.type || "";
            },
            set (newValue) {
                this.dirty = true;
                this.updateProviderType(newValue);
            }
        },
    },
    methods: {
        ...mapActions("provider", [
            "deleteProvider",
            "setCurrentProvider",
            "updateProviderName",
            "updateProviderType",
            "saveCurrentProvider",
        ]),
        navBack () {
            this.$router.push("/providers");
        },
        navToDashboard () {
            alert("todo: nav to dashboard");
        },
        saveProvider () {
            this.saveCurrentProvider();
            this.dirty = false;
        },
        resetChanges () {
            this.setCurrentProvider(this.$route.params.id);
            this.dirty = false;
        },
        deleteProviderAndNavBack () {
            // todo confirmation
            this.dirty = false;
            this.deleteProvider(this.currentProvider.id);
            this.navBack();
        }
    },
    components: {
    }
});
</script>
