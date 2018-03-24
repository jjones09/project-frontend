"use strict";

import {AsyncStorage, NetInfo} from 'react-native';
import urls, {dev} from '../../config/apiURL';

const baseURL = urls.dev;

let connAvailable;

let updateStatus = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
        connAvailable = isConnected;
    });
};

updateStatus();
NetInfo.addEventListener('connectionChange', updateStatus);

module.exports = {

    connectionAvailable: () => {
        return connAvailable;
    },

    verifyUserToken: (uID, tkn) => {
        let url = baseURL + 'users/' + uID + '/verify-token';
        let params = ({token: tkn});
        return makeRequest(url, 'POST', params);
    },

    requestUserToken: (uID, fbTkn) => {
        let url = baseURL + 'users/' + uID + '/get-token';
        let params = { accessToken: fbTkn };
        return makeRequest(url, 'POST', params);
    },

    getUserProfilePic: (uID) => {
        let url = baseURL + 'users/' + uID + '/profile-pic';
        return makeRequest(url, 'GET');
    },

    getUserPreferences: (uID) => {
        let url = baseURL + 'users/' + uID + '/get-prefs';
        return makeRequest(url, 'GET');
    },

    setUserPreferences: (uID, prefs) => {
        let url = baseURL + 'users/' +uID + '/set-prefs';
        let params = { preferences: prefs };
        return makeRequest(url, 'POST', params);
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