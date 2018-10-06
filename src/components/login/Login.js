import React, { Component } from 'react'
import './login.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            signinEmail: '',
            signinPassword: '',
            hasError: false
        }
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onEmailChange = (event) => {
        this.setState({ signinEmail: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ signinPassword: event.target.value })
    }

    haserror = () => {
        return (
            <span className="error-info">Wrong combination,<br /> please try again!</span>
        )
    }
    onSubmit = () => {
        if (this.state.signinEmail && this.state.signinPassword) {
            fetch('https://facereconapi.herokuapp.com/signin', {
                method: 'POST',
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.state.signinEmail,
                    password: this.state.signinPassword
                })
            })
                .then(response => response.json())
                .then(user => {
                    if (user.id) {
                        this.props.loadUser(user)
                        this.props.onRouteChange('home')
                    } else {
                        this.setState({ hasError: true })
                    }
                })
        } else {
            this.setState({ hasError: true })
        }
    }


    render() {
        const { onRouteChange } = this.props
        return (
            <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <form className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    onChange={this.onEmailChange}
                                    className="pa3 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    placeholder="example@email.com"
                                    required
                                />
                                <span className="tooltip" data-tooltip="email must be in example@email.com format">?</span>
                            </form>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="****************"
                                    required
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmit}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db">Register</p>
                        </div>
                        {this.state.hasError && this.haserror()}
                    </div>
                </main>
            </article>
        )
    }
}

export default Login