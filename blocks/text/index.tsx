import React, { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const Text: FC<IText> = (text) => {
    return (
        <article className={text.alias}>
            <Container>
                <Row>
                    <Col className={`${text.alias}__col`} dangerouslySetInnerHTML={{ __html: text.richtext }}>
                    </Col>
                </Row>
            </Container>
        </article>
    )
}

interface IText {
    richtext: string;
    type: string;
    alias: string;
}

export default Text