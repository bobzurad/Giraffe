/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import App from './src/App';
import {name as appName} from './src/app.json';

export default function Main() {
  return (
    // PaperProvider must be the inner-most Provider
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
