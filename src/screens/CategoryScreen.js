import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { fetchArtworksByCategory } from '../api/ArtAPI';

export default function CategoryScreen({ route, navigation }) {
  const { category, isArtist } = route.params;
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

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

  const renderFooter = () => {
    if (loading) {
      return (
        <View style={styles.loadingFooter}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    if (!hasMore) {
      return (
        <View style={styles.endMessage}>
          <Text>No more artworks to load</Text>
        </View>
      );
    }
    return null;
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => fetchArtworks(1)}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      <FlatList
        data={artworks}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ArtDetails', { artId: item.id })}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemCreator}>{item.creator}</Text>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No artworks found</Text>
            </View>
          )
        }
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemCreator: {
    fontSize: 14,
    color: '#666',
  },
  loadingFooter: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  endMessage: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});