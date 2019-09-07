<template>
    <card color="green" :title="list.name.name" v-on:click="visit">
        <div class="info">
            {{list.name.info}} -
            {{list.def_time | moment("ll")}} {{$t("created")}} -
            {{list.mod_time | moment("ll")}} {{$t("edited")}}
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
        "edited": "zuletzt bearbeitet",
        "created": "erstellt"
    }
}
</i18n>
