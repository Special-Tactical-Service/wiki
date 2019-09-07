<template>
    <div class="colormode" v-on:click="colorMode" :title="$t('hint_color_mode')"></div>
</template>

<script>
export default {
    methods: {
        colorMode() {
            let body = document.getElementsByTagName("html")[0];

            if (body.classList.contains('dark-mode')) {
                body.classList.remove("dark-mode");
                body.classList.add("light-mode");
                window.localStorage.setItem("dark-mode", false);
            } else {
                body.classList.remove("light-mode");
                body.classList.add("dark-mode");
                window.localStorage.setItem("dark-mode", true);
            }
        }
    }
}
</script>

<i18n>
{
    "de": {
        "hint_color_mode": "Farbmodus ändern"
    }
}
</i18n>
