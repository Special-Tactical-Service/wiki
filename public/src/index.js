import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import VueI18n from "vue-i18n";
import VueMoment from "vue-moment";
import moment from "moment";
import EmviClient from "@emvi/api";
import {getRouter} from "./router";
import {getI18n} from "./i18n";
import {SearchStore} from "./store/search";
import {CacheStore} from "./store/cache";

const SM_WIKI_CLIENT_ID = "J8U5aYxyfdW9Outof9DL";
const SM_WIKI_CLIENT_SECRET = "IEWlpiNJTlzZJgaPNxtKnyo4UjhQOsk4t6lNOBw8z2mTtcsXMXdfIkAfrGYlkfca";
const SM_WIKI_ORGANIZATION = "skalar";

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(VueMoment);
Vue.config.productionTip = false;
Vue.config.devtools = false;
let emvi = new EmviClient(SM_WIKI_CLIENT_ID, SM_WIKI_CLIENT_SECRET, SM_WIKI_ORGANIZATION);

Vue.mixin({
	data() {
		return {
			emvi
		};
	}
});

let store = new Vuex.Store({
	modules: {
		search: SearchStore,
		cache: CacheStore
	}
});

new Vue({
	el: "#app",
	store,
	router: getRouter(),
	i18n: getI18n(),
	mounted() {
		moment.locale("de");
		this.$store.dispatch("loadTags", emvi);
		this.$store.dispatch("loadArticles", emvi);
		this.$store.dispatch("loadLists", emvi);
		this.$store.dispatch("loadPinned", emvi);
		this.$store.dispatch("loadWelcomeArticle", emvi);
	}
});
