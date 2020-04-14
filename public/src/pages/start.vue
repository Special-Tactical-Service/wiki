<template>
    <sts-layout>
        <template>
            <div class="article">
                <div class="article-title">
                    <h1>{{welcomeArticle.title}}</h1>
                    <a :href="'https://sts.emvi.com/read/'+welcomeArticle.id" target="_blank">{{$t("view_on_emvi")}}</a>
                </div>
                <div class="article-info">
                    {{welcomeArticle.views}} {{$t("views")}} -
                    {{$t("created")}}: {{welcomeArticle.published | moment("ll")}} -
                    {{$t("edited")}}: {{welcomeArticle.updated | moment("ll")}}
                </div>
                <div class="article-tags">
                    <sts-tag v-for="tag in welcomeArticle.tags" :key="tag.id" :tag="tag"></sts-tag>
                </div>
                <div class="article-content" v-html="welcomeArticle.content" ref="content"></div>
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

    export default {
        components: {stsLayout, stsTag, stsArticleCard},
        computed: {
            ...mapGetters(["tags", "pinned", "welcomeArticle"])
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
