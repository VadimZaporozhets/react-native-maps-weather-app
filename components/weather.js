import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import {WEATHER_ICON_DOMAIN} from '../constants';

const Weather = ({main, weather}) => {
    const {temp, pressure} = main;
    const {icon} = weather[0];
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Temperature: {Math.round(temp - 273)}</Text>
            <Image style={styles.image} source={{uri: `${WEATHER_ICON_DOMAIN}${icon}.png`}}/>
            <Text style={styles.text}>Pressure: {pressure}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    text: {
        marginBottom: 15,
        color: '#000',
        fontSize: 18
    },
    image: {
        width: 60,
        height: 60
    }
});

export default Weather;