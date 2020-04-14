<template>
    <sts-card color="blue" :title="article.latest_article_content.title" v-on:click="visit">
        {{article.views}} {{$t("views")}} -
        {{$t("created")}}: {{article.published | moment("ll")}} -
        {{$t("edited")}}: {{article.mod_time | moment("ll")}}
    </sts-card>
</template>

<script>
    import stsCard from "./card.vue";
    import slugify from "slugify";

    export default {
        components: {stsCard},
        props: ["article"],
        methods: {
            visit(e) {
                let slug = slugify(`${this.article.latest_article_content.title}-${this.article.id}`);
                let url = `/read/${slug}`;

                if(e.button === 0) {
                    this.$router.push(url);
                }
                else if(e.button === 1) {
                    window.open(url, "_blank");
                }
            }
        }
    }
</script>

<i18n>
    {
        "de": {
            "views": "Aufrufe",
            "created": "Erstellt",
            "edited": "Zuletzt bearbeitet"
        }
    }
</i18n>
