<template>
    <card color="green" :title="list.name.name" v-on:click="visit" :pinned="pinned">
        <div class="info">
            {{list.name.info}} -
            {{$t("created")}}: {{list.def_time | moment("ll")}} -
            {{$t("edited")}}: {{list.mod_time | moment("ll")}}
        </div>
    </card>
</template>

<script>
import slugify from "slugify";
import card from "./card.vue";

export default {
    components: {card},
    props: ["list", "pinned"],
    methods: {
        visit() {
            let slug = slugify(`${this.list.name.name}-${this.list.id}`);
            this.$router.push(`/list/${slug}`);
        }
    }
}
</script>

<i18n>
{
    "de": {
        "created": "Erstellt",
        "edited": "Zuletzt bearbeitet"
    }
}
</i18n>
