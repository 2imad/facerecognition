import React from 'react'

const Navigation = ({onRouteChange}) => {
 
 const styles ={
     navStyle:{
        display : 'flex',
        justifyContent : 'flex-end'  
     }
 } 
    
 return (
      <nav style={styles.navStyle}> 
         <p onClick={ ()=> onRouteChange('signing') } className="f3 link dim black underline pa3 pointer">Sign out</p>
      </nav>
     )
}

export default Navigation