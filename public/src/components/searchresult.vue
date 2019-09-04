<template>
    <div class="result" v-on:click="open">
        <span v-if="result.isArticle">
            <strong class="font-blue">{{result.latest_article_content.title}}</strong>
            <br />
            {{result.views}} {{$t("views")}} -
            {{result.published | moment("ll")}} {{$t("published")}} -
            {{result.mod_time | moment("ll")}} {{$t("edited")}}
        </span>
        <span v-if="result.isList">
            <strong class="font-green">{{result.name.name}}</strong>
            <br />
            {{result.name.info}} -
            {{result.def_time | moment("ll")}} {{$t("created")}} -
            {{result.mod_time | moment("ll")}} {{$t("edited")}}
        </span>
        <span v-if="result.isTag">
            <strong class="font-orange">{{result.name}}</strong>
        </span>
    </div>
</template>

<script>
export default {
    props: ["result"],
    methods: {
        open() {
            console.log("ok");

            if(this.result.isArticle) {
                this.$router.push(`/read/${this.result.id}`);
            }
            else if(this.result.isList) {
                this.$router.push(`/list/${this.result.id}`);
            }
            else {
                this.$router.push(`/tag/${this.result.id}`);
            }
        }
    }
}
</script>

<i18n>
{
    "de": {
        "views": "Aufrufe",
        "published": "veröffentlicht",
        "edited": "zuletzt bearbeitet",
        "created": "erstellt"
    }
}
</i18n>
