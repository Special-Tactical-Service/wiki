<template>
    <div v-bind:class="{result: true, selected}" v-on:mouseup="visit">
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
import slugify from "slugify";

export default {
    props: ["result", "selected"],
    methods: {
        visit(e) {
            let url = "";

            if(this.result.isArticle) {
                url = `/read/${slugify(`${this.result.latest_article_content.title}-${this.result.id}`)}`;
            }
            else if(this.result.isList) {
                url = `/list/${slugify(`${this.result.name.name}-${this.result.id}`)}`;
            }
            else {
                url = `/tag/${this.result.name}`;
            }

            if(e.button === 0) {
                this.$router.push(url);
                this.$emit("close");
            }
            else {
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
