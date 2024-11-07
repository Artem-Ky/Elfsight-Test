import axios from 'axios';

const API_EPISODES_URL = 'https://rickandmortyapi.com/api/episode';

export async function GetEpisodesState(episodes) {
  try {
    const episodesIds = episodes.map((ep) => ep.match(/\d+$/)[0]);
    const response = await axios.get(
      `${API_EPISODES_URL}/${episodesIds.join(',')}`
    );
    const data = response.data;

    if (episodesIds.length === 1) {
      return [[data], null];
    } else {
      return [data, null];
    }
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return [[], error];
  }
}
