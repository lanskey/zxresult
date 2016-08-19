/*
 *
 * Movie-search-form constants
 *
 */
import { createRequestTypes } from 'utils/hooks';

// DECADE CONSTANTS
const UPDATE_FILTER_DECADE = createRequestTypes('app/App/UPDATE_FILTER_DECADE');
const UPDATE_FILTER_DECADE_LIST = createRequestTypes('app/App/UPDATE_FILTER_DECADE_LIST');

// TREND CONSTANTS
const UPDATE_FILTER_TREND = createRequestTypes('app/App/UPDATE_FILTER_TREND');
const UPDATE_FILTER_TREND_LIST = createRequestTypes('app/App/UPDATE_FILTER_TREND_LIST');

// GENRE CONSTANTS
const UPDATE_FILTER_GENRE = createRequestTypes('app/App/UPDATE_FILTER_GENRE');
const UPDATE_FILTER_GENRE_LIST = createRequestTypes('app/App/UPDATE_FILTER_GENRE_LIST');

// RESULT SET
const UPDATE_MOVIE_RESULT = createRequestTypes('app/App/UPDATE_MOVIE_RESULT');

// Update url SET
const UPDATE_URL = createRequestTypes('app/App/UPDATE_URL');

// Update Result filters
const UPDATE_FILTERS = createRequestTypes('app/App/UPDATE_FILTERS');

// API
const apiUrl = 'http://api.themoviedb.org/3';
const apiKey = 'api_key=9dee05d48efe51f51b15cc63b1fee3f5';

export {
  UPDATE_FILTER_DECADE,
  UPDATE_FILTER_DECADE_LIST,
  UPDATE_FILTER_TREND,
  UPDATE_FILTER_TREND_LIST,
  UPDATE_FILTER_GENRE,
  UPDATE_FILTER_GENRE_LIST,
  UPDATE_MOVIE_RESULT,
  UPDATE_URL,
  UPDATE_FILTERS,
  apiUrl,
  apiKey,
};
