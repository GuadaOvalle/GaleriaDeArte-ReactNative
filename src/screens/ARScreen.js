// ARScreen.js
import React from 'react';
// import { ARKit } from 'react-native-arkit'; // No compatible con Expo Go

const ARScreen = ({ route }) => {
  const { artId } = route.params;
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>AR functionality is not supported in Expo Go</Text>
    </View>
  );
};

export default ARScreen;
