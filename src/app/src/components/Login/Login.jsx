import React from 'react';
import PropTypes from 'prop-types';
import './Login.css';

export class Login extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          username: "",
          password: ""
        };
    }
    
    isValidLogin() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }

    handleLogin = event => {
        event.preventDefault();
        console.log(this.isValidLogin());
        if(this.isValidLogin()) {
            console.log(this.state.username);
            console.log(this.state.password);
        } else {
            console.log("Invalid login");
        }
    }

    render() {
        return (
            <form className="app__login-form">
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
                <button type="submit" className="mdl-button mdl-js-button submit-button" onClick={this.handleLogin}>Login</button>    
            </form>
        );
    }
}

Login.propTypes = {
}

export default Login;