<template>
	<layout>
		<template>
			<h1>Artikel</h1>
			<card color="blue" title="Foo Bar">
				Hallo Welt
			</card>
			<card color="blue" title="Foo Bar">
				Noch ein Artikel
			</card>
			<card color="blue" title="Foo Bar">
				Weiterer Artikel, toll!
			</card>
			<card color="green" title="Woop Woop">
				Eine Liste
			</card>
			<span class="label orange">Tag</span>
			<span class="label orange">Tag</span>
			<span class="label orange">Tag</span>
		</template>
		<template slot="right">
			TODO Filter und Tags
		</template>
	</layout>
</template>

<script>
import layout from "../components/layout.vue";
import card from "../components/card.vue";

export default {
	components: {
		layout,
		card
	}
}
</script>

<i18n>
{
	"de": {

	}
}
</i18n>
