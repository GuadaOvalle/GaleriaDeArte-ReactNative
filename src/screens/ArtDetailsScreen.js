import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { fetchArtDetails } from '../api/ArtAPI';
import { Audio } from 'expo-av';

export default function ArtDetailsScreen({ route, navigation }) {
  const { artId } = route.params;
  const [artDetails, setArtDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState();

  useEffect(() => {
    const getArtDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchArtDetails(artId);
        setArtDetails(data);
      } catch (error) {
        alert('Error al cargar los detalles. Verifica tu conexión a Internet e intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };
    getArtDetails();
  }, [artId]);

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  const playSound = async () => {
    if (artDetails?.audioUrl) {
      try {
        const { sound } = await Audio.Sound.createAsync({ uri: artDetails.audioUrl });
        setSound(sound);
        await sound.playAsync();
      } catch (error) {
        console.error('Error playing audio:', error);
        alert('No se pudo reproducir el audio. Por favor, inténtelo de nuevo más tarde.');
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!artDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se pudo cargar la información de la obra de arte.</Text>
      </View>
    );
  }

  const renderDetail = (label, value) => {
    if (value && value !== 'Desconocido' && !value.includes('desconocid')) {
      return (
        <Text style={styles.info}>
          <Text style={styles.label}>{label}:</Text> {value}
        </Text>
      );
    }
    return null;
  };

  return (
    <ScrollView style={styles.container}>
      {artDetails.imageUrl && (
        <Image source={{ uri: artDetails.imageUrl }} style={styles.image} resizeMode="contain" />
      )}
      <Text style={styles.title}>{artDetails.title}</Text>
      {renderDetail('Artista', artDetails.artist)}
      {renderDetail('Fecha', artDetails.date)}
      {renderDetail('Medio', artDetails.medium)}
      {renderDetail('Tipo', artDetails.type)}
      {renderDetail('Dimensiones', artDetails.dimensions)}
      {renderDetail('Colección', artDetails.collection)}
      {renderDetail('Procedencia', artDetails.provenance)}
      {renderDetail('Descripción', artDetails.description)}

      {artDetails.audioUrl && (
        <TouchableOpacity style={styles.button} onPress={playSound}>
          <Text style={styles.buttonText}>Reproducir Audio</Text>
        </TouchableOpacity>
      )}

      {artDetails.bibliographyUrl && (
        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(artDetails.bibliographyUrl)}>
          <Text style={styles.buttonText}>Ver Bibliografía</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});