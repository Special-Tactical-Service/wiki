<template>
    <sts-layout>
        <template>
            <h1>{{tag.name}}</h1>
            <sts-article-card v-for="article in articles" :key="article.id" :article="article"></sts-article-card>
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
    import {stsLayout, stsTag, stsArticleCard} from "../components";

    export default {
        components: {stsLayout, stsTag, stsArticleCard},
        data() {
            return {
                tag: {},
                articlesOffset: 0,
                articles: []
            };
        },
        computed: {
            ...mapGetters(["tags"])
        },
        watch: {
            "$route.params.name": function(value) {
                this.articlesOffset = 0;
                this.articles = [];
                this.loadTag(value);
            }
        },
        mounted() {
            this.loadTag(this.$route.params.name);
        },
        methods: {
            loadTag(name) {
                this.emvi.getTag(name)
                    .then(tag => {
                        this.tag = tag;
                        this.loadArticles(tag.id);
                    });
            },
            loadArticles(id) {
                this.emvi.findArticles(null, {tag_ids: id, offset: this.articlesOffset, sort_title: "asc"})
                    .then(results => {
                        this.articles = this.articles.concat(results.articles);
                        this.articlesOffset = results.articles.length;

                        if(results.articles.length > 0) {
                            this.loadArticles(id);
                        }
                    });
            }
        }
    }
</script>
