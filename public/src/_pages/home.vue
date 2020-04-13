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
			<articlecard v-for="article in pinned" :key="article.id" :article="article" pinned="true"></articlecard>
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
			pinned: [],
			articles: [],
			tags: []
		};
	},
	mounted() {
		this.loadArticles();
		this.loadTags();
	},
	methods: {
		loadPinned() {
			this.emvi.getPinned(true, false)
			.then(results => {
				for(let i = 0; i < results.articles.length; i++) {
					for (let j = 0; j < this.articles.length; j++) {
						if (this.articles[j].id === results.articles[i].id) {
							this.pinned.push(this.articles[j]);
							this.articles.splice(j, 1);
							break;
						}
					}
				}
			});
		},
		loadArticles() {
			this.emvi.findArticles(null, {offset: this.articlesOffset, sort_title: "asc"})
			.then(results => {
				this.articles = this.articles.concat(results.articles);
				this.articlesOffset += results.articles.length;

				if(results.articles.length > 0) {
					this.loadArticles();
				}
				else {
					this.loadPinned();
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
