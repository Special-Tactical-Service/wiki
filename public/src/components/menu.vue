<template>
	<div class="menu no-select">
		<router-link to="/" class="logo">
			<div class="icon"></div>
			<div class="title">[sTs] Wiki</div>
		</router-link>
		<div class="search">
			<div class="input">
				<i class="material-icons no-select">search</i>
				<input type="text" :placeholder="$t('placeholder_search')" v-model="searchquery" v-on:focus="focus" ref="queryfield" v-on:keydown="keydown" />
				<div class="results" v-show="showResults && searchquery.length > 2 && results.length > 0" ref="results">
					<searchresult v-for="(result, index) in results"
						:key="result.id"
						:result="result"
						:selected="index === selected"
						v-on:close="showResults = false"></searchresult>
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
			searchquery: "",
			results: [],
			selected: 0
		}
	},
	computed: {
		activeObject() {
			return this.$route.path;
		}
	},
	watch: {
		searchquery(value) {
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
				this.selected = 0;

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

		this.mouseupHandler = e => {
			let field = this.$refs.queryfield;
			let results = this.$refs.results;

			if(!results || (e.target !== field && e.target !== results && !results.contains(e.target))) {
				this.showResults = false;
			}
		};
		window.addEventListener("mouseup", this.mouseupHandler);
	},
	beforeDestroy() {
		window.removeEventListener("mouseup", this.mouseupHandler);
	},
	methods: {
		search(query) {
			this.searchFunc(query);
		},
		focus() {
			this.selected = 0;
			this.showResults = true;
		},
		keydown(e) {
			if(e.keyCode === 38) { // up
				e.preventDefault();
				this.selected--;

				if(this.selected < 0) {
					this.selected = this.results.length-1;
				}
			}
			else if(e.keyCode === 40) { // down
				e.preventDefault();
				this.selected++;

				if(this.selected > this.results.length-1) {
					this.selected = 0;
				}
			}
			else if(e.keyCode === 13) { // enter
				e.preventDefault();
				this.open();
			}
		},
		open() {
			let result = this.results[this.selected];

            if(result.isArticle) {
                this.$router.push(`/read/${result.id}`);
            }
            else if(result.isList) {
                this.$router.push(`/list/${result.id}`);
            }
            else {
                this.$router.push(`/tag/${result.name}`);
            }

            this.showResults = false;
            this.$refs.queryfield.blur();
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
