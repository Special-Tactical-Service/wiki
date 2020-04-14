<template>
    <sts-card color="green" :title="list.name.name" v-on:click="visit">
        {{list.name.info}} -
        {{$t("created")}}: {{list.def_time | moment("ll")}} -
        {{$t("edited")}}: {{list.mod_time | moment("ll")}}
    </sts-card>
</template>

<script>
    import stsCard from "./card.vue";
    import slugify from "slugify";

    export default {
        components: {stsCard},
        props: ["list"],
        methods: {
            visit(e) {
                let slug = slugify(`${this.list.name.name}-${this.list.id}`);
                let url = `/list/${slug}`;

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
            "created": "Erstellt",
            "edited": "Zuletzt bearbeitet"
        }
    }
</i18n>
