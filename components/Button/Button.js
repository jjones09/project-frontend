import React, {Component} from 'react';
import PropTypes from 'prop-types';

let Toast = require('@remobile/react-native-toast');

import styles from './styles';
import { dev } from "../../config/apiURL";
import {Text, TouchableOpacity} from "react-native";

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

    render() {
        return (
            <TouchableOpacity style={this.getButtonStyle()}
                              onPress={this.props.onPress}>
                <Text style={styles.buttonText}>
                    { this.props.text }
                </Text>
            </TouchableOpacity>
        );
    }

    static propTypes = {
        text: PropTypes.string,
        onPress: PropTypes.func
    };

    static defaultProps = {
        text: 'Button',
        onPress: () => {
            console.log("Button pressed");
        }
    };
}