<template>
    <layout centered="true">
        <template>
            <h1 class="article-title">{{title}}</h1>
            <div class="article-info">
                {{views}} {{$t("views")}} -
                {{published | moment("ll")}} {{$t("published")}} -
                {{updated | moment("ll")}} {{$t("edited")}}
            </div>
            <div class="article-tags">
                <span class="label orange" v-for="tag in tags" :key="tag.id">{{tag.name}}</span>
            </div>
            <div class="article-content" v-html="content"></div>
        </template>
    </layout>
</template>

<script>
import layout from "../components/layout.vue";
import {buildTableOfContents} from "../util/toc.js";

export default {
    components: {layout},
    data() {
        return {
            title: "",
            views: 0,
            published: new Date(),
            updated: new Date(),
            tags: [],
            content: ""
        };
    },
    mounted() {
        let id = this.$route.params.id;
        this.loadArticle(id);
    },
    methods: {
        loadArticle(id) {
            this.emvi.getArticle(id)
            .then(result => {
                this.title = result.content.title;
                this.views = result.article.views;
                this.published = result.article.published;
                this.updated = result.article.mod_time;
                this.tags = result.article.tags;
                this.content = result.content.content;
                this.buildToc();
            });
        },
        buildToc() {
            let contentDOM = document.createElement("div");
            contentDOM.innerHTML = this.content;
            this.toc = buildTableOfContents(contentDOM);
        }
    }
}
</script>

<i18n>
{
    "de": {
        "views": "Aufrufe",
        "published": "veröffentlicht",
        "edited": "zuletzt bearbeitet"
    }
}
</i18n>
