<template>
    <sts-layout>
        <template>
            <h1>{{list.name.name}}</h1>
            <sts-article-card v-for="article in entries" :key="article.id" :article="article"></sts-article-card>
        </template>
        <template slot="right">
            <div class="tags">
                <sts-tag v-for="tag in tags" :key="tag.id" :tag="tag"></sts-tag>
            </div>
        </template>
    </sts-layout>
</template>

<script>
    import {mapGetters} from "vuex";
    import {idFromSlug} from "../util/slug";
    import {stsLayout, stsTag, stsArticleCard} from "../components";

    export default {
        components: {stsLayout, stsTag, stsArticleCard},
        data() {
            return {
                list: {name: {}, def_time: new Date(), mod_time: new Date()},
                entriesOffset: 0,
                entries: []
            };
        },
        computed: {
            ...mapGetters(["tags"])
        },
        watch: {
            "$route.params.id": function(value) {
                let id = idFromSlug(value);
                this.entriesOffset = 0;
                this.entries = [];
                this.loadList(id);
                this.loadEntries(id);
            }
        },
        mounted() {
            let id = idFromSlug(this.$route.params.id);
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
