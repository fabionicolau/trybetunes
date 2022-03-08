import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../component/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      searchInput: '',
      isSearchButtonDisabled: true,
      artists: [],
      searchArtist: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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

  async handleSearch() {
    const { searchInput } = this.state;
    this.setState({ loading: true });
    const data = await searchAlbumsAPI(searchInput);
    this.setState({
      searchArtist: searchInput,
      artists: data,
      loading: false,
      searchInput: '',
    });
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
    const {
      searchInput,
      isSearchButtonDisabled,
      searchArtist,
      artists,
      loading,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <p>Search</p>
        {loading ? (
          <Loading />
        ) : (
          <div>
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
              onClick={ this.handleSearch }
            >
              Pesquisar
            </button>
          </div>
        )}

        {<h3>{`Resultado de álbuns de: ${searchArtist}`}</h3>}

        {artists.length === 0
          ? 'Nenhum álbum foi encontrado'
          : artists.map((element) => (
            <div key={ element.collectionId }>
              <Link
                data-testid={ `link-to-album-${element.collectionId}` }
                to={ `/album/${element.collectionId}` }
              >
                <img
                  src={ element.artworkUrl100 }
                  alt={ `Imagem do Álbum: ${element.collectionName} ` }
                />
                <p>{element.collectionName}</p>
                <p>{element.artistName}</p>
              </Link>
            </div>
          ))}
      </div>
    );
  }
}

export default Search;
