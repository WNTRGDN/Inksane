import React, { FC, useState, useContext } from 'react'
import { IProduct, ISessionLineItem } from '../../interfaces'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import ShoppingCart from '../../utils/cart-context'

const Product: FC<IProduct> = (product) => {

    const cart = useContext(ShoppingCart)
    const index = cart.items.filter((item: ISessionLineItem) => item.product == product.id)
    const [added, setAdded] = useState(index.length > 0)
    const item: ISessionLineItem = {
        product: product.id,
        price: product.defaultPriceId,
        quantity: 1,
        recurring: product.defaultPrice.type === 'recurring'
    }

    const addToCart = () => {
        setAdded(true)
        cart.add(item)
    }

    const removeFromCart = () => {
        setAdded(false)
        cart.remove(item)
    }

    return (
        <article className={product.alias}>
            <Container>
                <Row>
                    <Col xs={12} lg={6}>
                        { product.images.map((image, index) => <Image key={index} className={`${product.alias}__image`} src={`${image}?mode=crop&width=500&height=500`} />) }
                    </Col>
                    <Col xs={12} lg={6}>
                        <h2 className={`${product.alias}__name`}>{product.name}</h2>
                        <Row>
                            <Col xs={6}>
                                <p className={`${product.alias}__price`}>$ {product.defaultPrice.unitAmountDecimal.toFixed(2)}{product.defaultPrice.recurring ? `/` + product.defaultPrice.recurring.interval : null}</p>
                            </Col>
                            <Col xs={6}>
                                <div className="wntrForm__field">
                                    <Button disabled={!product.active} type="button" onClick={added ? removeFromCart : addToCart}>{added ? `Remove` : `Add to cart`}</Button>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <hr className="mb-5" />
                            </Col>
                        </Row>
                        <p className={`${product.alias}__description`}>{product.description}</p>
                        <div className={`${product.alias}__text`} dangerouslySetInnerHTML={{ __html: product.details }}></div>
                    </Col>
                </Row>
            </Container>
        </article>
    )
}

export default Product