import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';

import styles from './styles';

export default class SearchResult extends Component<Props> {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <View style={styles.gameResult}>
                <Image style={styles.resultImg} source={{uri: this.props.imgURL}}/>
                <Text style={styles.gameTitle}>{this.props.name}</Text>
            </View>
        );
    };
}