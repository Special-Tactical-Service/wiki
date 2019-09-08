<template>
    <layout>
        <template>
            <h1 class="no-select">{{list.name.name}}</h1>
            <div class="article-info no-select">
                {{list.name.info}} -
                {{$t("created")}}: {{list.def_time | moment("ll")}} -
                {{$t("edited")}}: {{list.mod_time | moment("ll")}}
            </div>
            <articlecard v-for="article in entries" :key="article.id" :article="article"></articlecard>
        </template>
    </layout>
</template>

<script>
import layout from "../components/layout.vue";
import articlecard from "../components/article-card.vue";

export default {
    components: {layout, articlecard},
    data() {
        return {
            list: {name: {}, def_time: new Date(), mod_time: new Date()},
            entriesOffset: 0,
            entries: []
        };
    },
    watch: {
        "$route.params.id": function(value) {
            this.entriesOffset = 0;
            this.entries = [];
            this.loadList(value);
            this.loadEntries(value);
        }
    },
    mounted() {
        let id = this.$route.params.id;
        this.loadList(id);
        this.loadEntries(id);
    },
    methods: {
        loadList(id) {
            this.emvi.getList(id)
            .then(list => {
                this.list = list.list;
            });
        },
        loadEntries(id) {
            this.emvi.getListEntries(id, null, {offset: this.entriesOffset})
            .then(results => {
                this.entries = this.entries.concat(results.entries);
                this.entriesOffset += results.entries.length;

                if(results.entries.length > 0) {
                    this.loadEntries(id);
                }
            });
        }
    }
}
</script>

<i18n>
{
    "de": {
        "created": "Erstellt",
        "edited": "Zuletzt bearbeitet"
    }
}
</i18n>
