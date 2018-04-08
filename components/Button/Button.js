import React, {Component} from 'react';
import PropTypes from 'prop-types';

let Toast = require('@remobile/react-native-toast');

import styles from './styles';
import { dev } from "../../config/apiURL";
import {Text, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import iconStyle from "./iconStyle";

export default class Button extends Component<props> {

    constructor(props) {
        super(props);
    }

    getButtonStyle() {
        if (this.props.colour === 'grey') {
            return styles.greyButton;
        }
        else {
            return styles.button;
        }
    }

    getButtonIcon() {
        if (this.props.icon) {
            return (
                <Icon name={this.props.icon} size={iconStyle.size} color={iconStyle.color} type='entypo' />
            );
        }
    }

    getButtonText() {
        if (this.props.text) {
            return (
                <Text style={styles.buttonText}>
                    { this.props.text }
                </Text>
            );
        }
    }

    render() {
        return (
            <TouchableOpacity style={this.getButtonStyle()}
                              onPress={this.props.onPress}>
                {this.getButtonIcon()}
                {this.getButtonText()}
            </TouchableOpacity>
        );
    }

    static propTypes = {
        text: PropTypes.string,
        onPress: PropTypes.func
    };
}