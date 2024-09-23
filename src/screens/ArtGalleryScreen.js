// ArtGalleryScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
// Corrige la ruta para importar correctamente desde la carpeta api
import { fetchEuropeanaArtworks, fetchClevelandArtworks } from '../api/ArtAPI';

const ArtGalleryScreen = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    // Obtener obras de Europeana y Cleveland Museum
    const loadArtworks = async () => {
      const europeanaArtworks = await fetchEuropeanaArtworks('impressionism');
      const clevelandArtworks = await fetchClevelandArtworks('impressionism');
      setArtworks([...europeanaArtworks, ...clevelandArtworks]);
    };

    loadArtworks();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {artworks.map((artwork, index) => (
        <View key={index} style={styles.artworkContainer}>
          <Text style={styles.title}>{artwork.title}</Text>
          <Text style={styles.artist}>By: {artwork.creator || artwork.artist}</Text>
          {/* Mostrar más detalles del artwork */}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  artworkContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 14,
    color: '#666',
  },
});

export default ArtGalleryScreen;
