<template>
    <card color="green" :title="list.name.name" v-on:click="visit">
        <div class="info">
            {{list.name.info}} -
            {{$t("created")}}: {{list.def_time | moment("ll")}} -
            {{$t("edited")}}: {{list.mod_time | moment("ll")}}
        </div>
    </card>
</template>

<script>
import card from "./card.vue";

export default {
    components: {card},
    props: ["list"],
    methods: {
        visit() {
            this.$router.push(`/list/${this.list.id}`);
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
