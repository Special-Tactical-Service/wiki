<template>
    <div class="search" ref="search">
        <input type="text"
               :placeholder="$t('placeholder')"
               autocomplete="off"
               ref="input"
               :value="query"
               v-on:input="e => query = e.target.value"
               v-on:focus="showResults = true"
               v-on:keydown.up.stop.prevent="previousResult"
               v-on:keydown.down.stop.prevent="nextResult"
               v-on:keyup.enter="openResult" />
        <div class="search-results" v-show="results && showResults">
            <sts-search-result v-for="(result, index) in results"
                :key="result.id"
                :result="result"
                :active="index === selected"
                v-on:open="openResult"></sts-search-result>
        </div>
    </div>
</template>

<script>
    import {debounce} from "../util/debounce";
    import stsSearchResult from "./search-result.vue";
    import slugify from "slugify";

    export default {
        components: {stsSearchResult},
        data() {
            return {
                query: this.$store.state.search.query,
                results: this.$store.state.search.results,
                showResults: false,
                selected: -1
            };
        },
        watch: {
            query() {
                this.$store.commit("setQuery", this.query);
                this.search();
            }
        },
        mounted() {
            this.searchDebounced = debounce(() => {
                this.emvi.findAll(this.query)
                    .then(results => {
                        let newResults = [];

                        for (let i = 0; i < results.articles.length; i++) {
                            results.articles[i].isArticle = true;
                            newResults.push(results.articles[i]);
                        }

                        for (let i = 0; i < results.lists.length; i++) {
                            results.lists[i].isList = true;
                            newResults.push(results.lists[i]);
                        }

                        for (let i = 0; i < results.tags.length; i++) {
                            results.tags[i].isTag = true;
                            newResults.push(results.tags[i]);
                        }

                        this.$store.commit("setResults", newResults);
                        this.results = newResults;

                        if(this.selected > -1) {
                            this.selected = 0;
                        }
                    });
            }, 300);

            this.mouseupHandler = e => {
                if(e.target !== this.$refs.search && !this.$refs.search.contains(e.target)) {
                    this.showResults = false;
                }
            };
            window.addEventListener("mouseup", this.mouseupHandler);
        },
        beforeDestroy() {
            window.removeEventListener("mouseup", this.mouseupHandler);
        },
        methods: {
            search() {
                this.searchDebounced();
            },
            previousResult() {
                this.selected--;

                if(this.selected < 0) {
                    this.selected = this.results.length-1;
                }
            },
            nextResult() {
                this.selected++;

                if(this.selected > this.results.length-1) {
                    this.selected = 0;
                }
            },
            openResult({e, result}) {
                if(!this.results.length || !result && this.selected < 0) {
                    return;
                }

                if(!result) {
                    result = this.results[this.selected];
                }

                let url = "";

                if(result.isArticle) {
                    url = `/read/${slugify(`${result.latest_article_content.title}-${result.id}`)}`;
                }
                else if(result.isList) {
                    url = `/list/${slugify(`${result.name.name}-${result.id}`)}`;
                }
                else {
                    url = `/tag/${result.name}`;
                }

                if((!e || e.button === 0) && this.$route.path !== url) {
                    this.$router.push(url);
                    this.$refs.input.blur();
                    this.showResults = false;
                    this.selected = -1;
                }
                else if(e && e.button === 1) {
                    window.open(url, "_blank");
                }
            }
        }
    }
</script>

<i18n>
    {
        "de": {
            "placeholder": "Suche"
        }
    }
</i18n>
