<template>
    <div class="search">
        <input type="text" :placeholder="$t('placeholder')" autocomplete="off" v-model="query" />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                query: ""
            };
        },
        watch: {
            query() {
                this.search();
            }
        },
        methods: {
            search() {
                console.log("search");
            }
        }
    }
</script>

<i18n>
    {
        "de": {
            "placeholder": "Suche"
        }
    }
</i18n>
