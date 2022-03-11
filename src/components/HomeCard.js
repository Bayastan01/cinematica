import React from 'react';
import './components-css/HomeCard.css';
import { Card} from 'react-bootstrap';
import { Link} from 'react-router-dom';

export default function HomeCard(props) {
    return (
        <Card className='card11' as={Link} to={`/more/${props.id}`} style={{textDecoration:'none'}}>
            <div className="img" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${props.img})`}}></div>
            <Card.Body>
                <Card.Title className='text-center'>{props.name}{props.name2}</Card.Title>
                <Card.Text className='text-center'>{props.date}{props.date2}</Card.Text>
            </Card.Body>
        </Card>
    )
}
