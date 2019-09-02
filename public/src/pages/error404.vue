<template>
	<layout>
		<h1>{{$t("message")}}</h1>
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
		"message": "#404 Seite nicht gefunden"
	}
}
</i18n>
