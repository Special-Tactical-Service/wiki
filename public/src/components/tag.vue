<template>
    <router-link :to="link" class="label">{{tag.name}}</router-link>
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
