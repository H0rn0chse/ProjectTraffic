<template>
    <v-btn
        class="ms-2"
        :style="{ marginBottom: '38px' }"
        title="Add DataProvider"
        icon="mdi-plus"
        @click="showDialog"
    ></v-btn>
    <!-- todo: remove workaround -->
    <v-dialog
        :style="{ zIndex: 2000 }"
        v-model="show"
    >
        <v-card
            class="d-flex flex-column justify-center"
            title="Link DataProvider"
            min-width="20em"
        >
            <v-select
                class="mx-3"
                label="DataProvider"
                :items="dataProviders"
                v-model="typeId"
            ></v-select>
            <v-text-field
                class="mx-3"
                :style="{ minWidth: '8em' }"
                label="Identifier"
                v-model="identifier"
            ></v-text-field>
            <v-card-actions
                class="d-flex flex-row justify-end"
            >
                <v-btn
                    title="Add DataProvider"
                    @click="addProvider"
                >
                    Add
                </v-btn>
                <v-btn
                    title="Cancel"
                    @click="show=false"
                >
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";

// todo: data validation
export default defineComponent({
    name: "AddDataProviderRowBtn",
    props: {
    },
    emits: [
        "save",
    ],
    data: () => ({
        show: false,
        identifier: "",
        typeId: "",
    }),
    computed: {
        ...mapState({
            dataProviders: (state) => {
                return state.dataProviders.map((provider) => {
                    return { value: provider.id, title: provider.name };
                });
            },
        })
    },
    methods: {
        showDialog () {
            this.identifier = "";
            this.typeId = "";
            this.show = true;
        },
        addProvider () {
            this.show = false;
            this.$emit("save", { typeId: this.typeId, identifier: this.identifier });
        },
    }
});
</script>
