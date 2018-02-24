import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

import PlaysparkLogo from '../components/PlaysparkLogo';
import Button from '../components/Button';

export default class LoginScreen extends Component<Props> {
    static navigationOptions = {
        title: 'Login',
        header: null
    };

    constructor(props) {
        super(props);
    };

    state = {
      uID: '',
      accessToken: ''
    };

    render() {
        let { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <PlaysparkLogo />
                <Button text="Log in with Facebook" onPress={() => {
                    LoginManager.logInWithReadPermissions(['public_profile']).then((res) => {
                            if (res.isCancelled) {
                                console.log('Login cancelled');
                            }
                            else {
                                console.log('Login successful. Permissions: %s', res.grantedPermissions.toString());
                                AccessToken.getCurrentAccessToken().then((data) => {
                                    console.log('Token obtained. Verifying with server');
                                    let params = { accessToken: data.accessToken };

                                    fetch('https://playspark.herokuapp.com/users/' + data.userID + '/get-token', {
                                        method: 'POST',
                                        body: JSON.stringify(params),
                                        headers: new Headers({
                                            'Content-Type': 'application/json'
                                        })})
                                        .then(res => res.json())
                                        .then(res => {
                                            console.log('Signed in as %s ', res.user);
                                            AsyncStorage.setItem('userName', res.user);
                                            AsyncStorage.setItem('uID', data.userID);
                                            navigate('Second', {});
                                        });
                                    }
                                )
                            }
                        },
                        (err) => {
                            console.log('Login failed. Error: %s', err);
                        })
                }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});