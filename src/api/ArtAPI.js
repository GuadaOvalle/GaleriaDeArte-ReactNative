// ArtAPI.js
import axios from 'axios';

const EUROPEANA_API_KEY = 'haltivaniv';
const EUROPEANA_BASE_URL = 'https://api.europeana.eu/record/v2/search.json';
const CLEVELAND_API_BASE_URL = 'https://openaccess-api.clevelandart.org/api/artworks/';

const filterAndMapArtworks = (items, source) => {
  return items
    .filter(item => 
      item.title && 
      item.title !== 'Unknown' &&
      item.creator &&
      item.creator !== 'Unknown' &&
      item.imageUrl &&
      item.date &&
      item.date !== 'Unknown' &&
      item.description &&
      item.description !== 'No description available'
    )
    .map(item => ({
      id: item.id,
      title: item.title,
      creator: item.creator,
      imageUrl: item.imageUrl,
      date: item.date,
      source: source
    }));
};

export const fetchArtworksByCategory = async (category, page = 1, limit = 10) => {
  try {
    const europeanaPromise = axios.get(EUROPEANA_BASE_URL, {
      params: {
        query: category,
        wskey: EUROPEANA_API_KEY,
        rows: limit,
        start: (page - 1) * limit + 1,
        profile: 'standard',
      },
    }).catch(error => {
      console.warn('Error fetching from Europeana:', error.message);
      return { data: { items: [] } };
    });

    const clevelandPromise = axios.get(`${CLEVELAND_API_BASE_URL}`, {
      params: {
        q: category,
        limit: limit,
        skip: (page - 1) * limit,
      },
    }).catch(error => {
      console.warn('Error fetching from Cleveland Museum:', error.message);
      return { data: { data: [] } };
    });

    const [europeanaResponse, clevelandResponse] = await Promise.all([europeanaPromise, clevelandPromise]);

    const europeanaItems = europeanaResponse.data.items.map(item => ({
      id: item.id,
      title: item.title?.[0] || 'Unknown',
      creator: item.dcCreator?.[0] || 'Unknown',
      imageUrl: item.edmPreview?.[0] || null,
      date: item.year?.[0] || 'Unknown',
      description: item.dcDescription?.[0] || 'No description available'
    }));

    const clevelandItems = clevelandResponse.data.data.map(item => ({
      id: item.id,
      title: item.title || 'Unknown',
      creator: item.creators?.[0]?.description || 'Unknown',
      imageUrl: item.images?.web?.url || null,
      date: item.creation_date || 'Unknown',
      description: item.wall_description || item.description || 'No description available'
    }));

    const europeanaArtworks = filterAndMapArtworks(europeanaItems, 'Europeana');
    const clevelandArtworks = filterAndMapArtworks(clevelandItems, 'Cleveland');

    return [...europeanaArtworks, ...clevelandArtworks];
  } catch (error) {
    console.error('Error fetching artworks by category:', error);
    throw error;
  }
};

// ... rest of the file remains the same

export const fetchArtworksByArtist = async (artist) => {
  try {
    const europeanaResponse = await axios.get(EUROPEANA_BASE_URL, {
      params: {
        query: artist,
        wskey: EUROPEANA_API_KEY,
        rows: 50,
        profile: 'rich',
      },
    });
    const europeanaItems = europeanaResponse.data.items.map(item => ({
      id: item.id,
      title: item.title[0],
      creator: item.dcCreator ? item.dcCreator[0] : 'Unknown',
      imageUrl: item.edmPreview ? item.edmPreview[0] : null,
      date: item.year ? item.year[0] : 'Unknown',
      description: item.dcDescription ? item.dcDescription[0] : 'No description available'
    }));

    const clevelandResponse = await axios.get(`${CLEVELAND_API_BASE_URL}`, {
      params: {
        artists: artist,
        limit: 50,
      },
    });
    const clevelandItems = clevelandResponse.data.data.map(item => ({
      id: item.id,
      title: item.title,
      creator: item.creators && item.creators.length > 0 ? item.creators[0].description : 'Unknown',
      imageUrl: item.images && item.images.web ? item.images.web.url : null,
      date: item.creation_date || 'Unknown',
      description: item.wall_description || item.description || 'No description available'
    }));

    const europeanaArtworks = filterAndMapArtworks(europeanaItems, 'Europeana');
    const clevelandArtworks = filterAndMapArtworks(clevelandItems, 'Cleveland');

    return [...europeanaArtworks, ...clevelandArtworks];
  } catch (error) {
    console.error('Error fetching artworks by artist:', error);
    return [];
  }
};

export const fetchArtDetails = async (id) => {
  try {
    const isCleveland = Number.isInteger(Number(id));
    if (isCleveland) {
      const response = await axios.get(`${CLEVELAND_API_BASE_URL}${id}`);
      const artwork = response?.data?.data;
      if (!artwork) {
        throw new Error('No artwork data found in Cleveland Museum of Art API');
      }
      return {
        title: artwork.title,
        artist: artwork.creators && artwork.creators.length > 0 ? artwork.creators[0].description : null,
        description: artwork.wall_description || artwork.description || null,
        imageUrl: artwork.images && artwork.images.web ? artwork.images.web.url : null,
        date: artwork.creation_date || null,
        medium: artwork.technique || null,
      };
    } else {
      const response = await axios.get(`https://api.europeana.eu/record/${id}.json`, {
        params: { wskey: EUROPEANA_API_KEY },
      });
      const item = response?.data?.object;
      if (!item) {
        throw new Error('No artwork data found in Europeana API');
      }
      return {
        title: item.title ? item.title[0] : null,
        artist: item.dcCreator ? item.dcCreator[0] : null,
        description: item.dcDescription ? item.dcDescription[0] : null,
        imageUrl: item.edmIsShownBy ? item.edmIsShownBy[0] : null,
        date: item.year ? item.year[0] : null,
        medium: item.dcFormat ? item.dcFormat[0] : null,
      };
    }
  } catch (error) {
    console.error('Error fetching artwork details:', error.message || error);
    return null;
  }
};