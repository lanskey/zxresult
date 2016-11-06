/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype } from 'react';

import Genres from 'components/special/MovieGenres';
import MovieTitle from 'components/special/MovieTitle';
import CrewList from 'components/special/MovieCrewList';
import HeartRate from 'components/special/MovieHeartRate';
import MovieRuntime from 'components/special/MovieRuntime';
import MovieDescription from 'components/special/MovieDescription';

import styles from './styles.css';


/**
 * MovieArticle
 * @desc Wraps Components which represent any movie information.
 */
function MovieArticle({ movie }) {
  // TODO: Crew list fetch
  const crewItems = [
    { image: movie.backdrop_path, alt: 'test', title: 'Director', sectionSize: '1/3' },
    { image: movie.backdrop_path, alt: 'test', title: 'Cast', sectionSize: '1/3' },
    { image: movie.backdrop_path, alt: 'test', title: 'Cast', sectionSize: '1/3' },
  ];
  const votes = {
    voteAverage: movie.vote_average,
    voteCount: movie.vote_average,
  };


  const cs = styles.movieArticle;
  return (
    <article className={cs}>
      <MovieTitle movieTitle={movie.title} />
      <HeartRate votes={votes} />
      <MovieDescription description={movie.overview} limit={160} />
      <MovieRuntime />
      <Genres items={movie.genres} />
      <CrewList items={crewItems} />
    </article>
  );
}

MovieArticle.propTypes = {
  movie: ptype.object.isRequired,
  className: ptype.string,
};

export default MovieArticle;
