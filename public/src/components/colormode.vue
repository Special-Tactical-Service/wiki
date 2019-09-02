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
            console.log("TODO switch to light mode");
        },
        darkMode() {
            console.log("TODO switch to dark mode");
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
