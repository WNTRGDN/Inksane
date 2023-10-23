import React, { FC } from 'react'
import Link from 'next/link'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'

const Teasers: FC<ITeasers> = (teasers) => {
    return (
        <article className={teasers.alias}>
            <Container>
                <Row>
                    {teasers.heading ?
                        <Col xs={12}>
                            <h2 className={`${teasers.alias}__heading`}>
                                {teasers.heading}
                            </h2>
                        </Col>
                    : null }
                    {teasers.pages.sort((a,b) => { return a.order - b.order }).map((item, index) =>
                        <Col as={item.link ? Link : Col} xs={12} sm={4} key={index} href={item.link}>
                            <div className={`${teasers.alias}__teaser`}>
                                { item.image ? <Image className={`${teasers.alias}__image`} src={`${item.image}?mode=crop&width=500&height=500`} /> : null }
                                <h3 className={`${teasers.alias}__title`}>{item.title}</h3>
                                <div className={`${teasers.alias}__text`} dangerouslySetInnerHTML={{ __html: item.text }}></div>
                                <div className="wntrForm__field">
                                    <Button type="button">Buy</Button>
                                </div>
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>
        </article>
    )
}

interface ITeasers {
    heading: string;
    pages: ITeaser[];
    type: string;
    alias: string;
}

interface ITeaser {
    image: string;
    link: string;
    text: string;
    title: string;
    order: number;
}

export default Teasers