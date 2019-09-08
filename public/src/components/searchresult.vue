<template>
    <div v-bind:class="{result: true, selected}" v-on:click="visit">
        <template v-if="result.isArticle">
            <strong class="color-blue">{{result.latest_article_content.title}}</strong>
            <div class="info">
                {{result.views}} {{$t("views")}} -
                {{result.published | moment("ll")}} {{$t("published")}} -
                {{result.mod_time | moment("ll")}} {{$t("edited")}}
            </div>
        </template>
        <template v-if="result.isList">
            <strong class="color-green">{{result.name.name}}</strong>
            <div class="info">
                {{result.name.info}} -
                {{result.def_time | moment("ll")}} {{$t("created")}} -
                {{result.mod_time | moment("ll")}} {{$t("edited")}}
            </div>
        </template>
        <template v-if="result.isTag">
            <strong class="color-orange">{{result.name}}</strong>
        </template>
    </div>
</template>

<script>
export default {
    props: ["result", "selected"],
    methods: {
        visit() {
            if(this.result.isArticle) {
                this.$router.push(`/read/${this.result.id}`);
            }
            else if(this.result.isList) {
                this.$router.push(`/list/${this.result.id}`);
            }
            else {
                this.$router.push(`/tag/${this.result.name}`);
            }

            this.$emit("close");
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
