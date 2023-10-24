import React, { FC } from 'react'
import Link from 'next/link'
import { OpeningHour, Form } from 'WNTR/components'
import { IFooter } from 'WNTR/interfaces'
import { Container, Row, Col } from 'react-bootstrap';

const Footer: FC<IFooter> = (footer) => {

    let studio = footer.menus.filter(m => m.title === "Studio")[0]
    let giveaways = footer.menus.filter(m => m.title === "Giveaways")[0]

    return (
        <footer className="footer">
            <Container>
                <Row className="pt-5 pb-4">
                    <Col xs={12} md={6}>
                        <Row>
                            { studio ?
                                <Col xs={6}>
                                    <div className="d-flex flex-column mb-3">
                                        <h4>Studio</h4>
                                        {studio.links.map((link, index) => <Link key={index} href={link.url}>{link.title}</Link> )}
                                    </div>
                                </Col>
                            : null}
                            { giveaways ?
                                <Col xs={6}>
                                    <div className="d-flex flex-column mb-3">
                                        <h4>Giveaways</h4>
                                        {giveaways.links.map((link, index) => <Link key={index} href={link.url}>{link.title}</Link> )}
                                    </div>
                                </Col>
                            : null}
                        </Row>
                        <Row>
                            <Col xs={12}><h4>Open Hours</h4></Col>
                            <Col>
                                {footer.settings.openingHours.sort((a,b) => { return a.order - b.order }).map((hour) => <OpeningHour key={hour.order} {...hour} />)}
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={6}>
                        { footer.form.fields ? <Form {...footer.form} />: null }
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer