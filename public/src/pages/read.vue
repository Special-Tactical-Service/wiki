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
            <div class="article-title no-select">
                <h1>{{title}}</h1>
                <a :href="'https://sts.emvi-integration.com/read/'+this.$route.params.id" class="button">{{$t("view_on_emvi")}}</a>
            </div>
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
import {addDirectLinks} from "../util/directlink.js";
import {idFromSlug} from "../util/slug.js";

const scrollDistance = 120;

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
            let id = idFromSlug(value);
            this.loadArticle(id);
        }
    },
    mounted() {
        let id = idFromSlug(this.$route.params.id);
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
                this.content = addDirectLinks(result.content.content);
                this.buildToc();
                this.scrollToAnchor();
            });
        },
        buildToc() {
            let contentDOM = document.createElement("div");
            contentDOM.innerHTML = this.content;
            this.toc = buildTableOfContents(contentDOM);
        },
        scrollTo(title) {
            let element = this.$refs.content.getElementsByTagName(title.tag)[title.number-1];
            let top = element.getBoundingClientRect().top+window.scrollY-scrollDistance;
            window.scrollTo({top, behavior: "smooth"});
        },
        scrollToAnchor() {
            if(this.$route.hash) {
                setTimeout(() => {
                    let anchor = this.$route.hash.replace("%20", " ").substr(1).toLowerCase();
                    let headlinesH2 = this.$refs.content.getElementsByTagName("h2");
                    let headlinesH3 = this.$refs.content.getElementsByTagName("h3");

                    for(let node of headlinesH2) {
                        if(node.innerText.toLowerCase() === anchor) {
                            let top = node.getBoundingClientRect().top+window.scrollY-scrollDistance;
                            window.scrollTo({top, behavior: "smooth"});
                            return;
                        }
                    }

                    for(let node of headlinesH3) {
                        if(node.innerText.toLowerCase() === anchor) {
                            let top = node.getBoundingClientRect().top+window.scrollY-scrollDistance;
                            window.scrollTo({top, behavior: "smooth"});
                            return;
                        }
                    }
                }, 500);
            }
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
        "edited": "Zuletzt bearbeitet",
        "view_on_emvi": "Zu Emvi"
    }
}
</i18n>
