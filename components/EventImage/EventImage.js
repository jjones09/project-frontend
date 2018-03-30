import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {colours} from "../common/styles";


export default class EventImage extends Component<Props> {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <View>
                <Image style={{
                    margin: 5,
                    height: this.props.height,
                    width: this.props.width,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: colours.disabledText
                }}
                source={{uri: "mario.nintendo.com/assets/img/home/intro/mario-pose2.png"}}/>
            </View>);
    };


}