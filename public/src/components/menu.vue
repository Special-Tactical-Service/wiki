<template>
	<div class="menu no-select">
		<router-link to="/" class="logo">
			<div class="icon"></div>
			<div class="title">[sTs] Wiki</div>
		</router-link>
		<div class="search">
			<div class="input">
				<i class="material-icons no-select">search</i>
				<input type="text" :placeholder="$t('placeholder_search')" v-model="query" v-on:focus="showResults = true" ref="queryfield" />
				<div class="results no-select" v-show="showResults && query.length > 2 && results.length > 0" ref="results">
					<searchresult v-for="result in results" :key="result.id" :result="result"></searchresult>
				</div>
			</div>
		</div>
		<div class="objects no-select">
			<router-link to="/" v-bind:class="{'object-label color-blue': true, inactive: activeObject !== '/'}" v-on:click="switchObject('articles')">{{$t("label_articles")}}</router-link>
			<router-link to="/lists" v-bind:class="{'object-label color-green': true, inactive: activeObject !== '/lists'}" v-on:click="switchObject('lists')">{{$t("label_lists")}}</router-link>
		</div>
		<colormode></colormode>
	</div>
</template>

<script>
import colormode from "./colormode.vue";
import searchresult from "./searchresult.vue";
import {debounce} from "../util/debounce";

export default {
	components: {colormode, searchresult},
	data() {
		return {
			showResults: false,
			query: "",
			results: []
		}
	},
	computed: {
		activeObject() {
			return this.$route.path;
		}
	},
	watch: {
		query(value) {
			if(value.length > 2) {
				this.search(value);
			}
		}
	},
	mounted() {
		this.searchFunc = debounce(query => {
			this.emvi.findAll(query)
			.then(results => {
				this.results = [];

				for (let i = 0; i < results.articles_count; i++) {
					results.articles[i].isArticle = true;
					this.results.push(results.articles[i]);
				}

				for (let i = 0; i < results.lists_count; i++) {
					results.lists[i].isList = true;
					this.results.push(results.lists[i]);
				}

				for (let i = 0; i < results.tags_count; i++) {
					results.tags[i].isTag = true;
					this.results.push(results.tags[i]);
				}
			});
		}, 300);

		window.addEventListener("mouseup", e => {
			let field = this.$refs.queryfield;
			let results = this.$refs.results;

			if(!results || (e.target !== field && e.target !== results && !results.contains(e.target))) {
				this.showResults = false;
			}
		});
	},
	methods: {
		search(query) {
			this.searchFunc(query);
		}
	}
}
</script>

<i18n>
{
	"de": {
		"placeholder_search": "Suchen...",
		"label_articles": "Artikel",
		"label_lists": "Listen",
		"label_tags": "Tags"
	}
}
</i18n>
