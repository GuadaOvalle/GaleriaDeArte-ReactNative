import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

const images = {
  'Archeology': require('../../assets/imagenes/archeology.jpg'),
  'Art': require('../../assets/imagenes/art.jpg'),
  'Sports': require('../../assets/imagenes/sports.jpg'),
  'Photography': require('../../assets/imagenes/photography.jpg'),
  'History of Nature': require('../../assets/imagenes/history_of_nature.jpg'),
  'Manuscripts': require('../../assets/imagenes/manuscripts.jpg'),
  'Maps': require('../../assets/imagenes/maps.jpg'),
  'Fashion': require('../../assets/imagenes/fashion.jpg'),
  'Music': require('../../assets/imagenes/music.jpg'),
  'Industrial Heritage': require('../../assets/imagenes/industrial_heritage.jpg'),
  'World War I': require('../../assets/imagenes/ww1.jpg'),
  'Memories': require('../../assets/imagenes/memories.jpg'),
  'Furniture': require('../../assets/imagenes/furniture.jpg'),
  'Contemporary Academic Music': require('../../assets/imagenes/contemporary_music.jpg'),
  'Classical Music': require('../../assets/imagenes/classical_music.jpg'),
  'Argentina': require('../../assets/imagenes/argentina.jpg'),
  '20th Century': require('../../assets/imagenes/20th_century.jpg'),
  'Animals': require('../../assets/imagenes/animals.jpg'),
  'Art Nouveau': require('../../assets/imagenes/art_nouveau.jpg'),
  'Architecture': require('../../assets/imagenes/architecture.jpg'),
  'Asian Art & Heritage': require('../../assets/imagenes/asian_art_&_heritage.jpg'),
  '1st Century': require('../../assets/imagenes/1st_century.jpg'),
  '2nd Century': require('../../assets/imagenes/2nd_century.jpg'),
  '3rd Century': require('../../assets/imagenes/3rd_century.jpg'),
  '4th Century': require('../../assets/imagenes/4th_century.jpg'),
  '9th Century': require('../../assets/imagenes/9th_century.jpg'),
  '10th Century': require('../../assets/imagenes/10th_century.jpg'),
  '11th Century': require('../../assets/imagenes/11th_century.jpg'),
  '12th Century': require('../../assets/imagenes/12th_century.jpg'),
  '13th Century': require('../../assets/imagenes/13th_century.jpg'),
  '14th Century': require('../../assets/imagenes/14th_century.jpg'),
  '19th Century': require('../../assets/imagenes/19th_century.jpg'),
  '15th Century': require('../../assets/imagenes/15th_century.jpg'),
  '16th Century': require('../../assets/imagenes/16th_century.jpg'),
  '17th Century': require('../../assets/imagenes/17th_century.jpg'),
  '18th Century': require('../../assets/imagenes/18th_century.jpg'),
  '21st Century': require('../../assets/imagenes/21st_century.jpg'),
  'Sunflowers': require('../../assets/imagenes/sunflowers.jpg'),
  'BUDDHA-BUDDHA': require('../../assets/imagenes/buddha-buddha.jpg'),
  'Ghosts': require('../../assets/imagenes/ghosts.jpg'),
  'CHRISTMAS-NATIVITY': require('../../assets/imagenes/christmas-nativity.jpg'),
  'BUDDHIST THANGKAS': require('../../assets/imagenes/buddhist_thangkas.jpg'),
};

