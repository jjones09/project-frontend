import React, {Component} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';

import key from '../../config/mapsKey';
import styles from './styles';
import iconStyle from "./iconStyle";
import {Icon} from "react-native-elements";

export default class EventDetails extends Component<Props> {

    constructor(props) {
        super(props);
    };

    componentWillMount() {
        this.fetchData().done();
    }

    async fetchData() {
    }

    buildMapURL(location) {
        return 'https://maps.googleapis.com/maps/api/staticmap?center=' +
            location.lat + ',' + location.long + '&markers=' +
            location.lat + ',' + location.long + '&zoom=16&size=200x200&key=' +
            key;
    }

    getGameIcon(playingBoard) {
        let iconProps = playingBoard ?
            {name: 'dice-multiple', type: 'material-community'} : {name: 'game-controller', type: 'entypo'};
        return (
            <Icon raised
                  color={iconStyle.color}
                  name={iconProps.name}
                  type={iconProps.type}
                  size={iconStyle.size}/>
        );
    }

    getGameLabel(playingBoard) {
        let gameType = playingBoard ? 'Board Games' : 'Video Games';
        return (
            <Text style={styles.typeTxt}>{gameType}</Text>
        );
    }

    render() {

        let event = this.props.event;

        return (
            <ScrollView style={styles.container}>
                <Text style={styles.header}>
                    {event.title}
                </Text>

                <Image style={styles.eventImg}
                    source={{uri: event.image}} />

                <Text style={styles.descText}>
                    {event.description}
                </Text>

                <Text style={styles.subHeader}>
                    Date + Time
                </Text>

                <Text style={styles.details}>
                    {event.dateTime}
                </Text>

                <Text style={styles.subHeader}>
                    Location
                </Text>

                <View style={styles.location}>
                    <View style={styles.addressView}>
                        <Text style={styles.locationName}>{event.location.name}</Text>
                        {event.location.address.map((line, i) => {
                            return (<Text key={i}>{line}</Text>)
                        })}
                    </View>
                    <Image
                        style={styles.mapImg}
                        source={{
                        uri: this.buildMapURL(event.location)
                    }}/>
                </View>

                <Text style={styles.subHeader}>
                    Games
                </Text>
                <View style={styles.gameType}>
                    {this.getGameIcon(event.playingBoard)}
                    {this.getGameLabel(event.playingBoard)}
                </View>

                <Text style={styles.subHeader}>
                    Play Style
                </Text>

                <Text style={styles.subHeader}>
                    Hosted By
                </Text>

                <Text style={styles.subHeader}>
                    Players Attending
                </Text>

            </ScrollView>
        );
    }
}