<template>
    <div class="footer">
        <span>&copy; 2020 skalar marketing</span>
        <a href="https://skalar.marketing/impressum" target="_blank">{{$t("link_imprint")}}</a>
        <a href="https://skalar.marketing/datenschutz" target="_blank">{{$t("link_privacy")}}</a>
        <a href="https://emvi.com/" target="_blank">{{$t("link_powered_by")}}</a>
    </div>
</template>

<script>
    export default {

    }
</script>

<i18n>
    {
        "de": {
            "link_imprint": "Impressum",
            "link_privacy": "Datenschutzerklärung",
            "link_powered_by": "powered by Emvi"
        }
    }
</i18n>
