import { take, call, select, put, cancel, fork, race } from 'redux-saga/effects';
import * as CONSTANT from 'containers/App/constants';
import { selectFilters, selectResult } from 'containers/App/selectors';
import { updateMovieResult, updateFilterGenre } from 'containers/App/actions';
import request from 'utils/request';
import Chance from 'chance';
import { LOCATION_CHANGE, push } from 'react-router-redux';


function randomizePage(result) {
  const chance = new Chance();
  const movieList = result.movies;
  // FIXME: Fix the problem with out-of-max range limit, when the genre: music is set, the max possible page is > 893
  // FIXME: Additional problem where the user change the filter(e.g genre) and it's previous value is larger then the max page of current 'range'
  // This also depend on the randomize max page from this function.
  // We can simulate this:
  // 1. search for movie with genre action
  // 2. move back to main page
  // 3. Search for movies from documentary genre
  // 4. the randomize function will generate a number from old range (from a range where the action were active)
  // 5. if you'll be lucky the issue will occur
  const maxPage = movieList !== null ? movieList.total_pages : 1;

  return chance.integer({ min: 1, max: maxPage });
}

// Individual exports for testing
export function* getMovie() {
  const filters = yield select(selectFilters());
  const result = yield select(selectResult());
  const randomPage = randomizePage(result); // http://api.themoviedb.org/3/discover/movie?api_key=9dee05d48efe51f51b15cc63b1fee3f5&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-01-01
  const requestUrl = `${CONSTANT.apiUrl}/discover/movie?${CONSTANT.apiKey}&with_genres=${filters.genre.active.id}&page=${randomPage}&primary_release_date.gte=${filters.decade.active.id}-01-01&primary_release_date.lte=${filters.decade.active.id + 9}-01-01`;
  const movies = yield call(request, requestUrl);
  if (!movies.err && movies.data.results[0]) {
    yield console.info('Update result');
    yield console.info(movies.data.results[0]);
    yield put(updateMovieResult.success(movies.data, movies.data.results[0]));
  } else {
    console.error('---------INFO-------');
    console.log(requestUrl);
    console.log(movies);
    console.error('--------------------');
    yield put(updateMovieResult.failure(movies.err));
  }
}

// Individual exports for testing
export function* getGenreList() {
  // const filters = yield select(selectFilters());
  const requestUrl = `${CONSTANT.apiUrl}/genre/movie/list?${CONSTANT.apiKey}`;
  const genres = yield call(request, requestUrl);
  if (!genres.err) {
    yield put(updateFilterGenre.list.success(genres.data.genres));
  }
}

// Individual exports for testing
export function* getUpdateUrl() {
  // TODO: Refactor
  yield put(push('/result'));
}

/**
 * Watches for FILTER_FORM_UPDATE action and calls handler
 */
export function* getMovieWatcher() {
  while (yield take(CONSTANT.UPDATE_MOVIE_RESULT.REQUEST)) {
    yield call(getMovie);
  }
}

export function* getGenresListWatcher() {
  while (yield take(CONSTANT.UPDATE_FILTER_GENRE_LIST.REQUEST)) {
    yield call(getGenreList);
  }
}

export function* getResultChangeWatcher() {
  while (yield take(CONSTANT.UPDATE_MOVIE_RESULT.SUCCESS)) {
    yield call(getUpdateUrl);
  }
}

export function* getData() {
  // Fork watcher so we can continue execution
  const moviesWatcher = yield fork(getMovieWatcher);
  const updateUrl = yield fork(getResultChangeWatcher);
  const genreListWatcher = yield fork(getGenresListWatcher);

  // Suspend execution until location changes
  // TODO: Change this to custom action, when the user request new 'result' or something like this.
  // The main reason of that is to not rely on LOCATION_CHANGE event becouse we 'actually' dosen't change the location on the result subpage
  // we just get new data.
  yield take(LOCATION_CHANGE);
  yield race([
    cancel(moviesWatcher),
    cancel(updateUrl),
    cancel(genreListWatcher),
  ]);
}

/**
 * Root saga manages watcher lifecycle
 */

// Bootstrap sagas
export default [
  getData,
];
