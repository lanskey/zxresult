/**
*
* HeartRate
*
*/

import React from 'react';
import { times } from 'lodash';
import styles from './styles.css';
import classNames from 'classnames';
import { IoHeart } from 'react-icons/lib/io/';
import Section from 'components/general/Section';

class MovieHeartRate extends React.Component {
  renderHeart = (voteAverage) => {
    const voteRange = 5;
    const average = voteAverage / 2; // voteAverage contains scale 1-10, so we divide by half to make it 1-5
    const filled = Math.round(average);
    const unfilled = Math.ceil(voteRange - filled);

    function renderHearts(type) {
      return (times(type === 'unfilled' ? unfilled : filled, (index) => (
        <IoHeart size={32} key={index} className={type === 'unfilled' ? classNames(styles.heartRate, styles.unfilled) : styles.icon} />
      )));
    }
    return (
      <div>
        {renderHearts()}
        {renderHearts('unfilled')}
      </div>
    );
  };

  render() {
    const {
      votes: {
        voteCount,
        voteAverage,
      },
      sectionSize = '1/1',
    } = this.props;
    const title = 'Rate';
    const errMsg = 'Rating isn\'t available';
    return (
      <Section size={sectionSize} title={title} className={styles.heartRate}>
        {voteCount ? this.renderHeart(voteAverage) : <p>{errMsg}</p>}
      </Section>
    );
  }
}

MovieHeartRate.propTypes = {
  votes: React.PropTypes.object,
  sectionSize: React.PropTypes.string,
};

export default MovieHeartRate;
