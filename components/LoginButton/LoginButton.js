import React, {Component} from 'react';
import {AsyncStorage, NetInfo, Text, TouchableOpacity} from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Icon } from 'react-native-elements';

import styles from './styles';
import iconStyle from './iconStyle';
import { dev } from "../../config/apiURL";
import api from '../../lib/api-interface/apiInterface';

let Toast = require('@remobile/react-native-toast');

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

    // Include the facebook icon on the login button if not already logged in
    getFbIcon() {
        if (this.state.btnText.indexOf('Continue') < 0) {
            return (<Icon name='facebook' type='entypo' size={iconStyle.size} color={iconStyle.color}/>);
        }
    };

    // Checks if the device is connected to the network
    checkConnection = () => {
        return new Promise(resolve => {
            NetInfo.isConnected.fetch().then(isConnected => {
                resolve(isConnected);
            });
        });
    };

    // Determine if the login button is for a currently authenticated user, or a new login
    determineAction = () => {
        if (this.state.btnText.indexOf('Continue') >= 0) {
            this.continue();
        }
        else {
            this.logIn();
        }
    };

    // Remove items from AsyncStorage
    // TODO: THIS COULD PROBABLY BE MOVED TO A CENTRAL SESSION MANAGEMENT
    logOut = () => {
        LoginManager.logOut();
        AsyncStorage.clear();
        this.setState({'btnText': 'Log in with Facebook'});
    };

    // Log in the user
    continue = async () => {

        if (api.connectionAvailable()) {

            api.logIn().then(res => {

                if (!res.error) {
                    this.props.navigate('Hub', {});
                }
                else {
                    Toast.showShortCenter('Please reauthenticate through Facebook');
                    this.logOut();
                }
            });
        }
        else {
            Toast.showShortCenter('Your device is not connected to the internet.' +
                ' Please check your connection and try again.');
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

    logIn = () => {

        LoginManager.logInWithReadPermissions(['public_profile', 'user_friends', 'user_photos']).then((res) => {
                if (!res.isCancelled) {

                    console.log('Login successful. Permissions: %s', res.grantedPermissions.toString());

                    AccessToken.getCurrentAccessToken().then(data => {

                            AsyncStorage.setItem('uID', data.userID);

                            api.logIn(data.accessToken).then(res => {

                                if (!res.error) {

                                    AsyncStorage.setItem('userName', res.user);
                                    AsyncStorage.setItem('appID', res.token);

                                    this.props.navigate('Hub', {});
                                    this.setState({'btnText': 'Continue as ' + res.user.split(' ')[0]});
                                }
                                else {
                                    this.logOut();
                                    Toast.showShortCenter('There was an error, please try again');
                                }
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