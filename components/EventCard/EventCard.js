import React, {Component} from 'react';
import {Animated, Image, PanResponder, Text, View} from 'react-native';
import {Icon} from "react-native-elements";

import styles from "./styles";
import iconStyle from "./iconStyle"

import api from '../../lib/api-interface/apiInterface';
import UserPic from "../UserPic";
import Button from "../Button";
import ModalWrapper from "../ModalWrapper";

export default class EventCard extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };
    };

    componentWillMount() {
        this.pan = new Animated.ValueXY();

        this.cardPanResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderStart:  this.props.onStartSwipe,
            onPanResponderMove: Animated.event([
                null,
                {dx: this.pan.x, dy: this.pan.y}
            ]),
            onPanResponderRelease: (e, {dy}) => {
                const absDy = Math.abs(dy);
                const direction = absDy / dy;

                if (absDy > 120) {
                    Animated.decay(this.pan, {
                        velocity: {x: 0, y: 3 * direction},
                        deceleration: 0.995
                    }).start(this.props.nextCard)
                }
                else {
                    Animated.spring(this.pan, {
                        toValue: {x: 0, y: 0},
                        friction: 3.2
                    }).start()
                }
            },
            onPanResponderEnd: this.props.onStopSwipe
        });

        api.getUserPublicProfile(this.props.event.host).then(res => {
            this.setState({
                hostName: res.name,
                hostPic: res.url
            });
        });
    }

    openDetails() {
        this.setState({showModal: true});
    }

    closeModal() {
        this.setState({showModal: false});
    }

    render() {
        const event = this.props.event;
        let deviceLocation = this.props.deviceLocation;

        const rotateCard = this.pan.y.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: ['20deg', '0deg', '-20deg'],
        });

        const animatedStyle = {
            transform: [
                {translateX: this.pan.x},
                {translateY: this.pan.y},
                {rotate: rotateCard}
            ]
        };

        let getFontSize = () => {
            let titleLength = event.title.length;
            let reducer = titleLength > 20 ? (titleLength - 20) / 5 : 0;
            return {
                fontSize: 20 - reducer
            }
        };

        return (
            <Animated.View
                {...this.cardPanResponder.panHandlers}
                style={[styles.card, animatedStyle]}
            >

                <ModalWrapper
                    title='Event Details'
                    onClose={this.closeModal.bind(this)}
                    vis={this.state.showModal}
                    contents={
                        <Text>{JSON.stringify(event)}</Text>
                    }
                />

                <View style={styles.eventTitle}>
                    <View style={styles.headerContainer}>
                        <Text style={[styles.header, getFontSize()]}>
                            {event.title}
                        </Text>
                    </View>
                    {this.getGameIcon()}
                </View>
                <Image
                    style={styles.eventImg}
                    source={{uri: event.image}}
                />
                <View style={styles.eventDetails}>
                    <View style={styles.detailRow}>
                        <Text style={styles.details}>{event.dateTime}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.details}>{this.getDistance(deviceLocation, event.location)} miles from you</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.details}>{event.attendees.length} Players Attending</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.details}>Hosted By {this.state.hostName}</Text>
                        <UserPic size={30} url={this.state.hostPic} color='grey' />
                    </View>

                    <View style={styles.modalBtn}>
                        <Button
                            text='More Info'
                            colour='grey'
                            onPress={this.openDetails.bind(this)}
                        />
                    </View>
                </View>
            </Animated.View>
        );
    };

    getDistance (device, event) {
        let p = Math.PI / 180;
        let cos = Math.cos;

        let a = 0.5 - cos((device.lat - event.lat) * p)/2 +
            cos(event.lat * p) * cos(device.lat * p) *
            (1 - cos((device.long - event.long) * p))/2;

        return (7917.51 * Math.asin(Math.sqrt(a))).toFixed(1);
    };

    getGameIcon() {
        let iconProps = this.props.playingBoard ?
            {name: 'dice-multiple', type: 'material-community'} : {name: 'game-controller', type: 'entypo'};
        return (
            <Icon raised
                  color={iconStyle.color}
                  name={iconProps.name}
                  type={iconProps.type}
                  size={iconStyle.size}/>
        );
    }

    getPlayStyle(forGlory) {
        return forGlory ? 'For Glory' : 'For Fun';
    }

    getPrivacy(publicEvent) {
        return publicEvent ? 'Public' : 'Private';
    }
}