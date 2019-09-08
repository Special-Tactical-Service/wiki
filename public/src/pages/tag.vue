<template>
    <layout>
        <template slot="left">
			<h2>{{$t("title_tags")}}</h2>
			<tag v-for="tag in tags" :key="tag.id" :tag="tag"></tag>
		</template>
        <template>
            <h1>{{tag.name}}</h1>
            <articlecard v-for="article in articles" :key="article.id" :article="article"></articlecard>
        </template>
    </layout>
</template>

<script>
import layout from "../components/layout.vue";
import articlecard from "../components/article-card.vue";
import tag from "../components/tag.vue";

export default {
    components: {
        layout,
        articlecard,
        tag
    },
    data() {
        return {
            tag: {},
            tagsOffset: 0,
            tags: [],
            articlesOffset: 0,
            articles: []
        };
    },
    watch: {
        "$route.params.name": function(value) {
            this.articlesOffset = 0;
            this.articles = [];
            this.loadTag(value);
            this.loadArticles(value);
        }
    },
    mounted() {
        let name = this.$route.params.name;
        this.loadTag(name);
        this.loadTags();
        this.loadArticles(name);
    },
    methods: {
        loadTags() {
			this.emvi.findTags(null, {offset: this.tagsOffset})
			.then(results => {
				this.tags = this.tags.concat(results.tags);
				this.tagsOffset += results.tags.length;

				if(results.tags.length > 0) {
					this.loadTags();
				}
			});
		},
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

<i18n>
{
	"de": {
		"title_tags": "Tags"
	}
}
</i18n>