// Traducción de los nombres de las colecciones y categorías a español
const translations = {
  'Archeology': 'Arqueología',
  'Art': 'Arte',
  'Sports': 'Deportes',
  'Photography': 'Fotografía',
  'History of Nature': 'Historia de la Naturaleza',
  'Manuscripts': 'Manuscritos',
  'Maps': 'Mapas',
  'Fashion': 'Moda',
  'Music': 'Música',
  'Industrial Heritage': 'Patrimonio Industrial',
  'World War I': 'Primera Guerra Mundial',
  'Memories': 'Memorias',
  'Furniture': 'Mobiliario',
  'Contemporary Academic Music': 'Música Académica Contemporánea',
  'Classical Music': 'Música Clásica',
  'Argentina': 'Argentina',
  '20th Century': 'Siglo XX',
  'Animals': 'Animales',
  'Art Nouveau': 'Art Nouveau',
  'Architecture': 'Arquitectura',
  'Asian Art & Heritage': 'Arte y Patrimonio Asiático',
  '1st Century': 'Siglo I',
  '2nd Century': 'Siglo II',
  '3rd Century': 'Siglo III',
  '4th Century': 'Siglo IV',
  '9th Century': 'Siglo IX',
  '10th Century': 'Siglo X',
  '11th Century': 'Siglo XI',
  '12th Century': 'Siglo XII',
  '13th Century': 'Siglo XIII',
  '14th Century': 'Siglo XIV',
  '19th Century': 'Siglo XIX',
  '15th Century': 'Siglo XV',
  '16th Century': 'Siglo XVI',
  '17th Century': 'Siglo XVII',
  '18th Century': 'Siglo XVIII',
  '21st Century': 'Siglo XXI',
  'Sunflowers': 'Girasoles',
  'BUDDHA-BUDDHA': 'Buda-Buda',
  'Ghosts': 'Fantasmas',
  'CHRISTMAS-NATIVITY': 'Navidad y Natividad',
  'BUDDHIST THANGKAS': 'Thangkas Budistas',
};

const collections = [
  { 
    name: 'Materias', 
    description: 'Desde arqueología hasta moda, aquí encontrarás de todo un poco. ¡Despierta tu curiosidad académica y déjate sorprender!',
    categories: ['Archeology', 'Art', 'Sports', 'Photography', 'History of Nature', 'Manuscripts', 'Maps', 'Fashion', 'Music', 'Industrial Heritage', 'World War I'] 
  },
  { 
    name: 'Temática', 
    description: 'Viaja a través del tiempo y las emociones, donde cada colección te cuenta una historia distinta. ¡Explora el pasado y el presente!',
    categories: ['Memories', 'Furniture', 'Contemporary Academic Music', 'Classical Music'] 
  },
  { 
    name: 'Destacados', 
    description: 'Colecciones que brillan por su importancia cultural. ¡Descubre lo mejor de lo mejor, desde arquitectura hasta arte asiático!',
    categories: ['Argentina', '20th Century', 'Animals', 'Art Nouveau', 'Architecture', 'Asian Art & Heritage'] 
  },
  { 
    name: 'Siglos', 
    description: '¡Un recorrido por la historia en modo exprés! Desde el 1er siglo hasta el 21ro, sumérgete en cada era como si estuvieras allí.',
    categories: ['1st Century', '2nd Century', '3rd Century', '4th Century', '9th Century', '10th Century', '11th Century', '12th Century', '13th Century', '14th Century', '19th Century', '15th Century', '16th Century', '17th Century', '18th Century', '20th Century', '21st Century'] 
  },
  { 
    name: 'Galerías', 
    description: 'Un popurrí de colecciones eclécticas. Desde girasoles hasta fantasmas, esta sección te llevará a lugares inesperados.',
    categories: ['Animals', 'Sunflowers', 'BUDDHA-BUDDHA', 'Ghosts', 'CHRISTMAS-NATIVITY', 'BUDDHIST THANGKAS'] 
  }
];

export default function CollectionScreen({ navigation }) {
  const renderCategory = (category) => (
    <TouchableOpacity
      key={category}
      style={styles.categoryItem}
      onPress={() => navigation.navigate('Category', { category })}
    >
      <ImageBackground source={images[category]} style={styles.categoryImage} resizeMode="cover">
        <View style={styles.overlay}>
          {/* Utiliza la traducción para mostrar el nombre en español */}
          <Text style={styles.categoryText}>{translations[category]}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderCollection = (collection) => (
    <View key={collection.name} style={styles.collectionContainer}>
      <Text style={styles.collectionTitle}>{collection.name}</Text>
      <Text style={styles.collectionDescription}>{collection.description}</Text>
      <View style={styles.categoryContainer}>
        {collection.categories.map(renderCategory)}
      </View>
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
    backgroundColor: '#F2EAE4', // Fondo beige claro
    padding: 20,
  },
  collectionContainer: {
    marginBottom: 30,
  },
  collectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#734440', // Marrón oscuro
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay_700Bold',
  },
  collectionDescription: {
    fontSize: 16,
    color: '#A67A76', // Marrón claro
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'serif',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    height: 150,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,  // Redondeado suave para las imágenes
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Fondo semitransparente para texto legible
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 18,
    color: '#FFFFFF', // Texto blanco para contraste con el fondo
    fontFamily: 'PlayfairDisplay_700Bold',
    textAlign: 'center',
  },
});
