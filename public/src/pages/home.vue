<template>
	<layout>
		<template slot="left">
			<!--<h2>{{$t("title_filter")}}</h2>
			TODO-->
			<h2>{{$t("title_tags")}}</h2>
			<tag v-for="tag in tags" :key="tag.id" :tag="tag"></tag>
		</template>
		<template>
			<h1>{{$t("title_articles")}}</h1>
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
			articlesOffset: 0,
			tagsOffset: 0,
			articles: [],
			tags: []
		};
	},
	mounted() {
		this.loadArticles();
		this.loadTags();
	},
	methods: {
		loadArticles() {
			this.emvi.findArticles(null, {offset: this.articlesOffset})
			.then(results => {
				this.articles = this.articles.concat(results.articles);
				this.articlesOffset += results.articles.length;

				if(results.articles.length > 0) {
					this.loadArticles();
				}
			});
		},
		loadTags() {
			this.emvi.findTags(null, {offset: this.tagsOffset})
			.then(results => {
				this.tags = this.tags.concat(results.tags);
				this.tagsOffset += results.tags.length;

				if(results.tags.length > 0) {
					this.loadTags();
				}
			});
		}
	}
}
</script>

<i18n>
{
	"de": {
		"title_articles": "Artikel",
		"title_filter": "Filter",
		"title_tags": "Tags"
	}
}
</i18n>
