import { expect } from 'chai';
import appReducer from '../reducer';
import { fromJS } from 'immutable';
import {
  genreUpdate,
  moodUpdate,
  resultSet,
} from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      isLogged: true,
      filters: fromJS({
        sentence: 'Get a list of TV show ids that have been edited.',
        mood: 'Funny',
        trend: 'Classical',
        decade: '90s',
        genre: 'action',
        genreList: [
          {
            id: 28,
            name: 'Action',
          },
          {
            id: 12,
            name: 'Adventure',
          },
          {
            id: 16,
            name: 'Animation',
          },
          {
            id: 35,
            name: 'Comedy',
          },
          {
            id: 80,
            name: 'Crime',
          },
          {
            id: 99,
            name: 'Documentary',
          },
          {
            id: 18,
            name: 'Drama',
          },
          {
            id: 10751,
            name: 'Family',
          },
          {
            id: 14,
            name: 'Fantasy',
          },
          {
            id: 10769,
            name: 'Foreign',
          },
          {
            id: 36,
            name: 'History',
          },
          {
            id: 27,
            name: 'Horror',
          },
          {
            id: 10402,
            name: 'Music',
          },
          {
            id: 9648,
            name: 'Mystery',
          },
          {
            id: 10749,
            name: 'Romance',
          },
          {
            id: 878,
            name: 'Science Fiction',
          },
          {
            id: 10770,
            name: 'TV Movie',
          },
          {
            id: 53,
            name: 'Thriller',
          },
          {
            id: 10752,
            name: 'War',
          },
          {
            id: 37,
            name: 'Western',
          },
        ],
      }),
      result: fromJS({
        movie: null,
        movies: null,
      }),
      user: {
        name: 'Emanuel',
        avatar: 'https://avatars0.githubusercontent.com/u/5350669?v=3&s=460',
        watchList: [
          {
            name: 'Titanic',
            decade: '90s',
            rating: 86,
            popularity: 90,
          },
        ],
      },
    });
  });
  it('returns the initial state', () => {
    const excepted = state;
    expect(appReducer(undefined, {})).to.eql(excepted);
  });

  it('should handle the moodUpdate action', () => {
    const fixture = 'eslotwinski';
    const expectedResult = state.setIn(['filters', 'mood'], fixture);
    expect(appReducer(state, moodUpdate(fixture))).to.eql(expectedResult);
  });

  it('should handle the moodUpdate action', () => {
    const fixture = 'sad';
    const expectedResult = state.setIn(['filters', 'mood'], fixture);
    expect(appReducer(state, moodUpdate(fixture))).to.eql(expectedResult);
  });

  it('should handle the genreUpdate action', () => {
    const fixture = 'drama';
    const expectedResult = state.setIn(['filters', 'genre'], fixture);
    expect(appReducer(state, genreUpdate(fixture))).to.eql(expectedResult);
  });

  it('should handle the resultSet action', () => {
    const single = {};
    const multiple = [{}, {}];
    const expectedResult = state
      .setIn(['result', 'movie'], single)
      .setIn(['result', 'movies'], multiple);

    expect(appReducer(state, resultSet(multiple, single))).to.eql(expectedResult);
  });

});
