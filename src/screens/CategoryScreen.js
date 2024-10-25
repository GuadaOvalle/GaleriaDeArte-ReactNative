import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { fetchArtworksByCategory } from '../api/ArtAPI';
import Icon from 'react-native-vector-icons/FontAwesome';


const artistFacts = {
  'Sandro Botticelli': {
    quote: 'La belleza es el regalo de Dios.',
    fact: 'Botticelli nunca se casó, y muchos creen que vivió una vida solitaria.',
    image: require('../../assets/imagenes/nacimiento_de_venus.jpg'),
  },
  'Vincent van Gogh': {
    quote: 'No tengo miedo a la muerte, solo a la vida vacía.',
    fact: 'Van Gogh solo vendió una pintura en su vida, y lo hizo pocos meses antes de su muerte.',
    image: require('../../assets/imagenes/noche_estrellada.jpg'),
  },
  'Pablo Picasso': {
    quote: 'El propósito del arte es lavar el polvo de la vida diaria de nuestras almas.',
    fact: 'Picasso tuvo un período azul debido a la depresión, lo que se reflejó en sus pinturas.',
    image: require('../../assets/imagenes/guernica.jpg'),
  },
  'Claude Monet': {
    quote: 'Solo soy bueno para pintar y jardín.',
    fact: 'Monet sufría de cataratas, lo que afectó su forma de ver y pintar la luz.',
    image: require('../../assets/imagenes/impression_sunrise.jpg'),
  },
  'Leonardo da Vinci': {
    quote: 'El conocimiento nunca agota la mente.',
    fact: 'Da Vinci tenía una curiosidad inagotable, y sus diarios contienen dibujos anatómicos detallados.',
    image: require('../../assets/imagenes/mona_lisa.jpg'),
  },
  'Frida Kahlo': {
    quote: 'Pinto flores para que no mueran.',
    fact: 'Frida Kahlo transformó su sufrimiento físico en una fuente de inspiración artística.',
    image: require('../../assets/imagenes/dos_fridas.jpg'),
  },
  'Rembrandt': {
    quote: 'Un cuadro es una cosa que requiere tantas traiciones, mesura y audacia como cualquier otra.',
    fact: 'Rembrandt murió en la pobreza, a pesar de haber sido un pintor famoso en su época.',
    image: require('../../assets/imagenes/guardia_nocturna.jpg'),
  },
  'Jackson Pollock': {
    quote: 'No pintas lo que ves, pintas lo que sientes.',
    fact: 'Pollock revolucionó la pintura con su técnica de "drip painting", una forma de arte abstracto.',
    image: require('../../assets/imagenes/numero_5.jpg'),
  },
};

// Mapeo de imágenes de las pinturas más famosas de los artistas
const artistImages = {
  'Sandro Botticelli': require('../../assets/imagenes/nacimiento_de_venus.jpg'),
  'Vincent van Gogh': require('../../assets/imagenes/noche_estrellada.jpg'),
  'Pablo Picasso': require('../../assets/imagenes/guernica.jpg'),
  'Claude Monet': require('../../assets/imagenes/impression_sunrise.jpg'),
  'Leonardo da Vinci': require('../../assets/imagenes/mona_lisa.jpg'),
  'Frida Kahlo': require('../../assets/imagenes/dos_fridas.jpg'),
  'Rembrandt': require('../../assets/imagenes/guardia_nocturna.jpg'),
  'Jackson Pollock': require('../../assets/imagenes/numero_5.jpg'),
};

