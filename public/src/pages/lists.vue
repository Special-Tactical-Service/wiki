<template>
    <layout>
        <template slot="left">
            <!--<h2>{{$t("title_filter")}}</h2>
			TODO-->
			<h2>{{$t("title_tags")}}</h2>
			<tag v-for="tag in tags" :key="tag.id" :tag="tag"></tag>
        </template>
        <template>
            <h1 class="no-select">{{$t("title_lists")}}</h1>
            <listcard v-for="list in lists" :key="list.id" :list="list"></listcard>
        </template>
    </layout>
</template>

<script>
import layout from "../components/layout.vue";
import listcard from "../components/list-card.vue";
import tag from "../components/tag.vue";

export default {
    components: {
        layout,
        listcard,
        tag
    },
    data() {
        return {
            tagsOffset: 0,
            tags: [],
            offset: 0,
            lists: []
        };
    },
    mounted() {
        this.loadTags();
        this.loadLists();
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
        loadLists() {
            this.emvi.findLists(null, {offset: this.offset})
            .then(results => {
                this.lists = this.lists.concat(results.lists);
                this.offset += results.lists.length;

                if(results.lists.length > 0) {
                    this.loadLists();
                }
            });
        }
    }
}
</script>

<i18n>
{
    "de": {
        "title_tags": "Tags",
        "title_lists": "Listen",
        "title_filter": "Filter"
    }
}
</i18n>
