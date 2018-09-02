import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';
import MapScreen from './containers/map-view-container';
import WeatherScreen from './containers/weather-view-container';

const RootStack = createStackNavigator({
  Map: MapScreen,
  Weather: WeatherScreen
});

export default class App extends Component {
  render() {
    return (
      <RootStack/>
    );
  }
}


