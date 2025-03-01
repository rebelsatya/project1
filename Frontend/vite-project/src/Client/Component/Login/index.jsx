import { Component } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessApp from './SuccessAnimation.jsx';
import { SignJWT } from 'jose';

import './index.css';

const apiStatusCheck = {
  apilogin: 'Login',
  apiregister: 'Register',
  apisuccess: 'Success',
};

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    message: '',
    status: 'Login',
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  renderUserNameInput = () => {
    const { username } = this.state;
    return (
      <>
        <label htmlFor="username" className="heading-input-login">
          USERNAME
        </label>
        <input
          type="text"
          className="input1"
          id="username"
          placeholder="Enter username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    );
  };



  //  onSubmitSuccess = (d) => {
  //   const navigate = useNavigate();
 
  //   Cookies.set('jwt_token', d, {
  //     expires: 30,
  //   });
  //   navigate('/'); // Use navigate instead of history.replace
  // };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg, username: '', password: '' });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const secret = new TextEncoder().encode('your_secret_key');  // Encode the secret key

    
    try {
      
      const response = await axios.post('https://jobby-app-api.vercel.app/login', userDetails);
      this.setState({ message: response.data.message });
      const token = await new SignJWT({ userDetails })
      .setProtectedHeader({ alg: 'HS256' })
      .sign(secret);
     
      const url = 'https://apis.ccbp.in/login'
      const options = {
        method: 'POST',
        body: JSON.stringify({
          "username": "rahul",
          "password": "rahul@2021"
        }),
      }
      const access_response = await fetch(url, options)
      const data = await access_response.json()
      Cookies.set('User_access', data.jwt_token, {
        expires: 30,
      })
    Cookies.set('jwt_token', token, {
      expires: 30,
    });
    const navigate = useNavigate();
    navigate('/');
     
    console.log('Token:', token);
      console.log(response.data.message);
      console.log(response.data.ok);
      console.log({ username, password });
    
      
     
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : 'Unknown error');
      console.log("s")
      this.setState({
        message: error.response ? error.response.data.message : 'Login failed',showSubmitError:true
      });
    }
  };

  changeCheckLogin = () => {
    this.setState({ status: apiStatusCheck.apilogin });
  };

  changeCheckRegister = () => {
    this.setState({ status: apiStatusCheck.apiregister });
  };

  registerFormUserAndPassword = async () => {
    const { username, password } = this.state;
    const userDetails = { username, password };

    try {
      const response = await axios.post('https://jobby-app-api.vercel.app/register', userDetails);
      this.setState({ message: response.data.message });
      console.log(response.data.message);
      console.log({ username, password });
      this.setState({ status: apiStatusCheck.apisuccess });
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : 'Unknown error');
      this.setState({
        message: error.response ? error.response.data.message : 'Register failed',
      });
    }
  };

  renderPassWordInput = () => {
    const { password } = this.state;
    return (
      <>
        <label htmlFor="password" className="heading-input-login">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input1"
          placeholder="Enter password"
          onChange={this.onChangePassword}
          value={password}
        />
      </>
    );
  };

  apiStatusCheck = () => {
    const { status } = this.state;
    const { showSubmitError, message } = this.state;
    switch (status) {
      case apiStatusCheck.apilogin:
        return (
          <>
            <div className="input-container">{this.renderUserNameInput()}</div>
            <div className="input-container">{this.renderPassWordInput()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            <h1 className="text_heading">
              <a>Don&apos;t have an account?</a>
              <button className="button_1" onClick={this.changeCheckRegister}>
                Register
              </button>{' '}
              here
            </h1>

            {showSubmitError ? <p className="para-error">{message}</p> : ''}
          </>
        );
      case apiStatusCheck.apiregister:
        return (
          <>
            <h1 className="textheading_Register">Create Register</h1>
            <div className="input-container">{this.renderUserNameInput()}</div>
            <div className="input-container">{this.renderPassWordInput()}</div>
            <button onClick={this.registerFormUserAndPassword} className="login-button">
              Register
            </button>
          </>
        );
      case apiStatusCheck.apisuccess:
        return (
          <div>
            <h1 className="heading-success">Registration successfully</h1>
            <SuccessApp  />
            <button type="button" onClick={this.changeCheckLogin} className="login-button">
              SignUp Again
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    
   
    if (Cookies.get('jwt_token') !== undefined) {
      // eslint-disable-next-line react/prop-types
      this.props.navigate('/'); // Redirect if already logged in
    }
    return (
      <div className="bg-card">
        <div className="bg-card2">
          <form className="form-container" onSubmit={this.submitForm}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
            {this.apiStatusCheck()}
          </form>
          
        </div>
      </div>
    );
  }
}


function withRouter(Component) {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }
}

export default withRouter(Login);
