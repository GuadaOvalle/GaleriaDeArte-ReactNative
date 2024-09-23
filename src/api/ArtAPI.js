// src/api/ArtAPI.js
import axios from 'axios';

// Europeana API Config
const EUROPEANA_API_KEY = 'haltivaniv';
const EUROPEANA_BASE_URL = 'https://api.europeana.eu/record/v2/search.json';

// Cleveland Museum of Art API Config
const CLEVELAND_API_BASE_URL = 'https://openaccess-api.clevelandart.org/api/artworks/';

// Fetch details for a specific artwork by ID
export const fetchArtDetails = async (id) => {
  try {
    const isCleveland = Number.isInteger(Number(id)); // Asume que los IDs numéricos son de Cleveland
    if (isCleveland) {
      // Petición a Cleveland Museum of Art API
      const response = await axios.get(`${CLEVELAND_API_BASE_URL}${id}`);
      const artwork = response?.data?.data; // Verifica que los datos existan
      if (!artwork) {
        throw new Error('No artwork data found in Cleveland Museum of Art API');
      }
      return {
        title: artwork.title || 'Unknown Title',
        artist: artwork.creators && artwork.creators.length > 0
          ? artwork.creators[0].description
          : 'Unknown Artist',
        description: artwork.wall_description || 'No description available',
      };
    } else {
      // Petición a Europeana API
      const response = await axios.get(`https://api.europeana.eu/record/${id}.json`, {
        params: { wskey: EUROPEANA_API_KEY },
      });
      const item = response?.data?.object; // Verifica que los datos existan
      if (!item) {
        throw new Error('No artwork data found in Europeana API');
      }
      return {
        title: item.title ? item.title[0] : 'Unknown Title',
        artist: item.dcCreator ? item.dcCreator[0] : 'Unknown Artist',
        description: item.dcDescription ? item.dcDescription[0] : 'No description available',
      };
    }
  } catch (error) {
    console.error('Error fetching artwork details:', error.message || error);
    return null;
  }
};
