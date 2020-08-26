import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppConstants from '../AppConstants';

import HomeScreen from '../scenes/HomeScreen'
import ProfileScreen from '../scenes/ProfileScreen'

Stack = createStackNavigator();

function StackNavigator() {
  return(
      <Stack.Navigator
        initialRouteName="Home"
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            headerShown: true,
            headerTitle: 'Search'
          }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            headerShown: true,
            headerTitle: 'Profile'
          }}
        />
      </Stack.Navigator>
  )
}

export default StackNavigator;

