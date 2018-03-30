import React, {Component} from 'react';
import { AsyncStorage, Image } from 'react-native';
import styles from './styles';

import { dev } from '../../config/apiURL';
import api from '../../lib/api-interface/apiInterface';

export default class UserPic extends Component<props> {

    constructor() {
        super();
        this.state = {url: ''};
    }

    componentDidMount() {
        this.fetchData().done()
    }

    async fetchData() {
        AsyncStorage.getItem('profileImgUrl').then((url) => {
            if (url) {
                this.setState({url: url});
            }
            else {
                AsyncStorage.getItem('uID').then((id) => {
                    api.getUserProfilePic(id).then(res => {
                        AsyncStorage.setItem('profileImgUrl', res.url);
                        this.setState({url: res.url});
                    });
                });
            }
        });
    }

    render () {
        return <Image style={styles.image}
                source={{uri: this.state.url}}/>;
    }
};