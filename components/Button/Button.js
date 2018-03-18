import React, {Component} from 'react';
import PropTypes from 'prop-types';

let Toast = require('@remobile/react-native-toast');

import styles from './styles';
import { dev } from "../../config/apiURL";

export default class Button extends Component<props> {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    async fetchData() {
    }

    render() {

    }

    static propTypes = {
        text: PropTypes.string
    };

    static defaultProps = {
        text: 'Button'
    };
}