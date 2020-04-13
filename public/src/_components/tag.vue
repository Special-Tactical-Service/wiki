<template>
    <router-link :to="link" class="label">{{tag.name}}<span class="dash">-</span>{{tag.usages}}</router-link>
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
