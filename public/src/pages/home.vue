<template>
	<layout>
		<template>
			<h1>{{$t("title_articles")}}</h1>
			<articlecard v-for="article in articles" :key="article.id" :article="article"></articlecard>
		</template>
		<template slot="right">
			<!--<h2>{{$t("title_filter")}}</h2>
			TODO-->
			<h2>{{$t("title_tags")}}</h2>
			<tag v-for="tag in tags" :key="tag.id" :tag="tag"></tag>
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
			this.emvi.findArticles("")
			.then(results => {
				this.articles = results.results;
			});
		},
		loadTags() {
			this.emvi.findTags("")
			.then(results => {
				this.tags = results.results;
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
