import React from 'react';
import { TextInput, TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const CityInput = ({value, onPress, onChangeText}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChange={(text) => {onChangeText(text.nativeEvent.text)}}
                value={value}
                placeholder={'Enter city name'}
                />
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    input: {
        padding: 7
    },
    button: {
        borderColor: '#000',
        borderRadius: 4,
        borderWidth: 1,
        padding: 7
    },
    text: {
        color: '#000',
        fontSize: 16
    }
});

export default CityInput;