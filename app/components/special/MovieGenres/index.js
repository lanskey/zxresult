/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { times, capitalize, camelCase } from 'lodash';
import React, { PropTypes as ptype } from 'react';

import Section from 'components/general/Section';
import GenreIcons from 'components/special/MovieGenreIcons';

import styles from './styles.css';


/**
 * renderSingle
 * @desc Render icons list
 */
const single = (items, index) => (
  <li key={index} className={styles.item}>
    <GenreIcons type={camelCase(items[index])} />
    <h6 className={styles.label}>
      {capitalize(items[index])}
    </h6>
  </li>
);


/**
 * renderMultiple
 * @desc Render icons list
 */
const multiple = (items) => (
  times(items.length, (index) => single(items, index))
);


/**
 * MovieGenres
 * @desc Render Single Select Component, based on it's props.
 * @param { Array } items - What icons our movies contains.
 * @param { String } sectionSize - How much space this section will take, default 1/2 but it
 * might be changed directly in the parent component.
 */
function MovieGenres({ sectionSize = '1/2', items = [] }) {
  return (
    <Section title={'Genres'} size={sectionSize}>
      <ul className={styles.genres}>
        {multiple(items)}
      </ul>
    </Section>
  );
}

MovieGenres.propTypes = {
  items: ptype.array,
  sectionSize: ptype.string,
};

export default MovieGenres;
