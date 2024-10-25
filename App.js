import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';  
import { PlayfairDisplay_400Regular, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';  
import * as SplashScreen from 'expo-splash-screen';  
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';  
import { Image, Text } from 'react-native';  
import HomeScreen from './src/screens/HomeScreen';
import CollectionScreen from './src/screens/CollectionScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import ArtDetailsScreen from './src/screens/ArtDetailsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import Icon from 'react-native-vector-icons/FontAwesome'; 

// Ruta del logo
const logo = require('./assets/imagenes/logo.jpg');  

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); 

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  // Estado global para manejar los favoritos
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFontsAndHideSplashScreen = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          PlayfairDisplay_400Regular,
          PlayfairDisplay_700Bold,
        });
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    };

    loadFontsAndHideSplashScreen();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  // Función para añadir o quitar de favoritos
  const toggleFavorite = (artwork) => {
    if (favorites.some(fav => fav.id === artwork.id)) {
      setFavorites(favorites.filter(fav => fav.id !== artwork.id));
    } else {
      setFavorites([...favorites, artwork]);
    }
  };

  // Pila de navegación para el Home y otras pantallas
  const HomeStack = () => (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeScreen"  
        component={HomeScreen} 
        options={{
          headerTitle: () => (
            <Image
              source={logo} 
              style={{ width: 100, height: 40 }}  
              resizeMode="contain"
            />
          ),
          headerStyle: { backgroundColor: '#f2efe8' },
        }} 
      />
      <Stack.Screen 
        name="Collection" 
        component={CollectionScreen}
        options={{
          headerTitle: () => (
            <Image
              source={logo} 
              style={{ width: 100, height: 40 }}
              resizeMode="contain"
            />
          ),
          headerStyle: { backgroundColor: '#f2efe8' },
        }} 
      />
      <Stack.Screen 
        name="Category" 
        options={{
          headerTitle: () => (
            <Image
              source={logo} 
              style={{ width: 100, height: 40 }} 
              resizeMode="contain"
            />
          ),
          headerStyle: { backgroundColor: '#f2efe8' },
        }}
      >
        {props => <CategoryScreen {...props} toggleFavorite={toggleFavorite} favorites={favorites} />}
      </Stack.Screen>
      <Stack.Screen 
        name="ArtDetails" 
        component={ArtDetailsScreen}
        options={{
          headerTitle: () => (
            <Image
              source={logo} 
              style={{ width: 100, height: 40 }} 
              resizeMode="contain"
            />
          ),
          headerStyle: { backgroundColor: '#f2efe8' },
        }} 
      />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'HomeTab') {
              iconName = 'home';  // Icono de inicio
            } else if (route.name === 'Favorites') {
              iconName = 'heart';  // Icono de favoritos
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#F2EAE4',  // Beige claro para el icono y texto activo
          tabBarInactiveTintColor: '#D9B9AD', // Beige oscuro para el icono y texto inactivo
          tabBarStyle: {
            backgroundColor: '#734440',  // Fondo marrón oscuro para la barra inferior
          },
          headerStyle: {
            backgroundColor: '#734440',  // Marrón oscuro para el header superior
          },
          headerTintColor: '#F2EAE4',  // Beige claro para el texto en el header
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen 
          name="HomeTab"  
          component={HomeStack} 
          options={{ 
            tabBarLabel: 'Inicio',
            headerTitle: 'Inicio',  // Cambiar el título que aparece en el header
          }} 
        />
        <Tab.Screen 
          name="Favorites" 
          options={{ 
            tabBarLabel: 'Favoritos',
            headerTitle: 'Favoritos',  // Cambiar el título que aparece en el header
          }} 
        >
          {props => <FavoritesScreen {...props} favorites={favorites} toggleFavorite={toggleFavorite} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
