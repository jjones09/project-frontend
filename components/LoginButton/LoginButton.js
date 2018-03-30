import React, {Component} from 'react';
import {AsyncStorage, NetInfo, Text, TouchableOpacity} from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Icon } from 'react-native-elements';

let Toast = require('@remobile/react-native-toast');

import styles from './styles';
import iconStyle from './iconStyle';
import { dev } from "../../config/apiURL";

import api from '../../lib/api-interface/apiInterface';

export default class LoginButton extends Component<props> {

    constructor(props) {
        super(props);
        this.state = {
            btnText: '',
            navigate: this.props.navigate
        };
    }

    componentDidMount() {
        this.fetchData().done();
    }

    async fetchData() {
        AsyncStorage.getItem('userName').then(name => {
            this.setState({btnText:
                    name ? 'Continue as ' + name.split(' ')[0] :
                        'Log in with Facebook'});
        });
    }

    getFbIcon() {
        if (this.state.btnText.indexOf('Continue') < 0) {
            return (<Icon name='facebook' type='entypo' size={iconStyle.size} color={iconStyle.color}/>);
        }
    };

    render() {

        let comp = [];
        comp.push (
                <TouchableOpacity key='loginBtn' style={styles.button} onPress={this.determineAction}>
                    {this.getFbIcon()}
                    <Text style={styles.buttonText}>
                        { this.state.btnText }
                        </Text>
                </TouchableOpacity>
        );

        if (this.state.btnText.indexOf('Continue') >= 0) {
            comp.push(
                <Text key='notYouTxt' style={styles.notYouText}>
                    Not you?
                </Text>);
            comp.push(
                <TouchableOpacity key='logOutBtn' style={styles.logOutButton}
                onPress={this.logOut}>
                    <Text style={styles.logOutText}>
                        Log out
                    </Text>
                </TouchableOpacity>
            );
        }
        return comp;
    }

    checkConnection = () => {
        return new Promise(resolve => {
            NetInfo.isConnected.fetch().then(isConnected => {
                resolve(isConnected);
            });
        });
    };

    determineAction = () => {
        if (this.state.btnText.indexOf('Continue') >= 0) {
            this.continue();
        }
        else {
            this.logIn();
        }
    };

    logOut = () => {
        AsyncStorage.removeItem('userName');
        AsyncStorage.removeItem('profileImgUrl');
        this.setState({'btnText': 'Log in with Facebook'});
    };

    continue = async () => {
        let isConnected = await this.checkConnection();
        if (isConnected) {
            AsyncStorage.getItem('appID').then( tkn => {
                AsyncStorage.getItem('uID').then(uID => {
                    api.verifyUserToken(uID, tkn).then(res => {
                        console.log(res);
                        if (res) {
                            this.props.navigate('Hub', {});
                        }
                    });
                });
            })
        }
        else {
            Toast.showShortCenter('Your device is not connected to the internet.' +
                ' Please check your connection and try again.');
        }
    };

    logIn = () => {
        LoginManager.logInWithReadPermissions(['public_profile', 'user_photos']).then((res) => {
                if (!res.isCancelled) {
                    console.log('Login successful. Permissions: %s', res.grantedPermissions.toString());
                    AccessToken.getCurrentAccessToken().then(data => {
                            console.log('Token obtained. Verifying with server');
                            api.requestUserToken(data.userID, data.accessToken).then(res => {
                                AsyncStorage.setItem('userName', res.user);
                                        AsyncStorage.setItem('uID', data.userID);
                                        AsyncStorage.setItem('appID', res.token);
                                        this.props.navigate('Hub', {});
                                        this.setState({'btnText': 'Continue as ' + res.user.split(' ')[0]});
                            });
                        }
                    )
                }
            },
            (err) => {
                console.log('Login failed. Error: %s', err);
            })
    };
}