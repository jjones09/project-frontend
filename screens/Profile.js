import React, {Component} from 'react';
import {AsyncStorage, ScrollView, StyleSheet, View} from 'react-native';
import { Icon } from 'react-native-elements';

import SignedIn from "../components/SignedIn";
import { colours } from "../components/common/styles";
import InterestedIn from "../components/InterestedIn";
import ModalWrapper from "../components/ModalWrapper";
import Button from "../components/Button";
import MyBio from "../components/MyBio";
import Location from "../components/Location";

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
            <ScrollView style={{flex: 1}}>
                <View style={styles.container}>
                    <ModalWrapper title='Edit Preferences'
                                  that={this}
                                  vis={this.state.showModal}
                                  contents={<InterestedIn/>}
                    />
                    <SignedIn />
                    <MyBio />
                    <Location />
                    <Button text='Edit Preferences' onPress={this.openEventCreator.bind(this)}/>
                </View>
            </ScrollView>
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