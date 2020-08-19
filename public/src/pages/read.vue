<template>
    <sts-layout>
        <template>
            <div class="article">
                <div class="article-title">
                    <h1>{{title}}</h1>
                    <a :href="'https://skalar.emvi.com/read/'+this.$route.params.id" target="_blank">{{$t("view_on_emvi")}}</a>
                </div>
                <div class="article-info">
                    {{views}} {{$t("views")}} -
                    {{$t("created")}}: {{published | moment("ll")}} -
                    {{$t("edited")}}: {{updated | moment("ll")}}
                </div>
                <div class="article-tags">
                    <sts-tag v-for="tag in tags" :key="tag.id" :tag="tag"></sts-tag>
                </div>
                <div class="article-content" v-html="content" ref="content"></div>
            </div>
        </template>
        <template slot="right">
            <div class="toc">
                <div class="headline">{{$t("title_toc")}}</div>
                <div class="toc-l1" v-for="title in toc" :key="title.id">
                    <div class="title" v-on:click="scrollTo(title)">{{title.text}}</div>
                    <div class="toc-l2" v-for="child in title.children" :key="child.id">
                        <div class="title" v-on:click="scrollTo(child)">{{child.text}}</div>
                        <div class="toc-l3" v-for="c in child.children" :key="c.id">
                            <div class="title" v-on:click="scrollTo(c)">{{c.text}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </sts-layout>
</template>

<script>
    import {buildTableOfContents} from "../util/toc.js";
    import {addDirectLinks} from "../util/directlink.js";
    import {idFromSlug} from "../util/slug.js";
    import {stsLayout, stsTag} from "../components";
    import {copyToClipboard} from "../util/directlink";

    const scrollDistance = 60;

    export default {
        components: {stsLayout, stsTag},
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
            },
            "$route.hash": function() {
                this.scrollToAnchor();
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

                    this.$nextTick(() => {
                        this.scrollToAnchor();
                        this.addCopyAnchor();
                    });
                })
                .catch(() => {
                    this.$router.push("/notfound");
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
                    let anchor = decodeURIComponent(this.$route.hash).substr(1).toLowerCase();
                    console.log(anchor);

                    if(this.scrollToAnchorHeadline(anchor, this.$refs.content.getElementsByTagName("h2"))) {
                        return;
                    }

                    if(this.scrollToAnchorHeadline(anchor, this.$refs.content.getElementsByTagName("h3"))) {
                        return;
                    }

                    this.scrollToAnchorHeadline(anchor, this.$refs.content.getElementsByTagName("h4"))
                }
            },
            scrollToAnchorHeadline(anchor, headlines) {
                for(let node of headlines) {
                    let headline = node.innerText.toLowerCase().substr(0, node.innerText.length-2);

                    if(headline === anchor) {
                        let top = node.getBoundingClientRect().top+window.scrollY-scrollDistance;
                        window.scrollTo({top, behavior: "smooth"});
                        return true;
                    }
                }

                return false;
            },
            addCopyAnchor() {
                let links = this.$refs.content.getElementsByClassName("clipboard-link");

                for(let link of links) {
                    link.addEventListener("click", () => {
                        let location = window.location.href.replace(/#.*$/, "");
                        let url = encodeURI(`${location}#${link.getAttribute("text")}`);
                        copyToClipboard(url);
                    });
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
            "view_on_emvi": "Diesen Artikel auf Emvi bearbeiten"
        }
    }
</i18n>
