import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
    WEATHER_ICON_DOMAIN, 
    OPEN_WEATHER_API_DOMAIN, 
    OPEN_WEATHER_API_KEY_PARAM, 
    GEOCODING_DOMAIN, 
    GEOCODING_API_KEY_PARAM,
    REVERSE_GEOCODING_PARAM,
    DIRECT_GEOCODING_PARAM
} from '../constants';
import Weather from '../components/weather';
import CityInput from '../components/cityInput';

class WeatherScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coordinates: this.props.navigation.getParam('coordinate', {}),
            cityName: '',
            weather: null,
            error: ''
        }

        this.fetchGeocodedCityName();
    }

    fetchGeocodedLatLong = () => {
        const {cityName} = this.state;

        fetch(`${GEOCODING_DOMAIN}?${DIRECT_GEOCODING_PARAM}=${cityName}&${GEOCODING_API_KEY_PARAM}`)
            .then(res => res.json())
            .then(res => {
                if (res.status == 'OK') {
                    const {lat, lng} = res.results[0].geometry.location;

                    this.setState({
                        coordinates: {
                            latitude: lat,
                            longitude: lng
                        }
                    }, this.fetchWeatherForCity);
                } else if (res.status == 'ZERO_RESULTS') {
                    this.setState({error: 'Enter valid city'});
                } else {
                    this.setState({error: res.error_message});
                }
            });
    }

    fetchGeocodedCityName = () => {
        const {latitude, longitude} = this.state.coordinates;

        fetch(`${GEOCODING_DOMAIN}?${REVERSE_GEOCODING_PARAM}=${latitude},${longitude}&${GEOCODING_API_KEY_PARAM}`)
            .then(res => res.json())
            .then(res => {
                if (res.status == 'OK') {
                    const cityObj = res.results.find(result => {
                        return result.types[0] == 'locality'
                    });

                    const city = cityObj.formatted_address.split(',')[0]; 
                    this.setState({
                        cityName: city
                    }, this.fetchWeatherForCity);
                } else {
                    this.setState({error: res.error_message})
                }
            });
    }

    fetchWeatherForCity = () => {
        const {latitude, longitude} = this.state.coordinates;
        fetch(`${OPEN_WEATHER_API_DOMAIN}lat=${latitude}&lon=${longitude}&${OPEN_WEATHER_API_KEY_PARAM}`)
            .then(res => res.json())
            .then(res => {
                this.setState({weather: res});
            })
            .catch(error => this.setState({error}));
    }

    onChangeText = (cityName) => {
        this.setState({
            cityName
        });
    }

    onSubmit = () => {
        this.setState({
            error: ''
        }, this.fetchGeocodedLatLong);
    }

    render() {
        const {weather, error, cityName} = this.state;
        
        return (
            <View style={styles.container}>
                <CityInput value={cityName} onChangeText={this.onChangeText} onPress={this.onSubmit} />
                {error ? 
                    <Text style={styles.error}>{error}</Text>
                    :
                    (!!weather && <Weather {...weather} />)
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    error: {
       color: 'red',
       margin: 5
    }
});

export default WeatherScreen;