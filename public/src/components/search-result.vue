<template>
    <div v-bind:class="{result: true, active}" v-on:mouseup="open">
        <template v-if="result.isArticle">
            <strong class="color-blue">{{result.latest_article_content.title}}</strong>
            <div class="info">
                {{result.views}} {{$t("views")}} -
                {{$t("created")}}: {{result.published | moment("ll")}} -
                {{$t("edited")}}: {{result.mod_time | moment("ll")}}
            </div>
        </template>
        <template v-if="result.isList">
            <strong class="color-green">{{result.name.name}}</strong>
            <div class="info">
                {{result.name.info}} -
                {{$t("created")}}: {{result.def_time | moment("ll")}} -
                {{$t("edited")}}: {{result.mod_time | moment("ll")}}
            </div>
        </template>
        <template v-if="result.isTag">
            <strong class="color-orange">{{result.name}}</strong>
        </template>
    </div>
</template>

<script>
    export default {
        props: ["result", "active"],
        methods: {
            open(e) {
                this.$emit('open', {e, result: this.result});
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
