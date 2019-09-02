<template>
    <div class="colormode">
        <div class="light" :title="$t('hint_light_mode')" v-on:click="lightMode"></div>
        <div class="dark" :title="$t('hint_dark_mode')" v-on:click="darkMode"></div>
    </div>
</template>

<script>
export default {
    methods: {
        lightMode() {
            let body = document.getElementsByTagName("html")[0];
            body.classList.remove("dark-mode");
            window.localStorage.setItem("dark-mode", false);
        },
        darkMode() {
            let body = document.getElementsByTagName("html")[0];
            body.classList.add("dark-mode");
            window.localStorage.setItem("dark-mode", true);
        }
    }
}
</script>

<i18n>
{
    "de": {
        "hint_light_mode": "Light Mode",
        "hint_dark_mode": "Dark Mode"
    }
}
</i18n>
