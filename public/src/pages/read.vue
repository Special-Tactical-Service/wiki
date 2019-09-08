<template>
    <layout>
        <template slot="left">
            <h2>{{$t("title_toc")}}</h2>
            <div class="toc-l1" v-for="title in toc" :key="title.id">
                <div class="title" v-on:click="scrollTo(title)">{{title.text}}</div>
                <div class="toc-l2" v-for="child in title.children" :key="child.id">
                    <div class="title" v-on:click="scrollTo(child)">{{child.text}}</div>
                </div>
            </div>
        </template>
        <template>
            <h1 class="article-title no-select">{{title}}</h1>
            <div class="article-info no-select">
                {{views}} {{$t("views")}} -
                {{$t("created")}}: {{published | moment("ll")}} -
                {{$t("edited")}}: {{updated | moment("ll")}}
            </div>
            <div class="article-tags no-select">
                <tag v-for="tag in tags" :key="tag.id" :tag="tag"></tag>
            </div>
            <div class="article-content" v-html="content" ref="content"></div>
        </template>
    </layout>
</template>

<script>
import layout from "../components/layout.vue";
import tag from "../components/tag.vue";
import {buildTableOfContents} from "../util/toc.js";

export default {
    components: {layout, tag},
    data() {
        return {
            title: "",
            views: 0,
            published: new Date(),
            updated: new Date(),
            tags: [],
            content: "",
            toc: {}
        };
    },
    watch: {
        "$route.params.id": function(value) {
            this.loadArticle(value);
        }
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
        },
        scrollTo(title) {
            let element = this.$refs.content.getElementsByTagName(title.tag)[title.number-1];
            let top = element.getBoundingClientRect().top+window.scrollY-140;
            window.scrollTo({top, behavior: "smooth"});
        }
    }
}
</script>

<i18n>
{
    "de": {
        "title_toc": "Inhalt",
        "views": "Aufrufe",
        "created": "Erstellt",
        "edited": "Zuletzt bearbeitet"
    }
}
</i18n>
