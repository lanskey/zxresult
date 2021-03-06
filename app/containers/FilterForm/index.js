/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import classNames from 'classnames';
import { connect } from 'react-redux';
import { capitalize } from 'lodash';
import React, { PropTypes as ptype, Component } from 'react';

import RequestMovie from 'containers/RequestMovie';
import SelectList from 'components/general/SelectList';
import MobileFilterForm from 'components/special/MobileFilterForm';

import styles from './styles.css';
import { mapDispatch, mapState } from './mapProps';


/**
 * FilterForm
 * @desc Creates filters form, where user is able to get results with data he set. Each time when some filter change,
 * it will dispatch an action and get possible range of results basing on current set of filters.
 *
 * @method componentWillMount - Get genre list directly from API.
 * @method onChangeSelectHandler - Dispatch an appropriate action when specific selector will change it's value.
 * @method onSubmitHandler - Prevent from sending form & refresh the page
 *
 * @attr orientation - Handles horizontal, vertical orientation of this form by applying appropriate css class.
 */
export class FilterForm extends Component {
  state = {
    formHeight: null,
  };

  componentWillMount() {
    // Get Genre list (by dispatching an action)
    const genreList = this.props.genre.list;
    if (genreList <= 0) {
      this.props.getGenreList();
      this.props.getUpdateFilters();
    }
  }

  componentDidMount() {
    if (this.state.formHeight === null) {
      this.getFormHeight();
      window.addEventListener('resize', this.getFormHeight.bind(this));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getFormHeight);
  }

  onChangeSelectHandler = (type, wantUpdate = true) => {
    const which = `onChange${capitalize(type)}`;
    return (value) => {
      this.props[which](value);
      if (wantUpdate) this.props.getUpdateFilters();
    };
  };

  onInputChangeKeywordHandler = () => (value) => {
    if (value.length >= 3) {
      this.props.inputChangeKeyword(value);
    }
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.onSubmitForm();
  };

  getFormHeight = () => {
    const height = this.form ? this.form.clientHeight : null;
    if (height && height > 0 && height !== this.state.formHeight) this.setState({ formHeight: height });
  };

  renderForm = (selectListItems) => {
    const { orientation, range } = this.props;
    return (
      <form ref={(form) => { this.form = form; }} onSubmit={this.onSubmitHandler} className={classNames(styles.form, styles[orientation])}>
        <div className={styles.filters} >
          <SelectList items={selectListItems} orientation={orientation} />
          <RequestMovie range={range.results} fullWidth={orientation !== 'horizontal'} />
        </div>
      </form>
    );
  };

  render() {
    const {
      keyword,
      genre,
      decade,
      trend,
      orientation,
      mobileAdopt } = this.props;

    const selectListItems = [
      {
        value: keyword.active ? keyword.active.query || keyword.active.name : '',
        options: keyword.list,
        labelKey: 'name',
        isLoading: keyword.list === 0,
        onInputChange: this.onInputChangeKeywordHandler(),
        onChange: this.onChangeSelectHandler('Keyword'),
        title: 'Keyword',
        theme: 'sup',
        fullWidth: orientation !== 'horizontal',
      },
      {
        value: genre.active,
        options: genre.list,
        isLoading: genre.list <= 0,
        onChange: this.onChangeSelectHandler('Genre'),
        title: 'Genres',
      },
      {
        value: decade.active,
        options: decade.list,
        onChange: this.onChangeSelectHandler('Decade'),
        title: 'Decade',
      },
      {
        value: trend.active,
        options: trend.list,
        isLoading: false,
        onChange: this.onChangeSelectHandler('Trend'),
        title: 'Trend',
        fullWidth: orientation !== 'horizontal',
      },
    ];

    if (mobileAdopt) {
      return (
        <MobileFilterForm formHeight={this.state.formHeight}>
          {this.renderForm(selectListItems)}
        </MobileFilterForm>
      );
    }

    return this.renderForm(selectListItems);
  }
}

FilterForm.propTypes = {
  genre: ptype.object,
  trend: ptype.object,
  range: ptype.object,
  decade: ptype.object,
  keyword: ptype.object,
  mobileAdopt: ptype.bool,
  onSubmitForm: ptype.func,
  getGenreList: ptype.func,
  orientation: ptype.string,
  getUpdateFilters: ptype.func,
  inputChangeKeyword: ptype.func,
};

const mapStateToProps = mapState();

const mapDispatchToProps = (dispatch) => mapDispatch(dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm);
