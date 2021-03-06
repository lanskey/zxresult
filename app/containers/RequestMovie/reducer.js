/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { fromJS } from 'immutable';

import { UPDATE_FILTERS } from 'containers/FilterForm/constants';

import {
  DETAILS,
  ANALYSE_MOVIE,
  UPDATE_MOVIE_RESULT,
  UPDATE_SINGLE_MOVIE } from './constants';


const initialState = fromJS({
  active: fromJS(null),
  notSorted: fromJS([]), // Freshly downloaded, before moved to pending need to be analysed.
  pending: fromJS([]),
  cache: fromJS([]),
  noMoreResults: false,
  isFetching: false,
});

function requestMovieReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_MOVIE_RESULT.REQUEST:
      return state
        .setIn(['isFetching'], true);
    case UPDATE_MOVIE_RESULT.SUCCESS:
      return state
        .setIn(['active'], fromJS(action.active));
    case UPDATE_MOVIE_RESULT.FAILURE:
      return state
        .setIn(['noMoreResults'], true)
        .setIn(['isFetching'], false);
    case ANALYSE_MOVIE.REQUEST:
      return state
        .setIn(['notSorted'], fromJS(action.notSorted));
    case ANALYSE_MOVIE.SUCCESS:
      return state
        .setIn(['pending'], action.pending);
    case ANALYSE_MOVIE.FAILURE:
      return state
        .setIn(['isFetching'], false);
    case UPDATE_SINGLE_MOVIE.SUCCESS:
      return state
        .setIn(['pending'], fromJS(action.removePending))
        .setIn(['isFetching'], false);
    case DETAILS.SUCCESS:
      return state
        .setIn(['active'], fromJS(action.updatedActive));
    case UPDATE_FILTERS.REQUEST:
      return state
        .setIn(['isFetching'], true);
    case UPDATE_FILTERS.SUCCESS:
      return state
        .setIn(['noMoreResults'], false)
        .setIn(['pending'], fromJS([]))
        .setIn(['isFetching'], false);
    default:
      return state;
  }
}

export default requestMovieReducer;
