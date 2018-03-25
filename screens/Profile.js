import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, View} from 'react-native';
import { Icon } from 'react-native-elements';

import SignedIn from "../components/SignedIn";
import ProfileInfo from "../components/ProfileInfo";
import { colours } from "../components/common/styles";
import InterestedIn from "../components/InterestedIn/InterestedIn";
import ModalWrapper from "../components/ModalWrapper/ModalWrapper";
import Button from "../components/Button/Button";
import MyBio from "../components/MyBio/MyBio";

export default class Profile extends Component<Props> {
    static navigationOptions = {
        title: 'Profile',
        header: null,
        tabBarIcon: (<Icon size={20} color='#FFF' name='user' type='entypo'/>)
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            location: {}
        };
    };

    async fetchData() {
        AsyncStorage.getItem('userName').then(value => {
            this.setState({'name': value});
        });
    }

    componentDidMount() {
        this.fetchData().done();
    }

    openEventCreator() {
        console.log("Editing preferences");
        this.setState({showModal: true});
    };

    render() {

        return (
            <View style={styles.container}>
                <ModalWrapper title='Edit Preferences'
                              that={this}
                              vis={this.state.showModal}
                              contents={<InterestedIn/>}
                />
                <SignedIn />
                <MyBio />
                <ProfileInfo/>
                <Button text='Edit Preferences' onPress={this.openEventCreator.bind(this)}/>
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