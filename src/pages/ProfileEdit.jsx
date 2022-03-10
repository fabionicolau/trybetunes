import React from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../component/Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: false,
      isButtonDisabled: true,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { name, email, description, image } = await getUser();
    this.setState({
      name,
      email,
      image,
      description,
      loading: false,
    });
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

  async handleSubmit() {
    const { name, email, description, image } = this.state;
    const { history: { push } } = this.props;
    await updateUser({
      name,
      email,
      image,
      description,
    });
    push('/profile');
  }

  validate() {
    const { name, email, description, image } = this.state;
    if (name === ''
    || email === ''
    || !email.includes('@')
    || !email.includes('.com')
    || description === ''
    || image === '') {
      this.setState({
        isButtonDisabled: true,
      });
    } else {
      this.setState({
        isButtonDisabled: false,
      });
    }
  }

  render() {
    const {
      name,
      email,
      description,
      image,
      isButtonDisabled,
      loading } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        <h2>Editar perfil</h2>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <input
              data-testid="edit-input-name"
              type="text"
              name="name"
              placeholder="Nome"
              value={ name }
              onChange={ this.handleInput }
            />
            <input
              data-testid="edit-input-email"
              type="email"
              name="email"
              placeholder="email@email.com"
              value={ email }
              onChange={ this.handleInput }
            />
            <textarea
              data-testid="edit-input-description"
              name="description"
              cols="30"
              rows="10"
              placeholder="descrição"
              value={ description }
              onChange={ this.handleInput }
            />
            <input
              data-testid="edit-input-image"
              type="text"
              name="image"
              placeholder="url da imagem"
              value={ image }
              onChange={ this.handleInput }
            />
            <button
              data-testid="edit-button-save"
              type="button"
              disabled={ isButtonDisabled }
              onClick={ this.handleSubmit }
            >
              Salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
