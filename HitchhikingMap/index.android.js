import { AppRegistry } from 'react-native';
import codePush from 'react-native-code-push';
import { Client } from 'bugsnag-react-native';
import App from './src/containers/App/App';

const bugsnag = new Client();

AppRegistry.registerComponent('HitchhikingMap', () => codePush(App));
