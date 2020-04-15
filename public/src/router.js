import * as pages from "./pages";
import VueRouter from "vue-router";

const routes = [
    {path: "/", component: pages.Start},
    {path: "/articles", component: pages.Articles},
    {path: "/lists", component: pages.Lists},
    {path: "/read/:id", component: pages.Read},
    {path: "/list/:id", component: pages.List},
    {path: "/tag/:name", component: pages.Tag},
    {path: "*", component: pages.NotFound}
];

export function getRouter() {
    let router = new VueRouter({routes, mode: "history"});

    router.beforeEach((to, from, next) => {
        window.scrollTo(0, 0);
        next();
    });

    return router;
}
