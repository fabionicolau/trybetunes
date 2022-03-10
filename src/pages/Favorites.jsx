import React from 'react';
import Header from '../component/Header';
import Loading from '../component/Loading';
import MusicCard from '../component/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const data = await getFavoriteSongs();
    this.setState({
      favorites: data,
      loading: false,
    });
  }

  async componentDidUpdate() {
    const data = await getFavoriteSongs();
    this.setState({
      favorites: data,
    });
  }

  render() {
    const { favorites, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Favorites</p>
        {loading ? (
          <Loading />
        ) : (
          favorites.map((element, index) => (
            <MusicCard key={ index } musics={ element } />
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
