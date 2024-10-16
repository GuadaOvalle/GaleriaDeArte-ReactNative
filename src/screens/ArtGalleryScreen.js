import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { fetchEuropeanaArtworks, fetchClevelandArtworks } from '../api/ArtAPI';
import FastImage from 'react-native-fast-image';

const ArtGalleryScreen = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtworks = async () => {
      setLoading(true);
      try {
        const europeanaArtworks = await fetchEuropeanaArtworks('impressionism');
        const clevelandArtworks = await fetchClevelandArtworks('impressionism');
        setArtworks([...europeanaArtworks, ...clevelandArtworks]);
      } catch (error) {
        Alert.alert('Error', 'Error al cargar las obras de arte. Verifica tu conexión a Internet e intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {artworks.map((artwork, index) => (
        <View key={index} style={styles.artworkContainer}>
          <FastImage source={{ uri: artwork.imageUrl }} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
          <Text style={styles.title}>{artwork.title}</Text>
          {artwork.creator && (
            <Text style={styles.artist}>Artista: {artwork.creator}</Text>
          )}
          {artwork.date && (
            <Text style={styles.info}>Fecha: {artwork.date}</Text>
          )}
          {artwork.description && (
            <Text style={styles.info}>Descripción: {artwork.description}</Text>
          )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  info: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});

export default ArtGalleryScreen;