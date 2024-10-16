import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const artists = [
  { name: 'Sandro Botticelli', query: 'Sandro Botticelli' },
  { name: 'Vincent van Gogh', query: 'Vincent van Gogh' },
  { name: 'Pablo Picasso', query: 'Pablo Picasso' },
  { name: 'Claude Monet', query: 'Claude Monet' },
  { name: 'Leonardo da Vinci', query: 'Leonardo da Vinci' },
  { name: 'Frida Kahlo', query: 'Frida Kahlo' },
  { name: 'Rembrandt', query: 'Rembrandt' },
  { name: 'Jackson Pollock', query: 'Jackson Pollock' },
];

export default function HomeScreen({ navigation }) {
  const renderArtist = (artist) => (
    <TouchableOpacity
      key={artist.name}
      style={styles.categoryItem}
      onPress={() => navigation.navigate('Category', { category: artist.query, isArtist: true })}
    >
      <Text style={styles.categoryText}>{artist.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Explora Colecciones</Text>
      <TouchableOpacity
        style={styles.collectionButton}
        onPress={() => navigation.navigate('Collection')}
      >
        <Text style={styles.collectionButtonText}>Ver Colecciones</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Artistas Famosos</Text>
      <View style={styles.categoryContainer}>
        {artists.map(renderArtist)}
      </View>
    </ScrollView>
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
    marginTop: 20,
    marginBottom: 10,
  },
  collectionButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  collectionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});