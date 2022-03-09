import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import { getUser } from '../services/userAPI';
import Loading from '../component/Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { name, email, description, image } = await getUser();
    this.setState({
      name,
      email,
      description,
      image,
      loading: false,
    });
  }

  render() {
    const { name, email, description, image, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <p>Profile</p>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div>
              <img
                data-testid="profile-image"
                src={ image }
                alt={ `Imagem do usuário: ${name}` }
              />
              <p>{name}</p>
              <p>{email}</p>
              <p>{description}</p>
            </div>
            <div>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
