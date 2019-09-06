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

// reponse error handler
axios.interceptors.response.use(undefined, err => {
	if(err.response.data.error){
		console.log(err.response.data.error);
	}
	
	return Promise.reject(err);
});

// token interceptor for every request
axios.interceptors.request.use((config) => {
	const token = window.localStorage.getItem("token");

	if(token){
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
}, (err) => {
	return Promise.reject(err);
});

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

// router interceptor to check token for protected pages
router.beforeEach((to, from, next) => {
	if(to.meta.protected){
		axios.get("http://localhost/auth/token")
		.then(() => {
			next();
		})
		.catch(() => {
			next("/");
		});
	}
	else{
		next();
	}
});

// i18n
const i18n = new VueI18n({
	locale: "de",
	fallbackLocale: "de"
});

// Emvi API
let emviOptions = {
	auth_host: "https://auth.emvi-integration.com", // TODO switch to production
	api_host: "https://api.emvi-integration.com"
};
let emvi = new EmviClient("5JlZ3OFVvisEdyqwS4ca", "B6dtupb4FPP9dtGi984kMmLK9ZsQQ1bxtvbzDWgoKAsv3m6IRujWcKICqJ6v0SXn", "ststest", emviOptions);

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
