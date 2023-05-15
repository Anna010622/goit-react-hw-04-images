import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ handleSubmit }) => {
  const onSubmit = e => {
    e.preventDefault();
    const value = e.target.children[1].value.trim().toLowerCase();
    if (value === '') {
      toast.warn('Please enter keyword', { autoClose: 3000 });

      return;
    }
    handleSubmit(value);
  };

  return (
    <Header>
      <SearchForm onSubmit={onSubmit}>
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
  handleSubmit: PropTypes.func.isRequired,
};
