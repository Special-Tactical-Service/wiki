<template>
	<div>
		<mainmenu></mainmenu>
		<h1>{{$t("welcome")}}</h1>
	</div>
</template>

<script>
import mainmenu from "../components/menu.vue";

export default {
	components: {
		mainmenu
	}
}
</script>

<style lang="scss">
html, body{
	margin: 0;
	padding: 20px;
}
</style>

<i18n>
{
	"en": {
		"welcome": "Welcome!"
	}
}
</i18n>
