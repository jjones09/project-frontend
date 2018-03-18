import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, View} from 'react-native';

import SignedIn from "../components/SignedIn";
import ProfileInfo from "../components/ProfileInfo";
import { colours } from "../components/common/styles";

export default class Profile extends Component<Props> {
    static navigationOptions = {
        title: 'Profile',
        header: null
    };

    constructor(props) {
        super(props);
        AsyncStorage.getItem('userName').then(value => {
            this.setState({'name': value});
        });
    };

    state = {
        name: '',
        location: {}
    };

    render() {

        return (
            <View style={styles.container}>
                <SignedIn />
                <ProfileInfo/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: colours.primaryBackground
    }
});