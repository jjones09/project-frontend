import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const Button = (props) => {
    const { text, onPress } = props;
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

Button.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func
};

Button.defaultProps = {
    text: 'Button',
    onPress: () => console.log('Button pressed')
};

export default Button;