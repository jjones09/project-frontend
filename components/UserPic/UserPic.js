import React, {Component} from 'react';
import { AsyncStorage, Image } from 'react-native';
import styles from './styles';

import { dev } from '../../config/apiURL';

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
            console.log('URL from async - ' + url);
            if (url) {
                this.setState({url: url});
            }
            else {
                console.log('Getting profile image from remote API');
                AsyncStorage.getItem('uID').then((id) => {
                    console.log('User ID is ' + id);
                    fetch(dev + '/users/' + id + '/profile-pic', {
                        method: 'GET',
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })})
                        .then(res => res.json())
                        .then(res => {
                            console.log(res);
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