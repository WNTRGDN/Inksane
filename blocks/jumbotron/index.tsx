import React, { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const Jumbotron: FC<IJumbotron> = (jumbotron) => {
    return (
        <article className={jumbotron.alias} style={jumbotron.image.length ? { backgroundImage:`url(${jumbotron.image}?width=1800&height=900&mode=pad)` } : {}}>
            <Container>
                <Row>
                    <Col className={`${jumbotron.alias}__content`} dangerouslySetInnerHTML={{ __html: jumbotron.richtext }}></Col>
                </Row>
            </Container>
        </article>
    )
}

interface IJumbotron {
    image: string;
    richtext: string;
    type: string;
    alias: string;
}

export default Jumbotron