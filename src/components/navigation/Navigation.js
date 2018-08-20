import React from 'react'

const Navigation = ({onRouteChange , isSignedIn}) => {
 
 const styles ={
     navStyle:{
        display : 'flex',
        justifyContent : 'flex-end'  
     }
 } 
  if(isSignedIn){  
 return( 
      <nav style={styles.navStyle}> 
         <p onClick={ ()=> onRouteChange('signing') } className="f3 link dim black underline pa3 pointer">Sign out</p>
      </nav>
    )
}else  {
    return (
      <nav style={styles.navStyle}> 
         <p onClick={ ()=> onRouteChange('signing') } className="f3 link dim black underline pa3 pointer">Sign In</p>
         <p onClick={ ()=> onRouteChange('register') } className="f3 link dim black underline pa3 pointer">Register</p>
      </nav>
    )
  }   
}

export default Navigation