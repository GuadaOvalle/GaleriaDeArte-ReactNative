import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

const artists = [
  { name: 'Sandro Botticelli', query: 'Sandro Botticelli', image: require('../../assets/imagenes/sandro_botticelli.jpg') },
  { name: 'Vincent van Gogh', query: 'Vincent van Gogh', image: require('../../assets/imagenes/vincent_van_gogh.jpg') },
  { name: 'Pablo Picasso', query: 'Pablo Picasso', image: require('../../assets/imagenes/pablo_picasso.jpg') },
  { name: 'Claude Monet', query: 'Claude Monet', image: require('../../assets/imagenes/claude_monet.jpg') },
  { name: 'Leonardo da Vinci', query: 'Leonardo da Vinci', image: require('../../assets/imagenes/leonardo_da_vinci.jpg') },
  { name: 'Frida Kahlo', query: 'Frida Kahlo', image: require('../../assets/imagenes/frida_kahlo.jpg') },
  { name: 'Rembrandt', query: 'Rembrandt', image: require('../../assets/imagenes/rembrandt.jpg') },
  { name: 'Jackson Pollock', query: 'Jackson Pollock', image: require('../../assets/imagenes/jackson_pollock.jpg') },
];
export default function HomeScreen({ navigation }) {
  const renderArtist = (artist) => (
    <TouchableOpacity
      key={artist.name}
      style={styles.categoryItem}
      onPress={() => navigation.navigate('Category', { category: artist.query, isArtist: true })}
    >
      <ImageBackground source={artist.image} style={styles.backgroundImage} resizeMode="cover">
        <Text style={styles.categoryText}>{artist.name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.headerTitle}>Bienvenido a <Text style={styles.cultuart}>CultuArt</Text></Text>
      <Text style={styles.headerSubtitle}>Donde el arte se encuentra con tu <Text style={styles.highlight}>curiosidad</Text>.</Text>
      <Image 
  source={require('../../assets/imagenes/paul_klee.jpg')} 
  style={{ width: '100%', height: 200, marginBottom: 10, borderRadius: 60 }} 
  resizeMode="contain"
/>


      <Text style={styles.quote}>"El arte no reproduce lo visible, lo hace visible." - <Text style={styles.highlightLight}>Paul Klee</Text></Text>

      <Text style={styles.sectionTitle}>Explora las <Text style={styles.highlight}>Colecciones</Text></Text>
      
            <Text style={styles.subtitle}>Déjate inspirar por <Text style={styles.highlight}>obras maestras</Text> que han resistido la prueba del tiempo.</Text>
      <TouchableOpacity
        style={styles.collectionButton}
        onPress={() => navigation.navigate('Collection')}
      >
        <Text style={styles.collectionButtonText}>Ver Colecciones</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Artistas Famosos</Text>
      <Text style={styles.subtitle}>Descubre las mentes detrás de los pinceles y las paletas. Cada obra es una ventana a su <Text style={styles.highlight}>mundo</Text>.</Text>

      <View style={styles.categoryContainer}>
        {artists.map(renderArtist)}
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2EAE4', // Fondo beige claro
    padding: 20,
  },
  cultuart: {
    color: '#331a18',
  },
  headerTitle: {
    fontSize: 30,
    fontFamily: 'serif', // Fuente serif para texto predeterminado
    fontWeight: 'bold',  // Weight más elevado
    color: '#734440', // Marrón oscuro
    textAlign: 'center',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'serif', // Fuente serif predeterminada
    fontWeight: '600', // Un font-weight más elevado
    color: '#A67A76', // Marrón suave
    textAlign: 'center',
    marginBottom: 10,
  },
  quote: {
    fontSize: 13,
    fontFamily: 'serif', // Fuente serif predeterminada
    fontWeight: '600', // Peso más elevado
    color: '#d1beb8',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  bold: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#734440',
  },
  highlight: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#734440',
  },
  highlightLight: {
    fontFamily: 'PlayfairDisplay_700Bold',

    color: '#a38e87',
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'serif', // Fuente serif predeterminada
    fontWeight: 'bold',  // Peso más elevado
    color: '#734440',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'serif', // Fuente serif predeterminada
    fontWeight: '400', // Peso más elevado
    color: '#A67A76',
    textAlign: 'center',
    marginBottom: 20,
  },
  collectionButton: {
    backgroundColor: '#A67A76', // Marrón claro
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  collectionButtonText: {
    color: '#F2EAE4',
    fontSize: 17,
    fontFamily: 'serif', // Fuente serif predeterminada
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    marginBottom: 15,
  },
  backgroundImage: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  categoryText: {
    fontSize: 18,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
  },
});
