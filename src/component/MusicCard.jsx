import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
    this.handleSongs = this.handleSongs.bind(this);
  }

  async handleSongs(event) {
    const { target } = event;
    const { musics } = this.props;
    this.setState({ loading: true });
    if (target.checked) {
      await addSong(musics);
      this.setState({
        checked: true,
      });
    } else if (!target.checked) {
      await removeSong(musics);
      this.setState({
        checked: false,
      });
    }
    this.setState({
      loading: false,
    });
  }

  render() {
    const { musics: { trackName, previewUrl, trackId } } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        {loading
          ? <Loading />
          : (
            <div>
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              <label htmlFor={ trackId }>
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  id={ trackId }
                  type="checkbox"
                  name="checkbox"
                  checked={ checked }
                  onChange={ this.handleSongs }
                />
                Favorita
              </label>
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
