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

<i18n>
{
	"en": {
		"message": "#404 Page not found"
	}
}
</i18n>
