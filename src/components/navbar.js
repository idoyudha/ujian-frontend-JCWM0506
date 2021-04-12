import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Badge, Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
  } from 'reactstrap';
import { connect } from 'react-redux';
import { authLogout } from '../action';

class NambarComp extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.open })
    }

    render() { 
        console.log('email navbar', this.props.id)
        return (  
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand><Link to="/">Home</Link></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink><Link to="/login">Login</Link></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink><Link to="/login" onClick={this.props.authLogout}>Logout</Link></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink><Link to="/cart">Cart</Link></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink><Link to="/checkout">Checkout</Link></NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>
                        <Button color="primary" outline>
                            {this.props.email} <Badge color="secondary">{this.props.cart.length}</Badge>
                        </Button>
                    </NavbarText>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

// function to take data from reducer/store
const mapStateToProps = ({ authReducer }) => {
    return {
        ...authReducer
    }
}

export default connect(mapStateToProps, {authLogout})(NambarComp);