export default function CategoryScreen({ route, navigation }) {
  const { category, isArtist } = route.params || {};
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const fetchArtworks = async (pageNumber) => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);
    try {
      const fetchedArtworks = await fetchArtworksByCategory(category, pageNumber);
      if (fetchedArtworks.length === 0) {
        setHasMore(false);
      } else {
        setArtworks(prevArtworks => [...prevArtworks, ...fetchedArtworks]);
        setPage(pageNumber);
      }
    } catch (err) {
      setError('Failed to load artworks. Please try again.');
      Alert.alert('Error', 'Failed to load artworks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks(1);
  }, [category, isArtist]);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchArtworks(page + 1);
    }
  };

  const toggleFavorite = (artwork) => {
    if (favorites.some(fav => fav.id === artwork.id)) {
      setFavorites(favorites.filter(fav => fav.id !== artwork.id));
    } else {
      setFavorites([...favorites, artwork]);
    }
  };

  // Renderiza la frase y el dato curioso al principio de la pantalla
  const renderArtistFact = (artist) => {
    const fact = artistFacts[artist];
    if (!fact) return null;

    return (
      <View style={styles.factContainer}>
        <Text style={styles.quoteText}>
          "{fact.quote}" - <Text style={styles.keywordText}>{artist}</Text>
        </Text>
        <Text style={styles.creativeText}>
          <Text style={styles.factLabel}>Dato curioso:</Text> {fact.fact}
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ArtDetails', { artId: item.id })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.artImage} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardCreator}>{item.creator}</Text>
      </View>
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={() => toggleFavorite(item)}
      >
        <Icon name={favorites.some(fav => fav.id === item.id) ? 'heart' : 'heart-o'} size={24} color="#A67A76" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Nombre del artista (fijo en la parte superior) */}
      <View style={styles.fixedTitleContainer}>
        <Text style={styles.fixedTitle}>{category}</Text>
      </View>

      {/* Todo el contenido scrolleable */}
      <ScrollView style={styles.scrollableContent}>
        {/* Renderiza la frase y dato curioso si es un artista */}
        {isArtist && renderArtistFact(category)}

        {/* Muestra la imagen de la pintura más famosa si es un artista */}
        {isArtist && artistImages[category] && (
          <Image 
            source={artistImages[category]} 
            style={styles.featuredImage} 
            resizeMode="contain" 
          />
        )}

        <FlatList
          data={artworks}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
          numColumns={2}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={loading && <ActivityIndicator size="large" color="#A67A76" />}
          scrollEnabled={false} // Deshabilita el scroll de FlatList, ya que el ScrollView se encarga
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2EAE4', // Fondo beige claro
    padding: 20,
  },
  fixedTitleContainer: {
    // Contenedor del título fijo
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F2EAE4', // Mismo color de fondo
    zIndex: 1, // Asegúrate de que esté encima del ScrollView
    paddingVertical: 10,
  },
  fixedTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#734440', // Marrón oscuro
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay_700Bold', // Mantén la fuente elegante
  },
  scrollableContent: {
    marginTop: 60, // Asegúrate de dejar espacio para el título fijo
  },
  factContainer: {
    marginBottom: 15,
    alignItems: 'center', // Centrar la frase y el dato curioso
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#A67A76', // Marrón suave para el texto de la frase
    textAlign: 'center',
    marginVertical: 5,
    fontFamily: 'serif',
  },
  creativeText: {
    fontSize: 16,
    color: '#BF9D95', // Marrón suave para el dato curioso
    textAlign: 'center',
    marginVertical: 5,
    fontFamily: 'serif',
  },
  factLabel: {
    fontWeight: 'bold', // Negrita para "Dato curioso:"
    color: '#734440',
  },
  featuredImage: {
    width: '100%',
    height: 250, // Tamaño ajustable de la imagen de la pintura
    marginVertical: 15,
    borderRadius: 10, // Añadir bordes redondeados a la imagen
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fondo blanco limpio para la tarjeta
    margin: 10,
    borderRadius: 15, // Redondeado más suave
    overflow: 'hidden',
    elevation: 5, // Elevación para un efecto de sombra suave
    shadowColor: '#000', // Sombra para dar efecto de profundidad
    shadowOffset: { width: 0, height: 4 }, // Desplazamiento de sombra
    shadowOpacity: 0.1, // Opacidad de la sombra
    shadowRadius: 8, // Radio de difuminado de la sombra
  },
  artImage: {
    width: '100%',
    height: 180, // Tamaño reducido para mejor visualización
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15, // Mantiene los bordes redondeados en la parte superior
  },
  cardTextContainer: {
    padding: 15, // Espaciado amplio para el texto
    alignItems: 'center', // Centrado del texto
  },
  cardTitle: {
    fontSize: 18, // Tamaño de fuente ligeramente más grande
    fontWeight: 'bold',
    color: '#734440', // Marrón oscuro
    fontFamily: 'PlayfairDisplay_700Bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  cardCreator: {
    fontSize: 14,
    color: '#A67A76', // Marrón claro
    textAlign: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFF', // Fondo blanco puro
    padding: 10,
    borderRadius: 50, // Botón redondo y prominente
    elevation: 2, // Ligera elevación para destacar el botón
  },
});
