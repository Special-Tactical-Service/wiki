<template>
    <card color="blue" :title="article.latest_article_content.title" v-on:click="visit">
        <div class="info">
            {{article.views}} {{$t("views")}} -
            {{article.published | moment("ll")}} {{$t("published")}} -
            {{article.mod_time | moment("ll")}} {{$t("edited")}}
        </div>
    </card>
</template>

<script>
import card from "./card.vue";

export default {
    components: {card},
    props: ["article"],
    methods: {
        visit() {
            this.$router.push(`/read/${this.article.id}`);
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
