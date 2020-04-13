<template>
    <card color="blue" :title="article.latest_article_content.title" v-on:click="visit" :pinned="pinned">
        <div class="info">
            {{article.views}} {{$t("views")}} -
            {{$t("created")}}: {{article.published | moment("ll")}} -
            {{$t("edited")}}: {{article.mod_time | moment("ll")}}
        </div>
    </card>
</template>

<script>
import slugify from "slugify";
import card from "./card.vue";

export default {
    components: {card},
    props: ["article", "pinned"],
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
