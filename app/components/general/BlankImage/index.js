/**
*  Components are imported in specific (scope based) order:
*  1. Node_modules
*  2. Application
*  3. Module
*/

import React, { PropTypes as ptype } from 'react';
import classNames from 'classnames';
import { IoImage } from 'react-icons/lib/io/';

import styles from './styles.css';


/**
* BlankImage
* @desc Renders BlankImage, placeholder for all images which wasn't loaded or were aborted for some reason.
*/
function BlankImage({ className, ...rest }) {
  return (
    <div className={classNames(styles.blankImage, className)} {...rest} >
      <IoImage size={32} />
    </div>
  );
}

BlankImage.propTypes = {
  className: ptype.string,
};

export default BlankImage;
