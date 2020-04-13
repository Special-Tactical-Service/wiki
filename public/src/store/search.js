export const SearchStore = {
    state: {
        query: "",
        results: []
    },
    mutations: {
        setQuery(state, query) {
            state.query = query;
        },
        setResults(state, results) {
            state.results = results;
        }
    }
};
