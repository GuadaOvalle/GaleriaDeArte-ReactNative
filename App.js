import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import ArtDetailsScreen from './src/screens/ArtDetailsScreen';
import ARScreen from './src/screens/ARScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Galería de Arte' }} />
        <Stack.Screen name="Category" component={CategoryScreen} options={({ route }) => ({ title: route.params.category })} />
        <Stack.Screen name="ArtDetails" component={ArtDetailsScreen} options={{ title: 'Detalles de la Obra' }} />
        <Stack.Screen name="ARScreen" component={ARScreen} options={{ title: 'Visualización AR' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}