const georaphicalLocationsSearchMutations = {

    SET_SEARCH_RESULT(state, places) {
        state.searchGeographicalLocation = places;
    },

    SELECT_SEARCH_LOCATION(state, selectedItem) {
        const selectedPlaceIndex = state.searchGeographicalLocation.findIndex(item => item.place.location.pk === selectedItem.place.location.pk);
        if (selectedPlaceIndex >= 0) {
            state.searchGeographicalLocation[selectedPlaceIndex] = selectedItem;
        }
    },
}

export default georaphicalLocationsSearchMutations