<template>
    <layout>
        <template slot="left">
            <!--<h2>{{$t("title_filter")}}</h2>
			TODO-->
        </template>
        <template>
            <h1>{{$t("title_lists")}}</h1>
            <listcard v-for="list in lists" :key="list.id" :list="list"></listcard>
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
            offset: 0,
            lists: []
        };
    },
    mounted() {
        this.loadLists();
    },
    methods: {
        loadLists() {
            this.emvi.findLists(null, {offset: this.offset})
            .then(results => {
                this.lists = this.lists.concat(results.lists);
                this.offset += results.lists.length;

                if(results.lists.length > 0) {
                    this.loadLists();
                }
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
