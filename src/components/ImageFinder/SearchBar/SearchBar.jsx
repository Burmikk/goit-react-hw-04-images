import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import scss from './searchBar.module.scss';

const SearchBar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleInputChange = e => {
    const { value } = e.target;
    setImageName(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(imageName);

    setImageName('');
  };

  return (
    <header className={scss.header}>
      <form className={scss.form} onSubmit={handleSubmit}>
        <input
          className={scss.input}
          type="text"
          autoComplete="on"
          placeholder="Search images and photos"
          value={imageName}
          onChange={handleInputChange}
        />
        <button className={scss.btn} type="submit">
          <BsSearch />
        </button>
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchBar;
