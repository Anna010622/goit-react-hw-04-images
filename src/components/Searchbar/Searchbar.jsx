import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ searchValue }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const value = e.target.children[1].value.trim().toLowerCase();
    if (value === '') {
      toast.warn('Please enter keyword', { autoClose: 3000 });

      return;
    }
    searchValue(value);
    e.target.reset();
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <AiOutlineSearch />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  searchValue: PropTypes.func.isRequired,
};
