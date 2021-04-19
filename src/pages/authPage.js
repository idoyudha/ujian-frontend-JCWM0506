import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, InputGroup } from 'reactstrap';
import axios from 'axios';
import { URL_API } from '../helper';
import { connect } from 'react-redux';
import { authLogin } from '../action';
import { Redirect } from 'react-router-dom';


class AuthenticationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    userLogin = () => {
        let email = this.inEmail.value
        let password = this.inPassword.value
        let cart = []
        let validation = /^(?=.*\d)(?=.*[A-Za-z]).{6,20}$/
        console.log(email, password)
        axios.get(URL_API+`/users?email=${email}`)
        .then(response => {
            console.log(response.data)
            if (response.data.length > 0) {
                console.log("Email already exist!")
                this.props.authLogin(response.data[0])
            }
            else {
                axios.post(URL_API+`/users`, {
                    email,
                    password,
                    cart
                })
                .then(response => {
                    console.log(response.data)
                    // save token data to browser
                    localStorage.setItem('tkn_id', response.data.id)
                    this.props.authLogin(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() { 
        console.log("authpage", this.props.id > 0)
        if (this.props.id > 0) {
            return <Redirect to="/" />
        }
        return (  
            <div className="container">
                <h1 className="text-center my-4">User Login and Logout</h1>
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" innerRef={el => this.inEmail = el} placeholder="Enter your email address ..." />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <InputGroup>
                            <Input type={this.state.passType} type="password" name="password" innerRef={el => this.inPassword = el} placeholder="Enter your password ..." />
                        </InputGroup>
                    </FormGroup>
                    <button type="button" onClick={this.userLogin} class="btn btn-primary btn-lg btn-block my-3">Login</button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = ({authReducer}) => {
    return {
        ...authReducer
    }
}

export default connect(mapStateToProps, {authLogin})(AuthenticationPage);