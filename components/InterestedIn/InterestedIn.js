import React, {Component} from 'react';
import {AsyncStorage, Text, Switch, View} from 'react-native';

import { dev } from "../../config/apiURL";
import styles from './styles';
import { colours } from '../common/styles';

import api from '../../lib/api-interface/apiInterface';
import Button from "../Button/Button";

let Toast = require('@remobile/react-native-toast');

export default class InterestedIn extends Component<props> {

    constructor(props) {
        super(props);

        this.state = {
            seeVideo: true,
            seeBoard: true,
            allHosts: false,
            showModal: false,
            initialVals: {}
        };
    };

    componentDidMount() {
        this.fetchData().done();
    };

    async fetchData() {
        AsyncStorage.getItem('uID').then(uID => {
            api.getUserPreferences(uID).then(prefs => {
                this.setState(prefs);
                this.setState({initialVals: prefs});
            });
        });
    };

    render() {
        return (
            <View>
                <View>
                    <Text style={styles.header}>Show me</Text>
                    <View style={styles.rowContainerStyle1}>
                        <Text style={this.getVidStyle()}>Video Games</Text>
                        <Switch
                            onTintColor={colours.disabledText}
                            tintColor={colours.disabledText}
                            thumbTintColor={colours.primaryButtonBackground}
                            onValueChange={this.toggleVideo.bind(this)}
                            value={this.state.seeVideo} />
                    </View>
                    <View style={styles.rowContainerStyle1}>
                        <Text style={this.getBoardStyle()}>Board Games</Text>
                        <Switch onTintColor={colours.disabledText}
                                tintColor={colours.disabledText}
                                thumbTintColor={colours.primaryButtonBackground}
                                onValueChange={this.toggleBoard.bind(this)}
                                value={this.state.seeBoard} />
                    </View>
                </View>
                <View>
                    <Text style={styles.header}>Hosted by</Text>
                    <View style={styles.rowContainerStyle2}>
                        <Text style={this.getFriendsOnlyStyle()}>Friends only</Text>
                        <Switch
                            onTintColor={colours.disabledText}
                            tintColor={colours.disabledText}
                            thumbTintColor={colours.primaryButtonBackground}
                            onValueChange={this.toggleHosts.bind(this)}
                            value={this.state.allHosts} />
                        <Text style={this.getAllHostStyle()}>Anyone</Text>
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    {this.hasUnsavedChanges()}
                </View>
            </View>
        );
    };

    getAllHostStyle() {
        return (this.state.allHosts) ? styles.activeSwitchLabel : styles.inactiveSwitchLabel;
    };

    getFriendsOnlyStyle() {
        return (!this.state.allHosts) ? styles.activeSwitchLabel : styles.inactiveSwitchLabel;
    };

    getVidStyle() {
        return (this.state.seeVideo) ? styles.activeSwitchLabel : styles.inactiveSwitchLabel;
    };

    getBoardStyle() {
        return (this.state.seeBoard) ? styles.activeSwitchLabel : styles.inactiveSwitchLabel;
    };

    toggleVideo(value) {
        if (!this.state.seeBoard && this.state.seeVideo) {
            Toast.showShortCenter('Please select at least one type of game that you would like to be shown.');
        }
        else {
            this.setState({seeVideo: value});
        }
    };

    toggleBoard(value) {
        if (!this.state.seeVideo && this.state.seeBoard) {
            Toast.showShortCenter('Please select at least one type of game that you would like to be shown.');
        }
        else {
            this.setState({seeBoard: value});
        }
    };

    toggleHosts(value) {
        this.setState({allHosts: value});
        this.setState({unsavedChanges: true});
    }

    hasUnsavedChanges() {
        if (this.state.seeVideo !== this.state.initialVals.seeVideo ||
            this.state.seeBoard !== this.state.initialVals.seeBoard ||
            this.state.allHosts !== this.state.initialVals.allHosts)
        {
            return (<Button text='Save Changes' onPress={this.saveChanges.bind(this)}/>);
        }
    }

    saveChanges() {
        console.log('saving changes!');
        let updates = {
            seeVideo: this.state.seeVideo,
            seeBoard: this.state.seeBoard,
            allHosts: this.state.allHosts
        };
        this.setState({initialVals: updates});
        AsyncStorage.getItem('uID').then(uID => {
            api.setUserPreferences(uID, updates);
        });
    }
}