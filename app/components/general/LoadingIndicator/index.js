/**
*  Components are imported in specific (scope based) order:
*  1. Node_modules
*  2. Application
*  3. Module
*/

import React, { PropTypes as ptype } from 'react';
import classNames from 'classnames';

import styles from './styles.css';


const LoadingIndicator = ({ isDisabled, className }) => {
  const cs = classNames(
    styles.ball,
    isDisabled ? styles.isDisabled : null,
    className,
  );
  return (
    <div className={cs}></div>
  );
};

LoadingIndicator.propTypes = {
  className: ptype.string,
  isDisabled: ptype.bool,
};

export default LoadingIndicator;
