<template>
    <div>
        <mainmenu></mainmenu>
        <div class="main">
            <slot></slot>
        </div>
        <div class="end">
            &copy; 2019 Special Tactical Service | <a href="" target="_blank">{{$t("link_imprint")}}</a> | <a href="" target="_blank">{{$t("link_privacy")}}</a> | <a href="https://emvi.com/" target="_blank">{{$t("link_powered_by")}}</a>
        </div>
    </div>
</template>

<script>
import mainmenu from "../components/menu.vue";

export default {
    components: {mainmenu}
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
