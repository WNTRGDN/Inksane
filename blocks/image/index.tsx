import React, { FC } from 'react'

const Image: FC<IImage> = (block) => {
    return (
        <article className={`${block.alias} ${block.parallax ? block.alias + '-parallax' : null}`}>
            { block.parallax ? 
                <div className={`${block.alias}__parallax`} style={{ backgroundImage:`url(${block.src})`}}></div>
                 : 
                <img className={`${block.alias}__image`} src={block.src} />
            }
        </article>
    )
}

interface IImage {
    src: string;
    type: string;
    alias: string;
    parallax: boolean;
}

export default Image