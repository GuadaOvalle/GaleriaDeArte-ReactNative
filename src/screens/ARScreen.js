import React from 'react';
import { View, Text } from 'react-native';
// import { ARKit } from 'react-native-arkit'; // Se sugiere usar este paquete con React Native CLI si no se está usando Expo

const ARScreen = ({ route }) => {
  const { artId } = route.params;
  const isARSupported = false; // Temporalmente desactivado para evitar errores

  // Comprobar si ARKit está disponible antes de usarlo
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