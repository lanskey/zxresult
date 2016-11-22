/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import _ from 'lodash';
import React, { PropTypes as ptype } from 'react';

import Section from 'components/general/Section';
import MovieSingleCrew from 'components/special/MovieSingleCrew';

/**
 * renderSingle
 * @desc Render Single Crew Component packed with section basing on provided data.
 */
const renderSingle = (item, index=0) => {
  const {
    sectionSize,
    ...rest } = item;
  console.log(item)
  return (
    <Section size={sectionSize} key={index}>
      {<MovieSingleCrew {...rest} />}
    </Section>
  );
};


/**
 * MovieCrewList
 * @desc Check if there is at least one CrewItem, if yes map & render our single Crew mate.
 */
function MovieCrewList({ items }) {
  if (!items) {
    return (
      <div>
        Loading
      </div>
    );
  }

  const director = items.crew.filter((item) => item.job === 'Director')[0];
  director.sectionSize = '1/3';

  const limitedCast = items.cast.slice(0, 2);

  return (
    <div>
      {renderSingle(director)}
      {limitedCast.map((item, index) => renderSingle(item, index))}
    </div>
  );
}

MovieCrewList.propTypes = {
  items: ptype.object,
};

export default MovieCrewList;
