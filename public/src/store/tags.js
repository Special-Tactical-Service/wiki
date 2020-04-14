export const TagStore = {
    state: {
        tags: [],
        tagsOffset: 0
    },
    mutations: {
        setTags(state, {tags, offset}) {
            state.tags = state.tags.concat(tags);
            state.tagsOffset += offset;
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
        }
    },
    getters: {
        tags(state) {
            return state.tags;
        }
    }
};
