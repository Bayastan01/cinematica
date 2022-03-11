import React from 'react'
import './components-css/Personcard.css'
import { Card, Row, Col } from 'react-bootstrap';

export default function PersonCard(props) {
    return (
        <div>
            <Card className='card21'>
                <Row>
                    <Col xs={3} ml={6} sm={6}>
                        <div className="img11" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${props.img})` }}></div>
                    </Col>
                    <Col xs={9} ml={6} sm={6}>
                        <Card.Body>
                            <Card.Title className='text-center'>{props.name} <hr/></Card.Title>
                            <Card.Text className='text-center'><p style={{color:'grey'}}>Извесность за:</p><p>{props.title}</p></Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}
