import React from 'react';
import { View, Text } from 'react-native';

const ARScreen = ({ route }) => {
  const { artId } = route.params;
  const isARSupported = false; // Temporalmente desactivado para evitar errores

  return (
    isARSupported ? (
      <View style={{ flex: 1 }}>
        {/* ARKit view aquí si es soportado */}
      </View>
    ) : (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>AR functionality is not supported in this environment</Text>
      </View>
    )
  );
};

export default ARScreen;