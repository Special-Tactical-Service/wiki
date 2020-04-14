<template>
    <sts-layout>
        <template>
            <h1>{{$t("title")}}</h1>
            <sts-list-card v-for="list in lists" :key="list.id" :list="list"></sts-list-card>
        </template>
        <template slot="right">
            <div class="tags">
                <sts-tag v-for="tag in tags" :key="tag.id" :tag="tag"></sts-tag>
            </div>
        </template>
    </sts-layout>
</template>

<script>
    import {stsListCard, stsLayout, stsTag} from "../components";
    import {mapGetters} from "vuex";

    export default {
        components: {stsLayout, stsTag, stsListCard},
        data() {
            return {
                offset: 0,
                lists: []
            };
        },
        computed: {
            ...mapGetters(["tags"])
        },
        mounted() {
            this.loadLists();
        },
        methods: {
            loadLists() {
                this.emvi.findLists(null, {offset: this.offset, sort_name: "asc"})
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
            "title": "Listen"
        }
    }
</i18n>
