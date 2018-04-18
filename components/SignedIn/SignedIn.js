import React, {Component} from 'react';
import {AsyncStorage, Text, View} from 'react-native';
import styles from './styles';

import UserPic from "../UserPic/UserPic";
import api from "../../lib/api-interface/apiInterface";

export default class SignedIn extends Component<props> {

    constructor() {
        super();
        this.state = {userName: '', profilePic: ''};
    }

    componentDidMount() {
        this.fetchData().done()
    }

    async fetchData() {

        let url = await AsyncStorage.getItem('profileImgUrl');

        if (url) {
            let name = await AsyncStorage.getItem('userName');
            this.setState({
                userName: name,
                profilePic: url
            });
        }
        else {
            api.getUserPublicProfile().then(res => {
                this.setState({
                    userName: res.name,
                    profilePic: res.url
                });
            });
        }
    }

    render () {
        return (
            <View style={styles.signedInView}>
                <UserPic
                    style={styles.pic}
                    size={80}
                    url={this.state.profilePic}
                />
                <Text style={styles.name}>{this.state.userName}</Text>
            </View>
        );
    };
};