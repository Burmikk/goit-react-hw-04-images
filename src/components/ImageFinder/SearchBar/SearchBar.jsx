import { Component } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import scss from './searchBar.module.scss';

class SearchBar extends Component {
  state = {
    imageName: '',
  };

  handleInputChange = e => {
    const { value } = e.target;
    this.setState({ imageName: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.imageName);

    this.reset();
  };

  reset() {
    this.setState({ imageName: '' });
  }

  render() {
    return (
      <header className={scss.header}>
        <form className={scss.form} onSubmit={this.handleSubmit}>
          <input
            className={scss.input}
            type="text"
            autoComplete="on"
            placeholder="Search images and photos"
            value={this.state.imageName}
            onChange={this.handleInputChange}
          />
          <button className={scss.btn} type="submit">
            <BsSearch />
          </button>
        </form>
      </header>
    );
  }
}
SearchBar.propTypes = {
  close: PropTypes.func,
};

export default SearchBar;
