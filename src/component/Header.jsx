import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userLogin: '',
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { name } = await getUser();
    this.setState({ loading: false, userLogin: name });
  }

  render() {
    const { userLogin, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? (
          <Loading />
        ) : (
          <p data-testid="header-user-name">{userLogin}</p>
        )}

        <Link data-testid="link-to-search" to="/search">
          Search
        </Link>
        <Link data-testid="link-to-favorites" to="/favorites">
          Favorites
        </Link>
        <Link data-testid="link-to-profile" to="/profile">
          Profile
        </Link>
      </header>
    );
  }
}

export default Header;
