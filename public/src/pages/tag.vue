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
            this.emvi.findArticles(null, {tags: name})
            .then(results => {
                this.articles = results.results;
            });
        }
    }
}
</script>
