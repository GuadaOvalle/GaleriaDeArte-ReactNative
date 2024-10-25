import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';  // Importa expo-font para cargar las fuentes
import { PlayfairDisplay_400Regular, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';  // Variantes de fuente
import * as SplashScreen from 'expo-splash-screen';  // Importa SplashScreen de expo
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';  // Para mostrar el logo
import HomeScreen from './src/screens/HomeScreen';
import CollectionScreen from './src/screens/CollectionScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import ArtDetailsScreen from './src/screens/ArtDetailsScreen';
import ARScreen from './src/screens/ARScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';  // Importa la nueva pantalla de favoritos


// Ruta del logo
const logo = require('./assets/imagenes/logo.jpg');  // Asegúrate de tener el logo en esta ruta

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFontsAndHideSplashScreen = async () => {
      try {
        // Evitar que el splash screen se oculte automáticamente
        await SplashScreen.preventAutoHideAsync();

        // Cargar las fuentes
        await Font.loadAsync({
          PlayfairDisplay_400Regular,
          PlayfairDisplay_700Bold,
        });

        // Indicar que las fuentes ya están cargadas
        setFontsLoaded(true);

        // Ocultar el splash screen
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    };

    loadFontsAndHideSplashScreen();
  }, []);

  if (!fontsLoaded) {
    // Si las fuentes no están cargadas, mantener el splash screen visible
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Pantalla Home */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <Image
                source={logo}  // Asigna el logo aquí
                style={{ width: 100, height: 40 }}  // Ajusta el tamaño del logo
                resizeMode="contain"
              />
            ),
            headerStyle: {
              backgroundColor: '#f2efe8',  // Fondo beige
            },
          }}
        />
        {/* Pantalla Colecciones */}
        <Stack.Screen
          name="Collection"
          component={CollectionScreen}
          options={({ route }) => ({
            headerTitle: () => (
              <Image
                source={logo}  // Asigna el logo también aquí
                style={{ width: 100, height: 40 }}
                resizeMode="contain"
              />
            ),
            headerStyle: {
              backgroundColor: '#f2efe8',  // Fondo beige
            },
          })}
        />
        {/* Pantalla Categorías */}
        <Stack.Screen
          name="Category"
          component={CategoryScreen}
          options={({ route }) => ({
            headerTitle: () => (
              <Image
                source={logo}
                style={{ width: 100, height: 40 }}
                resizeMode="contain"
              />
            ),
            headerStyle: {
              backgroundColor: '#f2efe8',
            },
          })}
        />
        {/* Pantalla Detalles de Arte */}
        <Stack.Screen
          name="ArtDetails"
          component={ArtDetailsScreen}
          options={{
            headerTitle: () => (
<Image
  source={logo}
  style={{ width: 150, height: undefined }}  // Deja que la altura sea ajustada automáticamente
  resizeMode="contain"
/>


            ),
            headerStyle: {
              backgroundColor: '#f2efe8',
            },
          }}
        />
        {/* Pantalla Realidad Aumentada */}
        <Stack.Screen
          name="ARScreen"
          component={ARScreen}
          options={{
            headerTitle: () => (
              <Image
                source={logo}
                style={{ width: 100, height: 40 }}
                resizeMode="contain"
              />
            ),
            headerStyle: {
              backgroundColor: '#f2efe8',
            },
          }}
        />
        {/* Pantalla de Favoritos */}
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}  // Añadimos la pantalla de favoritos
          options={{
            headerTitle: () => (
              <Image
                source={logo}
                style={{ width: 100, height: 40 }}
                resizeMode="contain"
              />
            ),
            headerStyle: {
              backgroundColor: '#f2efe8',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
