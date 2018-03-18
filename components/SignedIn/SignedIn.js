import React, {Component} from 'react';
import {AsyncStorage, Text, View} from 'react-native';
import styles from './styles';

import UserPic from "../UserPic/UserPic";

export default class SignedIn extends Component<props> {

    constructor() {
        super();
        this.state = {userName: ''};
    }

    componentDidMount() {
        this.fetchData().done()
    }

    async fetchData() {
        AsyncStorage.getItem('userName').then((name) => {
            this.setState({userName: name});
        });
    }

    render () {
        return (
            <View style={styles.signedInView}>
                <UserPic style={styles.pic}/>
                <Text style={styles.name}>{this.state.userName}</Text>
            </View>
        );
    };
};