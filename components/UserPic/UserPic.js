import React, {Component} from 'react';
import { Image } from 'react-native';
import styles from './styles';

import { dev } from '../../config/apiURL';
import {colours} from "../common/styles";

export default class UserPic extends Component<props> {

    constructor() {
        super();
    }

    getBorderColor () {
        let colour = colours.primaryText;
        if (this.props.color === 'grey') {
            colour = colours.disabledText
        }
        return {borderColor: colour};
    }

    render () {
        return (
            <Image
                style={
                    [
                        styles.image,
                        {height: this.props.size, width: this.props.size},
                        this.getBorderColor()
                        ]}
                source={{uri: this.props.url}}
            />);
    }
};