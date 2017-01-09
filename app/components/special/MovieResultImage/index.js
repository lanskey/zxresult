/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import className from 'classnames';
import React, { PropTypes as ptype } from 'react';

import LazyImage from 'components/general/LazyImage';

import styles from './styles.css';


const MovieResultImage = (props) => {
  const { classNames, isActive = true, path, ...rest } = props;
  return (
    <div className={className(styles.resultImage)}>
      <div className={styles.imageContainer}>
        <LazyImage
          role="presentation"
          path={path}
          isActive={isActive}
          className={className(styles.image, classNames)}
          progressiveLoading
          {...rest}
        />
      </div>
    </div>
  );
};

MovieResultImage.propTypes = {
  onLoad: ptype.func,
  isActive: ptype.bool,
  classNames: ptype.string,
  path: ptype.string.isRequired,
};

export default MovieResultImage;
