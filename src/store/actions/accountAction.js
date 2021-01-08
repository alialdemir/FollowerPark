import { postRequest } from '@/axios.js';
import main from '@/main.js';
const tokenExpiryKey = 'userInfo';

const accountAction = {

    async register({ dispatch }, userInfo) {
        const { status } = await postRequest('/account', userInfo);
        if (status) {
            dispatch('login', {
                email: userInfo.email,
                password: userInfo.password,
            });
        }
    },

    async login({ }, userInfo) {
        const { status, data } = await postRequest('/account/token', userInfo);

        if (status === 200) {
            localStorage.setItem(tokenExpiryKey, JSON.stringify(data));
            const { to } = main.$route.query;

            main.$router.push(to || '/Tasks');
        } else {
            main.$vs.notify({
                title: main.$i18n.t(data),
                color: "danger",
                position: "top-center",
            });
        }
    },

    logOut() {
        localStorage.removeItem(tokenExpiryKey);
        main.$router.push('/');
    }
}

export default accountAction