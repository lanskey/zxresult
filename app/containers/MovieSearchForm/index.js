/*
 *
 * MovieSearchForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Button from 'components/Button';
import styles from './styles.css';
import { selectFilters } from 'containers/App/selectors';
import { createStructuredSelector, createSelector } from 'reselect';
import { push } from 'react-router-redux';
import { genreUpdate, filterFormUpdate, genreListSet } from 'containers/App/actions';
var Select = require('react-select');

var options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
];

export class MovieSearchForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  onSubmit = () => {
    this.props.onSubmitForm();
  };

  routeToResult = () => {
    // console.log('siemanko');
    this.openRoute('/result');
  };

  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  handleOnSubmit = (event) => {
    event.stopPropagation();
  };

  selectOnChange = (event) => {
    console.log(event);
  };

  getOptions = (input, callback) => {
    this.props.getGenreList(input);

    callback(null, {
      options: this.props.genreList,
      // CAREFUL! Only set this to true when there are no more options,
      // or more specific queries will not be sent to the server.
      // complete: true
    });

  };

  // TODO: fix the issue with handling onSubmit event
  render() {
    return (
      <div>
        <form action="" onSubmit={this.handleOnSubmit} className={styles.form}>
          <input className="form-control" name="genre" id="genre" value={this.props.genre} onChange={this.props.onChangeGenre} />
          <h2>Genre: {this.props.genre}</h2>
        </form>

        <Button handleRoute={this.props.filterUpdate}>Update filters</Button>
        <Button handleRoute={this.routeToResult}>Search</Button>
        <Select.Async
          name="form-field-name"
          value="siema"
          labelKey="name"
          isLoading={true}
          loadOptions={this.getOptions}
          options=""
        />
      </div>
    );
  }
}

MovieSearchForm.propTypes = {
  filters: React.PropTypes.object,
  changeRoute: React.PropTypes.func,
  children: React.PropTypes.node,
  onSubmitForm: React.PropTypes.func,
  filterFormUpdate: React.PropTypes.func,
  getGenreList: React.PropTypes.func,
  onChangeMood: React.PropTypes.func,
  mood: React.PropTypes.string,
  genre: React.PropTypes.string,
  genreList: React.PropTypes.array,
  onChangeGenre: React.PropTypes.func,
  onChangeSentence: React.PropTypes.func,
  filterUpdate: React.PropTypes.func,
};

const mapStateToProps = createSelector(
  selectFilters(),
  createStructuredSelector({
    mood: (state) => state.mood,
    genre: (state) => state.genre.name,
    genreList: (state) => state.genreList,
  })
);

function mapDispatchToProps(dispatch) {
  return {
    // onChangeMood: (evt) => dispatch(moodUpdate(evt)),
    onChangeGenre: (evt) => dispatch(genreUpdate(evt.target.value)),
    changeRoute: (url) => dispatch(push(url)),
    filterUpdate: () => dispatch(filterFormUpdate()),
    getGenreList: (value) => dispatch(genreListSet(value)),
    onSubmitForm: (evt) => {
      console.log(evt.preventDefault);
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      return false;
      // dispatch(loadRepos());
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchForm);
