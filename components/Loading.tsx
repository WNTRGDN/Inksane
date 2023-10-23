import React, { FC } from 'react'

const Loading: FC = () => {
    return(
        <div className="loader">
            <div className="loader__decoration">
                <div></div><div></div><div></div><div></div>
            </div>
        </div>
    )
}

export default Loading;