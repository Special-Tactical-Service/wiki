<template>
	<div class="menu">
		<div class="logo"></div>
		<div class="search">
			<div class="input">
				<i class="material-icons">search</i>
				<input type="text" :placeholder="$t('placeholder_search')" />
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
		"placeholder_search": "Suche..."
	}
}
</i18n>
