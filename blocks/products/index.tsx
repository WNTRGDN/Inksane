import React, { FC } from 'react'
import { IProduct } from '../../interfaces'
import { Container, Row, Col } from 'react-bootstrap'

const Products: FC<IProducts> = (products) => {
    return (
        <article className={products.alias}>
            <Container>
                <Row>
                    { products.heading ?
                        <Col xs={12}>
                            <h2 className={`${products.alias}__heading`}>
                                {products.heading}
                            </h2>
                        </Col>
                    : null }
                    { products.items.sort((a,b) => { return a.order - b.order }).map(product =>
                        <Col xs={12} lg={4} className={`${products.alias}__product`} key={product.id}>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>{product.defaultPrice.unitAmountDecimal.toFixed(2)}<span>/{product.defaultPrice.recurring.interval}</span></p>
                        </Col>
                    ) }
                </Row>
            </Container>
        </article>
    )
}

interface IProducts {
    heading: string,
    items: IProduct[],
    type: string,
    alias: string,
}

export default Products