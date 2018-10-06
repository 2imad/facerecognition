import React, { Component } from 'react'
import '../login/login.css'


class Register extends Component{
    constructor(props){
        super(props)
    
         this.state = {
             email : '',
             password : '',
             name : ''
         }
    }
    onNameChange = ( event ) => {
        this.setState({name : event.target.value})
    }
    onPasswordChange = ( event  ) => {
        this.setState({ password : event.target.value })
    }
    onEmailChange = ( event ) => {
        this.setState({ email : event.target.value })
    }
    onSubmit = () => {
        if(this.state.email && this.state.password && this.state.name){
        fetch('https://facereconapi.herokuapp.com/register' , {
            method : 'POST',
            headers : {'content-Type' : 'application/json'},
            body : JSON.stringify({
                email : this.state.email,
                name : this.state.name,
                password : this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
           
            if ( user.id){
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
       }
    }
 
    render(){
    return (
        <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input
                             className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90" 
                             type="name" 
                             name="name" 
                             id="name" 
                             onChange = {this.onNameChange }
                             placeholder="John Smith"
                             />
                        </div>
                        <form className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address" 
                            id="email-address" 
                            onChange={this.onEmailChange}
                            placeholder="example@email.com"
                            />
                            <span className="tooltip" data-tooltip="email must be in example@email.com format">?</span>
                        </form>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password" 
                            id="password" 
                            onChange={this.onPasswordChange}
                            placeholder="**************"
                            />
                        </div>
                    </fieldset>
                    <div className="lh-copy mt3">
                        <p onClick={this.onSubmit} className=" pointer f6 link dim black db">Register</p>
                    </div>
                </div>
            </main>
        </article>
    )
  }
}
export default Register