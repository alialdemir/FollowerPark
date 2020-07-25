const georaphicalLocationsSearchActions = {
    search({ commit }, { places }) {
        commit('SET_SEARCH_RESULT', places);
    },

    selectSearchLocation({ commit }, place) {
        commit('SELECT_SEARCH_LOCATION', place);
    }
}

export default georaphicalLocationsSearchActions