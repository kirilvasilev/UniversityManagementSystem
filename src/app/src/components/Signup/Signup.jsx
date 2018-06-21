import React from 'react';
import PropTypes from 'prop-types';
import './Signup.css';

export class Signup extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            password2: ""
        };
    }
    
    isValidSignup() {
        return this.state.username.length > 0 
        && this.state.password.length > 0 
        && this.state.password2.length > 0
        && this.state.password === this.state.password2;
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }

    handleLogin = event => {
        event.preventDefault();
        console.log(this.isValidSignup());
        if(this.isValidSignup()) {
            this.props.signup({
                name: {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname
                },
                username: this.state.username,
                password: this.state.password 
            });
        } else {
            console.log("Invalid signup");
        }
    }

    render() {
        return (
            <form className="app__sign-up-form">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input firstname" 
                    type="text" 
                    id="firstname" 
                    name="firstname"
                    value={this.state.firstname}
                    onChange={this.handleChange}
                    placeholder="Firstname"/>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input lastname" 
                    type="text" 
                    id="lastname" 
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.handleChange}
                    placeholder="Lastname"/>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input username" 
                    type="text" 
                    id="username" 
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    placeholder="Username"/>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input password" 
                    type="password" 
                    id="password" 
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange} 
                    placeholder="Password"/>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input password" 
                    type="password" 
                    id="password2" 
                    name="password2"
                    value={this.state.password2}
                    onChange={this.handleChange} 
                    placeholder="Password"/>
                </div>
                <button type="submit" className="mdl-button mdl-js-button submit-button" onClick={this.handleLogin}>Sign up And Login</button>    
            </form>
        );
    }

}

Signup.propTypes = {
}

export default Signup;