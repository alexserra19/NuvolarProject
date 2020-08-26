import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from '../app.json';
import {Provider} from 'react-redux';
import StackNavigator from './Navigation/Navigator'
import { NavigationContainer } from '@react-navigation/native';
import Store from './store/configureStore'

const store = Store()

export default class App extends React.Component{

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          {StackNavigator()}
        </NavigationContainer>  
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
