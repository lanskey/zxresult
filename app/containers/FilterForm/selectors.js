/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { createSelector, createStructuredSelector } from 'reselect';

/**
 * @desc Selects filter from store
 */
const filtersDomain = () => state => state.get('filters').toJS();


/**
 * @desc Picks all filters
 */
const selectFilters = () => {
  const filterSelector = createStructuredSelector({
    genre: ({ genre }) => genre,
    trend: ({ trend }) => trend,
    range: ({ range }) => range,
    decade: ({ decade }) => decade,
  });
  return createSelector(
    filtersDomain(),
    filterSelector,
    ({ genre, trend, range, decade }) => ({ genre, trend, range, decade })
  );
};

export {
  filtersDomain,
  selectFilters,
};

