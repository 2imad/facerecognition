import React from 'react'

const Rank = ({name , entries}) => {
    return (
        <div>
            <div className="white f-1">
                { `${name} Your rank is ... ` }
            </div>
            <div className="white f-5">
                {entries}
            </div>
        </div>
    )
}
export default Rank