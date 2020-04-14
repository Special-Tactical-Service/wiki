<template>
    <sts-layout>
        <template>
            <div class="article">
                <div class="article-title">
                    <h1>{{title}}</h1>
                    <a :href="'https://sts.emvi.com/read/'+id" target="_blank">{{$t("view_on_emvi")}}</a>
                </div>
                <div class="article-info">
                    {{views}} {{$t("views")}} -
                    {{$t("created")}}: {{published | moment("ll")}} -
                    {{$t("edited")}}: {{updated | moment("ll")}}
                </div>
                <div class="article-tags">
                    <sts-tag v-for="tag in articleTags" :key="tag.id" :tag="tag"></sts-tag>
                </div>
                <div class="article-content" v-html="content" ref="content"></div>
            </div>
            <sts-article-card v-for="article in pinned" :key="article.id" :article="article"></sts-article-card>
        </template>
        <template slot="right">
            <div class="tags">
                <sts-tag v-for="tag in tags" :key="tag.id" :tag="tag"></sts-tag>
            </div>
        </template>
    </sts-layout>
</template>

<script>
    import {mapGetters} from "vuex";
    import {stsLayout, stsTag, stsArticleCard} from "../components";
    import {addDirectLinks} from "../util/directlink";

    const welcomeArticleId = "0D3aPP0alx";

    export default {
        components: {stsLayout, stsTag, stsArticleCard},
        data() {
            return {
                id: welcomeArticleId,
                title: "",
                views: 0,
                published: new Date(),
                updated: new Date(),
                articleTags: [],
                content: "",
                pinned: []
            };
        },
        computed: {
            ...mapGetters(["tags"])
        },
        mounted() {
            this.loadWelcomeArticle();
            this.loadPinned();
        },
        methods: {
            loadWelcomeArticle() {
                this.emvi.getArticle(welcomeArticleId)
                    .then(result => {
                        this.title = result.content.title;
                        this.views = result.article.views;
                        this.published = result.article.published;
                        this.updated = result.article.mod_time;
                        this.articleTags = result.article.tags;
                        this.content = addDirectLinks(result.content.content);
                    });
            },
            loadPinned() {
                this.emvi.getPinned(true, false)
                    .then(results => {
                        this.pinned = results.articles;
                    });
            }
        }
    }
</script>

<i18n>
    {
        "de": {
            "views": "Aufrufe",
            "created": "Erstellt",
            "edited": "Zuletzt bearbeitet",
            "view_on_emvi": "Diesen Artikel auf Emvi bearbeiten"
        }
    }
</i18n>
