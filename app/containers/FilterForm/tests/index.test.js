/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import sinon from 'sinon';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';

import configureStore from '../../../store';

import { FilterForm } from '../index';


// mapStateToProps - https://github.com/reactjs/redux/issues/1534
describe('<FilterForm />', () => {
  let renderComponent;
  let store;
  const props = {
    sentence: 'ohio',
    trend: fromJS({
      active: fromJS({
        name: 'Popular',
        voteAverageMin: null,
        voteAverageMax: null,
        voteCountMin: 300,
        voteCountMax: null,
      }),
      list: fromJS([
        fromJS({
          name: 'Highly rated',
          voteAverageMin: 6.5,
          voteAverageMax: 10,
          voteCountMin: 70,
          voteCountMax: null,
        }),
        fromJS({
          name: 'Popular',
          voteAverageMin: null,
          voteAverageMax: null,
          voteCountMin: 300,
          voteCountMax: null,
        }),
      ]),
    }),
    decade: fromJS({
      active: fromJS({
        name: '1970s',
        dateMin: '1970-01-01',
        dateMax: '1979-01-01',
      }),
      list: fromJS([
        fromJS({
          name: '1970s',
          dateMin: '1970-01-01',
          dateMax: '1979-01-01',
        }),
        fromJS({
          name: '1960s',
          dateMin: '1960-01-01',
          dateMax: '1969-01-01',
        }),
      ]),
    }),
    genre: fromJS({
      active: fromJS({
        id: 16,
        name: 'Animation',
      }),
      list: fromJS([
        fromJS({
          id: 16,
          name: 'Animation',
        }),
        fromJS({
          id: 18,
          name: 'Action',
        }),
      ]),
    }),
  };
  beforeEach(() => {
    store = configureStore({}, browserHistory);
    renderComponent = shallow(
      <Provider store={store}>
        <FilterForm {...props} />
      </Provider>
      ).shallow();
  });

  it('It should contain SelectList Component', () => {
    const expected = renderComponent.find('SelectList');
    expect(expected).to.have.length(1);
  });

  // It should render decade, sentence, type select inputs
  // It should render search button
});

