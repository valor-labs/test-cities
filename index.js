/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Actions} from 'react-native-router-flux';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
