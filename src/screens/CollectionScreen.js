// CollectionScreen.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const collections = [
  { name: 'Materias', categories: ['Archeology', 'Art', 'Sports', 'Photography', 'History of Nature', 'Manuscripts', 'Maps and Geography', 'Fashion', 'Music', 'Industrial Heritage', 'World War I'] },
  { name: 'Temática', categories: ['Memories', 'Furniture', 'Contemporary Academic Music', 'Classical Music'] },
  { name: 'Destacados', categories: ['Argentina', '20th Century', 'Animals', 'Art Nouveau', 'Architecture', 'Asian Art & Heritage'] },
  { name: 'Siglos', categories: ['1st Century', '2nd Century', '3rd Century', '4th Century', '9th Century', '10th Century', '11th Century', '12th Century', '13th Century', '14th Century', '19th Century', '15th Century', '16th Century', '17th Century', '18th Century', '20th Century', '21st Century'] },
  { name: 'Galerías', categories: ['Animals', 'Sunflowers', 'BUDDHA-BUDDHA', 'Ghosts', 'CHRISTMAS-NATIVITY', 'BUDDHIST THANGKAS'] }
];


export default function CollectionScreen({ navigation }) {
  const renderCollection = (collection) => (
    <View key={collection.name} style={styles.collectionContainer}>
      <Text style={styles.collectionTitle}>{collection.name}</Text>
      {collection.categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={styles.categoryItem}
          onPress={() => navigation.navigate('Category', { category })}
        >
          <Text style={styles.categoryText}>{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {collections.map(renderCollection)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  collectionContainer: {
    marginBottom: 30,
  },
  collectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
