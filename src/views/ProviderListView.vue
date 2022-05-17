<template>
    <v-container>
        <v-row
            class="text-center"
            justify="center"
        >
            <v-col>
                <h1 class="display-2 font-weight-bold mb-3">
                    DataProvider
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
                    @keyup.enter="openProvider(item.id)"
                    @click="openProvider(item.id)"
                    contained-text
                >
                </v-card>
                <add-provider-card
                    @save="addProviderAndNavigate"
                ></add-provider-card>
        </v-row>
    </v-container>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";

import AddProviderCard from "../components/AddProviderCard.vue";

export default defineComponent({
    name: "ProviderListView",
    computed: {
        ...mapState("provider", {
            items: "dataProviders"
        }),
        ...mapGetters("provider", [
            "latestProvider"
        ]),
    },
    methods: {
        ...mapActions("provider", [
            "setCurrentProvider",
            "addProvider",
        ]),
        addProviderAndNavigate (evt) {
            this.addProvider(evt);
            this.openProvider(this.latestProvider);
        },
        openProvider (id) {
            this.setCurrentProvider(id);
            this.$router.push(`/provider/${id}`);
        }
    },
    components: {
        AddProviderCard,
    }
});
</script>
