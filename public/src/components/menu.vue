<template>
    <div class="menu">
        <div class="menu-wrapper">
            <router-link to="/" class="logo">
                <div class="logo-icon"></div>
                <div class="logo-text">{{$t("logo_text")}}</div>
            </router-link>
            <div class="menu-wrapper-links">
                <router-link to="/articles">{{$t("link_articles")}}</router-link>
                <router-link to="/lists">{{$t("link_lists")}}</router-link>
                <a href="https://skalar.marketing/" target="_blank">{{$t("link_website")}}</a>
            </div>
            <sts-search></sts-search>
        </div>
    </div>
</template>

<script>
    import stsSearch from "./search.vue";

    export default {
        components: {stsSearch}
    }
</script>

<i18n>
    {
        "de": {
            "logo_text": "skalar marketing",
            "link_articles": "Artikel",
            "link_lists": "Listen",
            "link_website": "Website"
        }
    }
</i18n>
