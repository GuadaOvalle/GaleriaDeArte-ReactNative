// src/screens/ArtDetailsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
// Asegúrate de importar correctamente la función desde src/api/ArtAPI.js
import { fetchArtDetails } from '../api/ArtAPI';

export default function ArtDetailsScreen({ route, navigation }) {
  const { artId } = route.params;
  const [artDetails, setArtDetails] = useState(null);

  useEffect(() => {
    const getArtDetails = async () => {
      const data = await fetchArtDetails(artId);
      setArtDetails(data);
    };
    getArtDetails();
  }, [artId]);

  if (!artDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{artDetails.title}</Text>
      <Text style={styles.artist}>{artDetails.artist}</Text>
      <Text style={styles.description}>{artDetails.description}</Text>
      <Button
        title="View in AR"
        onPress={() => navigation.navigate('ARScreen', { artId })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 18,
    color: '#555',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
});
