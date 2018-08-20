import React from 'react'
import './face.css'




const Face = ({ImgUrl , box }) => {
   const styles = {
        top : box.topRow , 
        right : box.rightCol ,  
        bottom : box.bottomRow, 
        left : box.leftCol  
    }
    return (
         <div className="center ma">
         <div className='absolute mt2'>
             <img id='input-image' alt='image' src={ImgUrl}  width="500px" height="auto" /> 
             <div  style={styles}
             className='bounding-box'></div>
         </div>
         </div>
     )
}

export default Face