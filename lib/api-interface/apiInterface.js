"use strict";

import {AsyncStorage, NetInfo} from 'react-native';
import urls, {dev} from '../../config/apiURL';

const baseURL = urls.dev;

let connAvailable;
let uID;

let updateStatus = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
        connAvailable = isConnected;
    });
};

if (!uID) {
    AsyncStorage.getItem('uID').then(val => {
        uID = val;
    });
}

updateStatus();
NetInfo.addEventListener('connectionChange', updateStatus);

module.exports = {

    connectionAvailable: () => {
        return connAvailable;
    },

    verifyUserToken: (tkn) => {
        let url = baseURL + 'users/' + uID + '/verify-token';
        let params = ({token: tkn});
        return makeRequest(url, 'POST', params);
    },

    requestUserToken: (fbTkn) => {
        let url = baseURL + 'users/' + uID + '/get-token';
        let params = { accessToken: fbTkn };
        return makeRequest(url, 'POST', params);
    },

    getUserProfilePic: () => {
        let url = baseURL + 'users/' + uID + '/profile-pic';
        return makeRequest(url, 'GET');
    },

    getUserPreferences: () => {
        let url = baseURL + 'users/' + uID + '/get-prefs';
        return makeRequest(url, 'GET');
    },

    setUserPreferences: (prefs) => {
        let url = baseURL + 'users/' + uID + '/set-prefs';
        let params = { preferences: prefs };
        return makeRequest(url, 'POST', params);
    },

    getUserBio: () => {
        let url = baseURL + 'users/' + uID + '/get-bio';
        return makeRequest(url, 'GET');
    },

    setUserBio: (bio) => {
        let url = baseURL + 'users/' + uID + '/set-bio';
        let params = { bio: bio };
        return makeRequest(url, 'POST', params);
    },

    searchGames: (type, query) => {
        let url = baseURL + 'games/' + type + '/find?title=' + query.split(' ').join('%20');
        return makeRequest(url, 'GET');
    },

    createEvent: (eventObj) => {
        let url = baseURL + 'events/create?host=' + uID;
        return makeRequest(url, 'POST', eventObj);
    }
};

let makeRequest = (url, method, params) => {
    return new Promise(resolve => {
        let req = {
            method: method,
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };
        if (params) {
            req.body = JSON.stringify(params);
        }
        fetch(url, req).then(res => {
           resolve(res.json());
        });
    });
};