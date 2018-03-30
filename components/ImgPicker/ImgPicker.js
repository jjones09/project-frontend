import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {colours} from '../common/styles';

import api from '../../lib/api-interface/apiInterface'


export default class ImgPicker extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            imgs: []
        };
    };

    componentDidMount() {
        this.fetchData().done();
    };

    async fetchData() {
        api.getUserPics().then(res => {

        });
    };

    render() {
        return (
            <View>

            </View>
        );
    };
}