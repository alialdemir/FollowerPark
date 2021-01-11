import { postRequest } from '@/axios.js';
import main from '@/main.js';
const tokenExpiryKey = 'userInfo';

const accountAction = {

    async register({ dispatch }, userInfo) {
        const { isSuccess } = await postRequest('/account', userInfo);
        if (isSuccess) {
            dispatch('login', {
                email: userInfo.email,
                password: userInfo.password,
            });
        }
    },

    addInstagram({ }, userInfo) {
        postRequest('/account/instagram', userInfo);
    },

    async login({ }, userInfo) {
        const { isSuccess, data } = await postRequest('/account/token', userInfo);

        if (isSuccess) {
            localStorage.setItem(tokenExpiryKey, JSON.stringify(data));
            const { to } = main.$route.query;

            main.$router.push(to || '/Tasks');
        }
    },

    logOut() {
        localStorage.removeItem(tokenExpiryKey);
        main.$router.push('/');
    }
}

export default accountAction