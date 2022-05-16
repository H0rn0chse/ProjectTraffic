<template>
    <v-container>
        <v-col>
            <v-row
                align="center"
                class="mb-2"
            >
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
                    {{currentProject.name}}
                </h1>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
    name: "ProjectView",
    computed: {
        ...mapGetters(["currentProject"])
    },
    methods: {
        navBack () {
            this.$router.push("/projects");
        }
    }
});
</script>
