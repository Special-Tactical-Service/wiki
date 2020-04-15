import {addDirectLinks} from "../util/directlink";

const welcomeArticleId = "0D3aPP0alx";

export const CacheStore = {
    state: {
        tagsOffset: 0,
        articlesOffset: 0,
        listsOffset: 0,
        tags: [],
        articles: [],
        lists: [],
        pinned: [],
        welcomeArticle: {}
    },
    mutations: {
        setTags(state, {tags, offset}) {
            state.tags = state.tags.concat(tags);
            state.tagsOffset += offset;
        },
        setArticles(state, {articles, offset}) {
            state.articles = state.articles.concat(articles);
            state.articlesOffset += offset;
        },
        setLists(state, {lists, offset}) {
            state.lists = state.lists.concat(lists);
            state.listsOffset += offset;
        },
        setPinned(state, pinned) {
            state.pinned = pinned;
        },
        setWelcomeArticle(state, article) {
            state.welcomeArticle = article;
        }
    },
    actions: {
        loadTags(context, emviClient) {
            emviClient.findTags(null, {offset: context.state.tagsOffset})
                .then(results => {
                    context.commit("setTags", {tags: results.tags, offset: results.tags.length});

                    if(results.tags.length > 0) {
                        context.dispatch("loadTags", emviClient);
                    }
                });
        },
        loadArticles(context, emviClient) {
            emviClient.findArticles(null, {offset: context.state.articlesOffset, sort_title: "asc"})
                .then(results => {
                    context.commit("setArticles", {articles: results.articles, offset: results.articles.length});

                    if(results.articles.length > 0) {
                        context.dispatch("loadArticles", emviClient);
                    }
                });
        },
        loadLists(context, emviClient) {
            emviClient.findLists(null, {offset: context.state.listsOffset, sort_name: "asc"})
                .then(results => {
                    context.commit("setLists", {lists: results.lists, offset: results.lists.length});

                    if(results.lists.length > 0) {
                        context.dispatch("loadLists", emviClient);
                    }
                });
        },
        loadPinned(context, emviClient) {
            emviClient.getPinned(true, false)
                .then(results => {
                    context.commit("setPinned", results.articles);
                });
        },
        loadWelcomeArticle(context, emviClient) {
            emviClient.getArticle(welcomeArticleId)
                .then(result => {
                    context.commit("setWelcomeArticle", {
                        id: result.article.id,
                        title: result.content.title,
                        views: result.article.views,
                        published: result.article.published,
                        updated: result.article.mod_time,
                        tags: result.article.tags,
                        content: addDirectLinks(result.content.content)
                    });
                });
        }
    },
    getters: {
        tags(state) {
            return state.tags;
        },
        articles(state) {
            return state.articles;
        },
        lists(state) {
            return state.lists;
        },
        pinned(state) {
            return state.pinned;
        },
        welcomeArticle(state) {
            return state.welcomeArticle;
        }
    }
};
