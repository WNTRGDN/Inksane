import React, { FC } from 'react'

const Loading: FC<ILoading> = (loading) => {
    return(
        <div className="loader" style={{ height: loading.height || '100vh', position: loading.position || 'fixed', top: loading.top || '0', backgroundColor: loading.background || '' }}>
            <div className="loader__decoration">
                <div></div><div></div><div></div><div></div>
            </div>
        </div>
    )
}

interface ILoading {
    height?: string,
    position?: any,
    top?: string,
    background?: string
}

export default Loading;