import React, { FC, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { Loading } from 'WNTR/components'
import { IProduct, ISessionLineItem } from '../../interfaces'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import ShoppingCart from '../../utils/cart-context'

const Cart: FC<ICart> = (block) => {

    const router = useRouter()
    const cart = useContext(ShoppingCart)
    const removeFromCart = (product: IProduct) => {
        const index = block.products.indexOf(block.products.filter(block => { return block.id == product.id })[0])
        const item: ISessionLineItem = {
            product: product.id,
            price: product.defaultPriceId,
            quantity: 1
        }
        cart.remove(item)
        block.products.splice(index, 1)
    }
    const [submitting, setSubmitting] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [button, setButton] = useState(false)
    const handleNameChange = (input: string) => {
        setName(input)
        setButton(false)
        if (name && email) {
            setButton(true)
        }
    }
    const handleEmailChange = (input: string) => {
        setEmail(input)
        setButton(false)
        if (name && email) {
            setButton(true)
        }
    }
    
    const runCheckout  = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSubmitting(true)
        var data = {
            name: name,
            email: email
        }
        axios.post('/api/commerce/customers/search', data).then(customers => {
            if (customers.data.length) {
                proceedToCheckout(customers.data[0])
            }
            else {
                axios.post('/api/commerce/customers/create', data).then(cus => {
                    proceedToCheckout(cus.data)
                })
            }
        })
    }

    const proceedToCheckout = async (customer: any) => {
        const model = {
            success_url: `${window.location.protocol}//${window.location.host}${block.checkout}?success=true`,
            cancel_url: `${window.location.protocol}//${window.location.host}${block.checkout}?success=true`,
            line_items: cart.items,
            mode: 'subscription',
            customer: customer.id
        }
        axios.post('/api/commerce/checkout', model).then(checkout => { 
            setSubmitting(false)
            router.push(checkout.data.url)
            console.log(checkout.data.url)
        })
    }

    return (
        <article className={block.alias}>
            <Container>
                <Row>
                    <Col xs={12}>
                        <h2 className={`${block.alias}__heading`}>Your Cart ({block.products.length} items)</h2>
                    </Col>
                    <Col className={`${block.alias}__cart`} xs={12} lg={8}>
                        { block.products.map(product => 
                            <Row key={product.id} className={`${block.alias}__item`}>
                                <Col xs={2}>
                                    { product.images ? <Image src={`${product.images[0]}?mode=crop&width=300&height=300`} className={`${block.alias}__item-image`} /> : null }
                                </Col>
                                <Col xs={8}>
                                    <h4 className={`${block.alias}__item-name`}>{product.name} {product.defaultPrice.recurring ? `(subscription)` : null}</h4>
                                    <p className={`${block.alias}__item-description`}>{product.description}</p>
                                </Col>
                                <Col xs={2}>
                                    <p><strong>$ {product.defaultPrice.unitAmountDecimal.toFixed(2)}</strong></p>
                                </Col>
                                <Col xs={12}>
                                    <div className="wntrForm__field">
                                        <Button type="button" onClick={()=>removeFromCart(product)}>Remove</Button>
                                    </div>
                                </Col>
                            </Row>
                        ) }
                    </Col>
                    <Col xs={12} lg={4}>
                        { cart.items.length ?
                            <div className={`${block.alias}__summary`}>
                                <h3 className="mb-4">Summary</h3>
                                <table className={`${block.alias}__summary-table`}>
                                    <tbody>
                                        <tr>
                                            <td>Subtotal ({block.products.length} items)</td>
                                            <td>${block.products.reduce((total, a) => total + a.defaultPrice.unitAmountDecimal, 0).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Currency</td>
                                            <td>AUD</td>
                                        </tr>
                                        <tr>
                                            <td>Shipping & Handling</td>
                                            <td>$0.00</td>
                                        </tr>
                                        <tr>
                                            <td>Tax</td>
                                            <td>Included</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className={`${block.alias}__summary-table`}>
                                    <tbody>
                                        <tr>
                                            <td><h4>Total</h4></td>
                                            <td><h4>${block.products.reduce((total, a) => total + a.defaultPrice.unitAmountDecimal, 0).toFixed(2)}</h4></td>
                                        </tr>
                                    </tbody>
                                </table>                            
                                <Form className="wntrForm" onSubmit={runCheckout}>
                                    <Form.Group className="wntrForm__field" controlId="name">
                                        <Form.Label className="visually-hidden">Name</Form.Label>
                                        <Form.Control type="text" placeholder="Name" name="name" onChange={e => handleNameChange(e.currentTarget.value)} />
                                    </Form.Group>
                                    <Form.Group className="wntrForm__field" controlId="email">
                                        <Form.Label className="visually-hidden">Email</Form.Label>
                                        <Form.Control type="email" placeholder="Email" name="email" onChange={e => handleEmailChange(e.currentTarget.value)} />
                                    </Form.Group>
                                    <Button type="submit" className={`${block.alias}__summary-checkout`} disabled={!button}>Checkout</Button>
                                    { submitting ? <Loading position="absolute" background="transparent" /> : null }
                                </Form>
                            </div>
                        : null }
                    </Col>
                </Row>
            </Container>
        </article>
    )
}

interface ICart {
    type: string;
    alias: string;
    products: IProduct[];
    checkout: string;
}

export default Cart