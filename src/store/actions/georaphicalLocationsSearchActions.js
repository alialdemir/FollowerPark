
const georaphicalLocationsSearchActions = {
    async searchGeographicalLocation({ commit }, search) {
        const response = await fetch(`https://www.instagram.com/web/search/topsearch/?context=blended&query=${search}&rank_token=0.17570890531920336&include_reel=true`);

        const { places } = await response.json();

        commit('SET_SEARCH_RESULT', places);
    },

    selectSearchLocation({ commit }, place) {
        commit('SELECT_SEARCH_LOCATION', place);
    }
}

export default georaphicalLocationsSearchActions