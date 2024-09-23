// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ArtDetailsScreen from './src/screens/ArtDetailsScreen';
import ARScreen from './src/screens/ARScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ArtDetails" component={ArtDetailsScreen} />
        <Stack.Screen name="ARScreen" component={ARScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
