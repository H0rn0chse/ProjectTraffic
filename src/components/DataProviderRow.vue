<template>
    <div class="d-flex flex-row align-center">
        <v-select
            class="mx-1"
            label="DataProvider"
            :items="dataProviders"
            v-model="typeId"
        ></v-select>
        <v-text-field
            class="mx-1"
            :style="{ minWidth: '8em' }"
            label="Identifier"
            v-model="identifier"
        ></v-text-field>
        <v-btn
            class="ms-2"
            :style="{ marginBottom: '38px' }"
            title="Remove DataProvider Connection"
            icon="mdi-trash-can"
            @click="deleteItem"
        ></v-btn>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
    name: "DataProviderRow",
    props: {
        linkId: String,
        linkTypeId: String,
        linkIdentifier: String
    },
    emits: [
        "remove",
        "update",
    ],
    // todo: data validation
    data: () => ({
    }),
    computed: {
        ...mapState("provider", {
            dataProviders: (state) => {
                return state.dataProviders.map((provider) => {
                    return { value: provider.id, title: provider.name };
                });
            },
        }),
        typeId: {
            get () {
                return this.linkTypeId;
            },
            set (newValue) {
                this.$emit("update", { id: this.linkId, linkTypeId: newValue });
            }
        },
        identifier: {
            get () {
                return this.linkIdentifier;
            },
            set (newValue) {
                this.$emit("update", { id: this.linkId, linkIdentifier: newValue });
            }
        }
    },
    methods: {
        deleteItem () {
            this.$emit("remove", { id: this.linkId });
        },
    }
});
</script>
