<template>
    <router-link :to="link" class="tag">{{tag.name}} ({{tag.usages}})</router-link>
</template>

<script>
    export default {
        props: ["tag"],
        computed: {
            link() {
                return `/tag/${this.tag.name}`;
            }
        }
    }
</script>
