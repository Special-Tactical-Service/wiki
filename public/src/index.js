import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import VueI18n from "vue-i18n";
import VueMoment from "vue-moment";
import axios from "axios";
import moment from "moment";
import EmviClient from "@emvi/api";

import NewStore from "./store/store.js";
import * as pages from "./pages";

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(VueMoment);
Vue.config.productionTip = false;
Vue.config.devtools = false;

// router
const routes = [
	{path: "/", component: pages.Home},
	{path: "/lists", component: pages.Lists},
	{path: "/read/:id", component: pages.Read},
	{path: "/list/:id", component: pages.List},
	{path: "/tag/:name", component: pages.Tag},
	{path: "*", component: pages.Error404}
];

let router = new VueRouter({routes, mode: "history"});

router.beforeEach((to, from, next) => {
	window.scrollTo(0, 0);
	next();
});

// i18n
const i18n = new VueI18n({
	locale: "de",
	fallbackLocale: "de"
});

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
	store: NewStore(),
	router,
	i18n,
	mounted() {
		moment.locale("de");
		this.initColorMode();
	},
	methods: {
		initColorMode() {
			let darkMode = window.localStorage.getItem("dark-mode");

			if(darkMode === "true") {
				let body = document.getElementsByTagName("html")[0];
				body.classList.add("dark-mode");
			}
		}
	}
});
