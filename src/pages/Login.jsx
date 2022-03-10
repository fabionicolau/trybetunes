import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../component/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      login: '',
      loading: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    }, () => this.validate());
  }

  async handleSubmit() {
    const { login } = this.state;
    const { history: { push } } = this.props;
    this.setState({ loading: true });
    await createUser({ name: login });
    this.setState({ loading: false });
    push('/search');
  }

  validate() {
    const { login } = this.state;
    const userMinCharacters = 3;

    if (login.length >= userMinCharacters) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  render() {
    const { login, isDisabled, loading } = this.state;

    return (
      <div data-testid="page-login">
        {loading
          ? <Loading />
          : (
            <form>
              <input
                data-testid="login-name-input"
                type="text"
                name="login"
                value={ login }
                onChange={ this.handleInput }
              />
              <button
                data-testid="login-submit-button"
                type="button"
                disabled={ isDisabled }
                onClick={ this.handleSubmit }
              >
                Entrar

              </button>
            </form>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
