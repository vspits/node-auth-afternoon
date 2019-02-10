import React, { Component } from 'react'
import './Header.css'
import axios from 'axios';

export default class Header extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            isAdmin: false,
        }
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.register = this.register.bind(this)
    }

    handleUsernameInput(value){
        this.setState({username: value})
    }

    handlePasswordInput(value){
        this.setState({password: value})
    }

    toggleAdmin () {
        this.setState({isAdmin: !this.state.isAdmin})
    }

    login() {
        const { username, password, isAdmin } = this.state;
        console.log(this.props.user)
        axios.post('/auth/login', { username, password })
             .then( () => {
                 this.setState({
                     username: '',
                     password: ''
                 })
                 this.props.updateUser({username, isAdmin})
             })
    }

    register () {
        const { username, password, isAdmin } = this.state
        axios.post(`/auth/register`, {username, password, isAdmin})
            .then( () => {
                this.setState({
                    username: '',
                    password: ''
                })
                this.props.updateUser(username, isAdmin)
            })
    }

    logout() {
        axios.get('/auth/logout').then(()=>{
            this.props.updateUser({})
        })
    }

    render() {
        const { username, password } = this.state
        const { user } = this.props
        return (
            <div className='Header'>
                <div className="title">Dragon's Lair</div>
                {
                    user.username ?
                    (<div className='welcomeMessage'>
                            <h4>{user.username}, welcome to the dragon's lair</h4>
                            <button type="submit" onClick={this.logout}>Logout</button>
                        </div>
                        )
                        :
                        <div className="loginContainer">

                            <input type="text"
                                placeholder="Username"
                                value={username}
                                onChange={e => this.handleUsernameInput(e.target.value)}
                            />
                            <input type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => this.handlePasswordInput(e.target.value)}
                            />
                            <div className='adminCheck' >
                                <input type="checkbox" id='adminCheckbox'  /> <span> Admin </span>
                            </div>
                            <button onClick={this.login}>Log In</button>
                            <button onClick={this.register} id='reg' >Register</button>

                        </div>}
            </div>
        )
    }
}
