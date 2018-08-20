import React from 'react'
import Tilt from 'react-tilt'
import logo from './logo.jpg'
import './logo.css'

const Logo = () => {
    const styles = {
        logoStyle :{
            paddingTop : "5px"
        }
    }
    return (
        <div className="ma4 mt0">
          <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 185, width: 250 }} >
            <div className="Tilt-inner pa3"> 
              <img style={styles.logoStyle} src={logo} alt="logo"/> 
            </div>
          </Tilt>
        </div>
    )
}
export default Logo