import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import { colours } from "../components/common/styles";
import Button from "../components/Button";
import ModalWrapper from "../components/ModalWrapper"
import EventEditor from "../components/EventEditor";

import api from "../lib/api-interface/apiInterface";
import {Icon} from "react-native-elements";

export default class Host extends Component<Props> {

    static navigationOptions = {
        title: 'Host',
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            hosting: [],
            showModal: false,
            modalTitle: '',
            modalParams: ''
        };
    };

    componentDidMount() {
        this.fetchData().done();
    }

    async fetchData() {
        api.getHostingEvents().then(res => {
            console.log(res);
            this.setState({hosting: res});
        });
    }

    closeModal() {
        this.setState({showModal: false});
    }

    render() {
        return (
            <View style={styles.container}>
                <ModalWrapper
                    title={this.state.modalTitle}
                    onClose={this.closeModal.bind(this)}
                    vis={this.state.showModal}
                    contents={
                        <EventEditor
                            initialVals={this.state.modalParams}
                            onSave={this.closeModal.bind(this)}
                        />
                    }
                />
                <View style={styles.header}>
                    {this.getHostingText()}
                </View>
                <View style={styles.eventsList}>
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
                        {this.getEvents()}
                    </ScrollView>
                </View>

                <View style={{position: 'absolute', top: 450}}>
                    <Button text='Create new event' onPress={this.openEventCreator.bind(this)}/>
                </View>

            </View>
        );
    };

    getEvents() {
        if (this.state.hosting.length > 0) {
            let events = this.state.hosting.map((event, i) => {
                return (<View key={i} style={styles.event}>
                    <View style={{flexDirection: 'row'}}>
                        <Image style={styles.eventImg} source={{uri: event.image}}/>
                        <View style={styles.eventDetails}>
                            <Text style={styles.eventTitle}>{event.title}</Text>
                            <Text style={styles.eventInfo}>{event.dateTime}</Text>
                            <Text style={styles.eventInfo}>{event.attendees.length} attending</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={styles.eventBtn}
                                onPress={() => {
                                    this.setState({
                                        modalTitle: 'Edit Event',
                                        showModal: true,
                                        modalParams: this.state.hosting[i]
                                    });
                                }}
                            >
                                <Icon color={colours.disabledText} name='edit' type='entypo' size={18}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.eventBtn}>
                                <Icon color={colours.disabledText} name='cross' type='entypo' size={18}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>);
            });
            return events;
        }
    }

    getHostingText() {
        let hostCount = this.state.hosting.length;
        return ( hostCount > 0) ? (
            <Text style={styles.hostingText}>
                You are hosting {hostCount} event{hostCount > 1 ? 's' : ''}
            </Text>
        ) :
        (
            <Text style={styles.hostingText}>
                You are not hosting any upcoming events
            </Text>
        );
    };

    openEventCreator() {
        console.log("Creating new event");
        this.setState({
            modalTitle: 'Create Event',
            showModal: true,
            modalParams: ''
        });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: colours.primaryBackground
    },
    hostingText: {
        textAlign: 'center',
        color: colours.primaryText,
        fontSize: 26
    },
    header: {
        width: 350,
        marginVertical: 20,
    },
    eventsList: {
        height: 280,
        marginBottom: 20
    },
    event: {
        margin: 10,
        width: 300,
        alignContent: 'flex-start'
    },
    eventTitle: {
        fontSize: 22,
        color: colours.subHeader
    },
    eventInfo: {
        fontSize: 14,
        color: colours.disabledText
    },
    eventImg: {
        margin: 5,
        height: 60,
        width: 60,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colours.disabledText
    },
    eventBtn: {
        margin: 5,
        padding: 5
    },
    eventDetails: {
        width: 200
    }
});