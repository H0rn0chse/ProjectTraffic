<template>
    <v-card
        class="ma-3 justify-center align-center d-flex"
        min-height="52px"
        width="200px"
        tabindex="0"
        contained-text
        @click="showDialog"
        @keyup.enter="showDialog"
    >
        <v-icon
            title="Add Provider"
            icon="mdi-plus"
        ></v-icon>
    </v-card>
    <v-dialog
        v-model="show"
    >
        <v-card
            class="d-flex flex-column justify-center"
            title="Add new Provider"
            min-width="20em"
        >
            <v-text-field
                class="mx-3"
                :style="{ minWidth: '8em' }"
                label="ProviderName"
                v-model="name"
            ></v-text-field>
            <v-select
                class="mx-3"
                label="DataProviderType"
                :items="supportedDataProviderTypes"
                v-model="type"
            ></v-select>
            <v-card-actions
                class="d-flex flex-row justify-end"
            >
                <v-btn
                    title="Add Provider"
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
    name: "AddProviderCard",
    props: {
    },
    emits: [
        "save",
    ],
    data: () => ({
        show: false,
        name: "",
        type: "",
    }),
    computed: {
        ...mapState("provider", [
            "supportedDataProviderTypes",
        ]),
    },
    methods: {
        showDialog () {
            this.name = "";
            this.type = "";
            this.show = true;
        },
        addProvider () {
            this.show = false;
            this.$emit("save", { name: this.name, type: this.type });
        },
    }
});
</script>
