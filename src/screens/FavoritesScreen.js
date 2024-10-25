import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function FavoritesScreen({ favorites, toggleFavorite, navigation }) {

  const removeFavorite = (artId) => {
    Alert.alert(
      'Eliminar favorito',
      '¿Estás seguro de que quieres eliminar esta obra de tus favoritos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => toggleFavorite({ id: artId }) },  // Elimina de favoritos utilizando toggleFavorite
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ArtDetails', { artId: item.id })}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.artImage} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardCreator}>{item.creator}</Text>
        </View>
      </TouchableOpacity>

      {/* Botón de eliminar */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeFavorite(item.id)}
      >
        <Icon name="trash" size={24} color="#A67A76" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.emptyText}>No hay obras favoritas.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2EAE4',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#734440',
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#D9B9AD',
    borderWidth: 1,
    elevation: 5,
    position: 'relative',
  },
  artImage: {
    width: '100%',
    height: 150,
    borderBottomWidth: 1,
    borderBottomColor: '#D9B9AD',
  },
  cardTextContainer: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#734440',
  },
  cardCreator: {
    fontSize: 14,
    color: '#A67A76',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#A67A76',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 50,
    elevation: 2,
  },
});
