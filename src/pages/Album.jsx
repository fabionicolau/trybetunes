import React from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../component/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    this.setState({
      musics: data,
    });
  }

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {musics.map((element, index) => index === 0 && (
          <div key={ index }>
            <h2 data-testid="artist-name">{element.artistName}</h2>
            <h3 data-testid="album-name">{element.collectionName}</h3>
          </div>
        ))}

        {musics.map((element, index) => index !== 0 && (
          <MusicCard key={ element.trackNumber } musics={ element } />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
