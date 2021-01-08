import { getRequest, postRequest } from '@/axios.js';

const pricingAction = {

    async getPricing({ commit }) {
        const { data } = await getRequest('/Pricing?pageNumber=1&pageSize=9999');

        commit('SET_PRICING', data.items);
    },

    async order({ }, order) {
        await postRequest('/Pricing', order);

    },
}

export default pricingAction