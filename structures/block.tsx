import React, { FC } from 'react'
import { Jumbotron, Products, Teasers, Product, Text, Cart, Checkout, Image, Split, Cards } from 'WNTR/blocks'
import { IBlock } from 'WNTR/interfaces';

var controls: { [key: string]: any } = {
    Jumbotron: Jumbotron,
    Products: Products,
    Teasers: Teasers,
    Product: Product,
    Text: Text,
    Cart: Cart,
    Checkout: Checkout,
    Image: Image,
    Split: Split,
    Cards: Cards
};

const Block: FC<IBlock> = (block) => {
    if (controls[block.type] !== undefined){
        const Block = controls[block.type]
        return (
            <Block {...block} />
        )
    }
    return null
}

export default Block