<template>
	<div class="menu">
		<router-link to="/" class="logo"></router-link>
		<div class="search">
			<div class="input">
				<i class="material-icons">search</i>
				<input type="text" :placeholder="$t('placeholder_search')" v-model="query" v-on:focus="showResults = true" v-on:blur="showResults = false" />
				<div class="results" v-show="showResults && query.length > 2">
					<div class="result">Test A</div>
					<div class="result">Test B</div>
				</div>
			</div>
			<div class="objects">
				<router-link to="/" v-bind:class="{'object-label blue': true, inactive: activeObject !== '/'}" v-on:click="switchObject('articles')">{{$t("label_articles")}}</router-link>
				<router-link to="/lists" v-bind:class="{'object-label green': true, inactive: activeObject !== '/lists'}" v-on:click="switchObject('lists')">{{$t("label_lists")}}</router-link>
				<router-link to="/tags" v-bind:class="{'object-label orange': true, inactive: activeObject !== '/tags'}" v-on:click="switchObject('tags')">{{$t("label_tags")}}</router-link>
			</div>
		</div>
		<colormode></colormode>
	</div>
</template>

<script>
import colormode from "./colormode.vue";

export default {
	components: {colormode},
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
	methods: {
		search(query) {
			console.log(query);
		}
	}
}
</script>

<i18n>
{
	"de": {
		"placeholder_search": "Suche...",
		"label_articles": "Artikel",
		"label_lists": "Listen",
		"label_tags": "Tags"
	}
}
</i18n>
