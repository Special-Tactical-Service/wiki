<template>
	<div class="menu">
		<div class="logo"></div>
		<div class="search">
			<div class="input">
				<i class="material-icons">search</i>
				<input type="text" :placeholder="$t('placeholder_search')" />
			</div>
			<div class="objects">
				<div class="object-label blue">{{$t("label_articles")}}</div>
				<div class="object-label green inactive">{{$t("label_lists")}}</div>
				<div class="object-label orange inactive">{{$t("label_tags")}}</div>
			</div>
		</div>
		<colormode></colormode>
	</div>
</template>

<script>
import colormode from "./colormode.vue";

export default {
	components: {colormode}
}
</script>

<i18n>
{
	"de": {
		"placeholder_search": "Suche...",
		"label_articles": "Artikel",
		"label_lists": "Listen",
		"label_tags": "Tags"
	}
}
</i18n>
