<template>
    <div>
        <mainmenu></mainmenu>
        <div v-bind:class="{main: true, centered}">
            <div class="content">
                <slot></slot>
            </div>
            <div class="content-right">
                <slot name="right"></slot>
            </div>
        </div>
        <div class="end">
            <span>&copy; 2019 Special Tactical Service</span>
            <span>Version 1.0.0</span>
            <a href="" target="_blank">{{$t("link_imprint")}}</a>
            <a href="" target="_blank">{{$t("link_privacy")}}</a>
            <a href="https://emvi.com/" target="_blank">{{$t("link_powered_by")}}</a>
        </div>
    </div>
</template>

<script>
import mainmenu from "../components/menu.vue";

export default {
    components: {mainmenu},
    props: ["centered"]
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
