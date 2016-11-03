/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { LOCATION_CHANGE } from 'react-router-redux';
import { take, call, put, cancel, fork } from 'redux-saga/effects';

import { callApi } from 'mechanisms/index';

import { updateFilterGenre, updateFilters } from './actions';
import { FILTER_GENRE_LIST, UPDATE_FILTERS } from './constants';


/**
 * getGenreList
 * @desc Gets current genre list from API using xhr request
 */
export function* getGenreList() {
  const { data } = yield call(callApi, '/genre/movie/list', {}, false);
  try {
    yield put(updateFilterGenre.list.success(data.genres));
  }
  catch (err) {
    yield put(updateFilterGenre.list.failure(err));
  }
}


/**
 * handleUpdateFilters
 * @desc Updates filters and current range of using API call,
 * 1000 page is mostly empty that's why we hardcoded it to call only on that page
 * @TODO: Remove log, it appears in tests results
 */
export function* handleUpdateFilters() {
  const { data } = yield call(callApi, '/discover/movie', { page: 1000 });
  try {
    // console.log(`\nTotal pages: ${data.total_pages}`, '\n', `Total results: ${data.total_results}`);
    yield put(updateFilters.success(data.total_pages, data.total_results));
  }
  catch (err) {
    yield put(updateFilters.failure(err));
  }
}


// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \

//   _______ _______ _______ _______ _______ _______ _______ _______
//   |\     /|\     /|\     /|\     /|\     /|\     /|\     /|\     /|
//   | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ |
//   | |   | | |   | | |   | | |   | | |   | | |   | | |   | | |   | |
//   | |W  | | |A  | | |T  | | |C  | | |H  | | |E  | | |R  | | |S  | |
//   | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ |
//   |/_____\|/_____\|/_____\|/_____\|/_____\|/_____\|/_____\|/_____\|

//    ──▒▒▒▒▒─────▒▒▒▒▒─────▒▒▒▒▒─────▒▒▒▒▒─────▒▒▒▒▒──────▄████▄─────
//    ─▒─▄▒─▄▒───▒─▄▒─▄▒───▒─▄▒─▄▒───▒─▄▒─▄▒───▒─▄▒─▄▒────███▄█▀──────
//    ─▒▒▒▒▒▒▒───▒▒▒▒▒▒▒───▒▒▒▒▒▒▒───▒▒▒▒▒▒▒───▒▒▒▒▒▒▒───▐████──█──█──
//    ─▒▒▒▒▒▒▒───▒▒▒▒▒▒▒───▒▒▒▒▒▒▒───▒▒▒▒▒▒▒───▒▒▒▒▒▒▒────█████▄──────
//    ─▒─▒─▒─▒───▒─▒─▒─▒───▒─▒─▒─▒───▒─▒─▒─▒───▒─▒─▒─▒─────▀████▀─────

// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \


export function* getUpdateFiltersWatcher() {
  while (yield take(UPDATE_FILTERS.REQUEST)) {
    yield call(handleUpdateFilters);
  }
}

export function* getGenresListWatcher() {
  while (yield take(FILTER_GENRE_LIST.REQUEST)) {
    yield call(getGenreList);
  }
}


export function* getMovieSagas() {
  const getGenresList = yield fork(getGenresListWatcher);
  const getUpdateFilters = yield fork(getUpdateFiltersWatcher);

  // Suspend execution until location change
  // TODO: Change this to custom action, when the user request new 'result' or something like this.
  // The main reason of that is to not rely on LOCATION_CHANGE event because we 'actually' dose not change the location on the result sub-page
  // we just get new data.
  yield take(LOCATION_CHANGE);
  yield cancel(getUpdateFilters);
  yield cancel(getGenresList);
}

export default [
  getMovieSagas,
];
