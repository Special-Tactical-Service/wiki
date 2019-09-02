<template>
	<layout>
		<h1>{{$t("welcome")}}</h1>
	</layout>
</template>

<script>
import layout from "../components/layout.vue";

export default {
	components: {
		layout
	}
}
</script>

<i18n>
{
	"de": {
		"welcome": "Willkommen!"
	}
}
</i18n>
