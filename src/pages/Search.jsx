import React from 'react';
import Header from '../component/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      isSearchButtonDisabled: true,
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    const { value, name } = event.target;
    this.setState(
      {
        [name]: value,
      },
      () => this.validate(),
    );
  }

  validate() {
    const { searchInput } = this.state;
    const searchMinCharacters = 2;

    if (searchInput.length >= searchMinCharacters) {
      this.setState({
        isSearchButtonDisabled: false,
      });
    } else {
      this.setState({
        isSearchButtonDisabled: true,
      });
    }
  }

  render() {
    const { searchInput, isSearchButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <p>Search</p>
        <input
          data-testid="search-artist-input"
          type="text"
          name="searchInput"
          value={ searchInput }
          onChange={ this.handleInput }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ isSearchButtonDisabled }
        >
          Pesquisar
        </button>

      </div>
    );
  }
}

export default Search;
