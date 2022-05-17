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
            title="Add Project"
            icon="mdi-plus"
        ></v-icon>
    </v-card>
    <v-dialog
        v-model="show"
    >
        <v-card
            class="d-flex flex-column justify-center"
            title="Add new Project"
            min-width="20em"
        >
            <v-text-field
                class="mx-3"
                :style="{ minWidth: '8em' }"
                label="ProjectName"
                v-model="name"
            ></v-text-field>
            <v-card-actions
                class="d-flex flex-row justify-end"
            >
                <v-btn
                    title="Add Project"
                    @click="addProject"
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

// todo: data validation
export default defineComponent({
    name: "AddProjectCard",
    props: {
    },
    emits: [
        "save",
    ],
    data: () => ({
        show: false,
        name: "",
    }),
    computed: {
    },
    methods: {
        showDialog () {
            this.identifier = "";
            this.typeId = "";
            this.show = true;
        },
        addProject () {
            this.show = false;
            this.$emit("save", { name: this.name });
        },
    }
});
</script>
