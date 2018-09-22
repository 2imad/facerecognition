import React, { Component } from 'react';
import Clarifai from 'clarifai'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import Face from './components/face/Face'
import Rank from './components/rank/Rank'
import './App.css';
import Particles from 'react-particles-js'



const app = new Clarifai.App({
  apiKey: 'f391b93be45c4dd1a71470732eec75eb'
})


const particlesOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 1200
      }
    }
  }
}
const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signing',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor() {
    super()
    this.state = initialState
  }
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    }
   )
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('input-image')
    const width = Number(image.width)
    const height = Number(image.height)

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  displayBox = (box) => {
    this.setState({ box })
  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }
  onImageSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response =>{ 
        if (response){
          fetch('https://facereconapi.herokuapp.com/image' , {
            method :'PUT',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
              id : this.state.user.id,
            })
          })
          .then(response =>  response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user , {entries : count  }))
          })
        }
      
        this.displayBox(this.calculateFaceLocation(response))
        
      })
      .catch(error => console.log(error))
  }
  onRouteChange = (route) => {
    if (route === 'signing' || route === 'register') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }

    this.setState({ route: route })
  }
  render() {
    const { isSignedIn, imageUrl, box } = this.state
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange} />
        {this.state.route === 'home' ?
          <div>
            <Logo />
            <Rank
            name ={this.state.user.name}
            entries={this.state.user.entries}
            />
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onImageSubmit} />
            <Face box={box} ImgUrl={imageUrl} />
          </div>
          : (
            this.state.route === 'signing'
              ? <Login 
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange} />
              : <Register 
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
