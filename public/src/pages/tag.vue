<template>
    <layout>
        <template>
            <h1>{{tag.name}}</h1>
            <articlecard v-for="article in articles" :key="article.id" :article="article"></articlecard>
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
            tag: {},
            articlesOffset: 0,
            articles: []
        };
    },
    mounted() {
        let name = this.$route.params.name;
        this.loadTag(name);
        this.loadArticles(name);
    },
    methods: {
        loadTag(name) {
            this.emvi.getTag(name)
            .then(tag => {
                this.tag = tag;
            });
        },
        loadArticles(name) {
            this.emvi.findArticles(null, {tags: name, offset: this.articlesOffset})
            .then(results => {
                this.articles = this.articles.concat(results.articles);
                this.articlesOffset = results.articles.length;

                if(results.articles.length > 0) {
                    this.loadArticles(name);
                }
            });
        }
    }
}
</script>
