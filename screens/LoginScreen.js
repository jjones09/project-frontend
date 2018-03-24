import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import PlaysparkLogo from '../components/PlaysparkLogo';
import LoginButton from '../components/LoginButton';

import { dev } from '../config/apiURL';
import { colours} from "../components/common/styles";

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
                <LoginButton navigate={navigate} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colours.invertedBackground
    }
});