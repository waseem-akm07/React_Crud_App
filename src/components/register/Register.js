import React from 'react';
import axios from 'axios';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

import { BASE_URL, POST_USER } from '../../constants/Constants'



class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPwd: '',
            role: '',
            show: false,
            message: null
        }
    }

    onUserNameValue = (e) => {
        this.setState({ username: e.target.value })
    }
    onPasswordValue = (e) => {
        this.setState({ password: e.target.value })
    }
    onConfirmPwd = (e) => {
        this.setState({ confirmPwd: e.target.value })
    }


    ///For Handle new user registration
    onSubmitHandle = () => {
        let credentials = null;
        credentials = ({ UserName: this.state.username, UserPassword: this.state.password, MapRoleId: this.state.role })

        if (this.state.username.length === 0 && this.state.password.length === 0 && this.state.confirmPwd.length === 0) {
            // alert('Sorry!! Required fields is empty')
            this.setState({ show: true, message: 'Sorry!! Required fields is Empty' })
        } else {
            if (this.state.username.length > 0 && this.state.password.length !== 0) {
                if (this.state.password === this.state.confirmPwd) {
                    axios.post(BASE_URL + POST_USER, credentials)
                        .then(res => {
                            console.log(res);
                        }).catch(function (error) {
                            console.log(error);
                        })
                    this.props.history.push('/')
                } else {
                    this.setState({ show: true, message: 'Sorry!! Password and ConfirmPwd is not match' })
                }
            } else {
                this.setState({ show: true, message: 'Sorry!! Password is null' })

            }
        }
    }

    ///Dropdown for user role
    // onDropDownHandle = (e) => {
    //     this.setState({ role: e.target.value })
    // }

    render() {
        return (
            <div className="App">
                <br />

                <label >Register Form</label>
                <div className="container">
                    <br />

                    <label className="">Username:</label><span> </span>
                    <input type="text" onChange={this.onUserNameValue} value={this.state.username} placeholder="UserName" style={{ "width": "20%" }} className="" required />
                    <br /><br />

                    <label className="">Password:</label><span> </span>
                    <input type="text" onChange={this.onPasswordValue} value={this.state.password} placeholder="Password" style={{ "width": "20%" }} className="" required />
                    <br /><br />

                    <label className="">Confirm Pwd:</label><span> </span>
                    <input type="text" onChange={this.onConfirmPwd} value={this.state.confirmPwd} placeholder="Confirm Password" style={{ "width": "20%" }} className="" required />
                    <br /><br />

                    {/* <label className="">Select Role:</label><span> </span>
                    <select onChange={this.onDropDownHandle}>
                        <option > --Select-- </option>
                        <option value={1}>Admin</option>
                        <option value={2}>User</option>
                    </select>
                    <br /><br /> */}

                    <input type="submit" value="Submit" onClick={this.onSubmitHandle} style={{ "width": "20%" }} className="btn btn-success" />
                </div>
                <div>
                    <SweetAlert
                        show={this.state.show}
                        title="Warning Message"
                        text={this.state.message}
                        onConfirm={() => this.setState({ show: false, message: null })}
                    ></SweetAlert>
                </div>
            </div>
        )
    }
}
export default Register;