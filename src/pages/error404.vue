<template>
	<div>
		<mainmenu></mainmenu>
		<h1>{{$t("message")}}</h1>
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
		"message": "#404 Page not found"
	}
}
</i18n>
