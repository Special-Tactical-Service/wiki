<template>
    <sts-layout>
        <h1>{{$t("title")}}</h1>
        <p>{{$t("text")}}</p>
    </sts-layout>
</template>

<script>
    import {stsLayout} from "../components";

    export default {
        components: {stsLayout}
    }
</script>

<i18n>
    {
        "de": {
            "title": "Nicht gefunden",
            "text": "Die Seite die du angefordert hast wurde nicht gefunden."
        }
    }
</i18n>
