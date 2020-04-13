import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import VueI18n from "vue-i18n";
import VueMoment from "vue-moment";
import moment from "moment";
import EmviClient from "@emvi/api";
import {getRouter} from "./router";
import {getI18n} from "./i18n";

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(VueMoment);
Vue.config.productionTip = false;
Vue.config.devtools = false;

// Emvi API
let emvi = new EmviClient(STS_WIKI_CLIENT_ID, STS_WIKI_CLIENT_SECRET, STS_WIKI_ORGANIZATION);

Vue.mixin({
	data() {
		return {
			emvi
		};
	}
});

// main component
new Vue({
	el: "#app",
	router: getRouter(),
	i18n: getI18n(),
	mounted() {
		moment.locale("de");
	}
});
