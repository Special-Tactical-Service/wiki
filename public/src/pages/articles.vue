<template>
    <sts-layout>
        <template>
            <h1>{{$t("title")}}</h1>
            <sts-article-card v-for="article in articles" :key="article.id" :article="article"></sts-article-card>
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

    export default {
        components: {stsLayout, stsTag, stsArticleCard},
        computed: {
            ...mapGetters(["tags", "articles"])
        }
    }
</script>

<i18n>
    {
        "de": {
            "title": "Artikel"
        }
    }
</i18n>
