import React, { FC } from 'react'
import moment from 'moment'
import { IOpeningHours } from 'WNTR/interfaces'
import { Row, Col } from 'react-bootstrap'

const OpeningHour: FC<IOpeningHours> = (hour) => {
    return(
        <Row key={hour.day}>
            <Col xs={6}>{hour.day}</Col>
            <Col xs={6}>{hour.opening ? `${moment(new Date(hour.opening)).format('h:mma')} - ${moment(new Date(hour.closing)).format('h:mma')}` : 'Closed'}</Col>
        </Row>
    )
}

export default OpeningHour;