import EventEmitter from 'events'

import store from "@/store/store.js"

// 'loggedIn' is used in other parts of application. So, Don't forget to change there also
const localStorageKey = 'loggedIn';

const tokenExpiryKey = 'tokenExpiry';
const loginEvent = 'loginEvent';

class AuthService extends EventEmitter {
    idToken = null;
    profile = null;
    tokenExpiry = null;

    // Starts the user login flow
    login(customState) {

    }

    // Handles the callback request from Auth0
    handleAuthentication() {
        return new Promise((resolve, reject) => {

        });
    }

    localLogin(authResult) {
        return new Promise((resolve, reject) => {
            this.idToken = authResult.idToken;
            this.profile = authResult.idTokenPayload;

            // Convert the JWT expiry time from seconds to milliseconds
            this.tokenExpiry = new Date(this.profile.exp * 1000);
            localStorage.setItem(tokenExpiryKey, this.tokenExpiry);
            localStorage.setItem(localStorageKey, 'true');

            store.commit("UPDATE_USER_INFO", {
                displayName: this.profile.name,
                email: this.profile.email,
                photoURL: this.profile.picture,
                providerId: this.profile.sub.substr(0, this.profile.sub.indexOf('|')),
                uid: this.profile.sub
            })

            this.emit(loginEvent, {
                loggedIn: true,
                profile: authResult.idTokenPayload,
                state: authResult.appState || {}
            });

            resolve(true);
        });
    }

    renewTokens() {
        // reject can be used as parameter in promise for using reject
        return new Promise((resolve) => {
            if (localStorage.getItem(localStorageKey) !== "true") {
                // return reject("Not logged in");
            }

            this.localLogin(authResult);
        });
    }

    logOut() {
        localStorage.removeItem(localStorageKey);
        localStorage.removeItem(tokenExpiryKey);
        localStorage.removeItem('userInfo');

        this.idToken = null;
        this.tokenExpiry = null;
        this.profile = null;

        this.emit(loginEvent, { loggedIn: false });
    }

    isAuthenticated() {
        return (
            localStorage.getItem(localStorageKey) === 'true'
        );
    }
}

export default new AuthService();