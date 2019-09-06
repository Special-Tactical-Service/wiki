<template>
    <span class="label orange" v-on:click="visit">{{tag.name}}</span>
</template>

<script>
export default {
    props: ["tag"],
    methods: {
        visit() {
            this.$router.push(`/tag/${this.tag.id}`);
        }
    }
}
</script>
