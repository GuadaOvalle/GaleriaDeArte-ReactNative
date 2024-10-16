import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const categories = [
  { name: 'Impresionismo', query: 'impressionism' },
  { name: 'Renacimiento', query: 'renaissance' },
  { name: 'Barroco', query: 'baroque' },
  { name: 'Arte Moderno', query: 'modern art' },
  { name: 'Surrealismo', query: 'surrealism' },
  { name: 'Arte Pop', query: 'pop art' },
  { name: 'Realismo', query: 'realism' },
];

const artists = [
  { name: 'Sandro Botticelli', query: 'Sandro Botticelli' },
  { name: 'Vincent van Gogh', query: 'Vincent van Gogh' },
  { name: 'Pablo Picasso', query: 'Pablo Picasso' },
  { name: 'Claude Monet', query: 'Claude Monet' },
  { name: 'Leonardo da Vinci', query: 'Leonardo da Vinci' },
  { name: 'Frida Kahlo', query: 'Frida Kahlo' },
  { name: 'Rembrandt', query: 'Rembrandt' },
  { name: 'Jackson Pollock', query: 'Jackson Pollock' },
  { name: 'Andy Warhol', query: 'Andy Warhol' },
];

export default function HomeScreen({ navigation }) {
  const renderCategory = (item, isArtist = false) => (
    <TouchableOpacity
      key={item.name}
      style={styles.categoryItem}
      onPress={() => navigation.navigate('Category', { category: item.query, isArtist })}
    >
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Explora Categorías de Arte</Text>
      <View style={styles.categoryContainer}>
        {categories.map(category => renderCategory(category))}
      </View>

      <Text style={styles.title}>Artistas Famosos</Text>
      <View style={styles.categoryContainer}>
        {artists.map(artist => renderCategory(artist, true))}
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