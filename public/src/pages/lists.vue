<template>
    <layout>
        <template>
            <h1>{{$t("title_lists")}}</h1>
            <listcard v-for="list in lists" :key="list.id" :list="list"></listcard>
        </template>
        <template slot="right">
            <!--<h2>{{$t("title_filter")}}</h2>
			TODO-->
        </template>
    </layout>
</template>

<script>
import layout from "../components/layout.vue";
import listcard from "../components/list-card.vue";

export default {
    components: {layout, listcard},
    data() {
        return {
            lists: []
        };
    },
    mounted() {
        this.loadLists();
    },
    methods: {
        loadLists() {
            this.emvi.findLists()
            .then(results => {
                this.lists = results.results;
            });
        }
    }
}
</script>

<i18n>
{
    "de": {
        "title_lists": "Listen",
        "title_filter": "Filter"
    }
}
</i18n>
