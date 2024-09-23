// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// Importar correctamente las funciones desde src/api/ArtAPI.js
import { fetchEuropeanaArtworks, fetchClevelandArtworks } from '../api/ArtAPI';

export default function HomeScreen({ navigation }) {
  const [artPieces, setArtPieces] = useState([]);

  useEffect(() => {
    const getArtPieces = async () => {
      const europeana = await fetchEuropeanaArtworks('impressionism');
      const cleveland = await fetchClevelandArtworks('impressionism');
      setArtPieces([...europeana, ...cleveland]);
    };
    getArtPieces();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Art Galleries</Text>
      <FlatList
        data={artPieces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ArtDetails', { artId: item.id })}
          >
            <Text style={styles.itemText}>{item.title}</Text>
            <Text style={styles.itemText}>{item.creator}</Text>
          </TouchableOpacity>
        )}
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
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
});
