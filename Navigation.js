import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

//screens
import HomeScreen from "./Screens/HomeScreen";
import SettingScreen from "./Screens/SettingScreen";
import StackScreen from "./Screens/StackScreen";

const Tab = createBottomTabNavigator();

function MyTabs() {

    return (

        <Tab.Navigator
        initialRouteName="setting"
        screenOptions={{

            tabBarActiveTintColor: "#EDA319",
            size: 24,

        }}
        >
            <Tab.Screen name = "home"

            component={HomeScreen}
            options={{
                tabBarLabel: "Inicio",
                tabBarIcon: ({color, size}) => (

                    <MaterialCommunityIcons name="home" size={size} color={color} />

                ),
                headerShown: false,
            }}

            />

            <Tab.Screen name = "setting"
            component = {SettingScreen}
            options={{
                tabBarLabel: "Opciones",
                tabBarIcon: ({color, size}) => (

                    <MaterialCommunityIcons name="tools" size={size} color={color} />

                )
            }}/>
        </Tab.Navigator>

    );

}

export default function Navigator(){

    return (

        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>

    );

}