import React from 'react';
import Header from '../component/Header';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <p> Album </p>
      </div>
    );
  }
}

export default Album;