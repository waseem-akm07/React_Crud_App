import React from 'react';
import axios from 'axios';
import localStorage from 'localStorage';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { Loader } from '../loader/Loader';

import { BASE_URL, INTERNAL_LOGIN, EXTERNAL_LOGINS_PROVIDER } from '../../constants/Constants';


///To store external login key
let externalUrl = '';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      token: '',
      check: false,
      show: false,
      message: null,
      loading: true
    }
  }


  onUserNameValue = (e) => {
    this.setState({ username: e.target.value })
  }
  onPasswordValue = (e) => {
    this.setState({ password: e.target.value })
  }


  /**
   * Filling credentials in textbox if remember me is checked
   */
  componentDidMount() {
    //loader handler
    this.timerHandle = setTimeout(() =>
      this.setState({ loading: false }), 100)

    if (localStorage.getItem('rememberUserName') && localStorage.getItem('rememberPassword') !== null) {
      this.setState({ check: true })
      this.setState({ username: localStorage.getItem('rememberUserName') })
      this.setState({ password: localStorage.getItem('rememberPassword') })
    }
  }

  /**
   * For handle Remember me check box
   */
  onCheckBoxHandle = (e) => {
    // if textboxes !=null & checkbox checked
    if (this.state.username && this.state.password !== null) {
      this.setState({ check: (e.target.checked) ? true : false })
      if (e.target.checked === true) {
        localStorage.setItem('rememberUserName', this.state.username)
        localStorage.setItem("rememberPassword", this.state.password)
        this.setState({ check: true })
      }
      // if checkbox unchecked
      else {
        localStorage.removeItem('rememberUserName')
        localStorage.removeItem('rememberPassword')
        this.setState({ username: "", password: "" });
        this.setState({ check: false })
      }
      // if textboxes is null
    } else {
      this.setState({ show: true, message: 'Sorry!! Username and Password is Empty' })
    }
  }


  /**
   * For Simple Login
   */
  onLoginHandle = () => {
    this.setState({ loading: true })
    if (this.state.username.length === 0 && this.state.password.length === 0) {
      this.setState({ show: true, message: 'Sorry!! Username and Password is Empty' })
    } else {
      axios({
        url: BASE_URL + INTERNAL_LOGIN + '?Url=http://localhost:62769&&UserName=' + this.state.username + '&&UserPassword=' + this.state.password,
        method: 'POST'
      }).then(res => {
        if (JSON.parse(res.data).error === "invalid_grant") {
          this.setState({ show: true, message: 'Sorry!! InValid User' })
          this.timerHandle = setTimeout(() =>
            this.setState({ loading: false }), 10)
        } else {
          localStorage.setItem('token', res.data);
          ///loder...
          this.timerHandle = setTimeout(() =>
            this.setState({ loading: false }), 1250)
          this.props.history.push('/employee')
        }
      }).catch(function (error) {
        console.log(error);
      })
      // this.setState({ username: "", password: "" });
      // this.props.history.push('/employee')
    }

  }


  /**
   * Login with facebook
   */
  async onFacebookHandle() {
    // First hit for generating external login provider key
    await axios({
      url: BASE_URL + EXTERNAL_LOGINS_PROVIDER,
      method: 'GET',
    }).then(res => {
      externalUrl = res.data[0].Url // Storing provider key
    }).catch(function (error) {
      console.log(error);
    })

    // window.location.href = 'http://localhost:62769' + externalUrl

    // Second hit for authentication from facebook with Provider key
    axios({
      url: BASE_URL + externalUrl,
      method: 'GET'
    }).then(res => {
      alert('return from facebook')
      console.log(JSON.stringify(res))
    }).catch(function (error) {
      console.log(error);
    })
  }


  render() {
    // loader...
    if (this.state.loading) { return <Loader /> }

    return (
      <div className="App">
        <br />

        <label >Login Form</label>
        <div className="container">
          <br />

          <label className="">Username:</label><span> </span>
          <input type="text" onChange={this.onUserNameValue} value={this.state.username} placeholder="UserName" style={{ "width": "20%" }} className="" required />
          <br /><br />

          <label className="">Password:</label><span> </span>
          <input type="text" onChange={this.onPasswordValue} value={this.state.password} placeholder="Password" style={{ "width": "20%" }} className="" required />
          <br />

          <input type="checkbox" name="RememberMe" value="Checked" onChange={this.onCheckBoxHandle} checked={this.state.check} /> Remember Me<br />
          <br />

          <input type="submit" value="Login" onClick={this.onLoginHandle} style={{ "width": "20%" }} className="btn btn-success" />
          <br /><br />

          <input type="submit" value="Login with Facebook" onClick={this.onFacebookHandle} style={{ "width": "20%", "backgroundColor": "blue" }} className="btn btn-success" />
        </div>

        
          <SweetAlert
            show={this.state.show}
            title="Warning Message"
            text={this.state.message}
            onConfirm={() => this.setState({ show: false, message: null })}
          ></SweetAlert>
        
      </div>
    );
  }
}
export default Login;