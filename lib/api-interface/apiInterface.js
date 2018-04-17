"use strict";

import {AsyncStorage, NetInfo} from 'react-native';
import urls from '../../config/apiURL';

const baseURL = urls.dev;

let connAvailable;
let uID, appID;

let getUser = () => {
    return new Promise(resolve => {
        if (uID) {
            resolve(uID);
        }
        else {
            AsyncStorage.getItem('uID').then(val => {
                uID = val;
                resolve(uID);
            });
        }
    });
};

let getAppID = () => {
    return new Promise(resolve => {
        if (appID) {
            resolve(appID);
        }
        else {
            AsyncStorage.getItem('appID').then(val => {
                appID = val;
                resolve(appID);
            });
        }
    });
};

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

    logIn: async (fbToken) => {
        let user = await getUser();
        let url = baseURL + 'users/' + user + '/log-in';
        let params = ({token: fbToken});
        return makeRequest(url, 'POST', params);
    },

    getUserProfilePic: async () => {
        let user = await getUser();
        let url = baseURL + 'users/' + user + '/profile-pic';
        return makeRequest(url, 'GET');
    },

    getUserPreferences: async () => {
        let user = await getUser();
        let url = baseURL + 'users/' + user + '/prefs';
        return makeRequest(url, 'GET');
    },

    setUserPreferences: async (prefs) => {
        let user = await getUser();
        let url = baseURL + 'users/' + user + '/prefs';
        let params = { preferences: prefs };
        return makeRequest(url, 'POST', params);
    },

    getUserBio: async () => {
        let user = await getUser();
        let url = baseURL + 'users/' + user + '/bio';
        return makeRequest(url, 'GET');
    },

    setUserBio: async (bio) => {
        let user = await getUser();
        let url = baseURL + 'users/' + user + '/bio';
        let params = { bio: bio };
        return makeRequest(url, 'POST', params);
    },

    searchGames: (type, query) => {
        let url = baseURL + 'games/' + type + '/find?' + query.split(' ').join('%20');
        return makeRequest(url, 'GET');
    },

    createEvent: async (eventObj) => {
        let user = await getUser();
        let url = baseURL + 'events?host=' + user;
        return makeRequest(url, 'POST', eventObj);
    },

    editEvent: async (eventObj, id) => {
        let user = await getUser();
        let url = baseURL + 'events?host=' + user + '&id=' + id;
        return makeRequest(url, 'PUT', eventObj);
    },

    getHostingEvents: async () => {
        let user = await getUser();
        let url = baseURL + 'events?host=' + user;
        return makeRequest(url, 'GET');
    },

    getAvailableEvents: (lat, long) => {
        let url = baseURL + 'events/discover?lat=' + lat + '&long=' + long;
        return makeRequest(url, 'GET');
    }
};

let makeRequest = async (url, method, params) => {

    let user = await getUser();
    let token = await getAppID();

    return new Promise(resolve => {
        let req = {
            method: method,
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Token': token,
                'User': user
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