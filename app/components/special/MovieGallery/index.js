/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype } from 'react';

import Section from 'components/general/Section';
import ResultImage from 'components/special/MovieResultImage';

import styles from './styles.css';


/**
 * MovieGallery
 * @desc Render Gallery and filters.
 * TODO: Rename MovieGallery
 * TODO: Working Gallery, not just single image.
 * TODO: remove FilterForm container from this Component
 */
function MovieGallery(props) {
  const {
    path,
    alt,
  } = props;

  const altMsg = `${alt} poster`;

  const cs = styles.gallery;
  return (
    <Section className={cs}>
      <ResultImage path={path} alt={altMsg} />
    </Section>
  );
}

MovieGallery.propTypes = {
  path: ptype.string,
  alt: ptype.string,
  orientation: ptype.string,
};

export default MovieGallery;
