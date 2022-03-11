import { useState, useEffect } from 'react';
import './pages-css/More.css';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function More1(props) {
    const [more, setmore] = useState([])
    const params = useParams();

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${params.slug}?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru-RU`)
            .then((data) => {
                setmore(data.data)
            })
        axios.get(`https://api.themoviedb.org/3/tv/${params.slug}?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru-RU`)
            .then((data) => {
                setmore(data.data)
            })
    }, [])

    return (
        <div>
            <Container>
                <Row className="mt-3">
                    <Col xs={12} sm={9}>
                        <>
                            <Container>
                                <div className="img33" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${more.backdrop_path})` }}></div>
                                <h2>{more.title}</h2>
                                <h3 style={{display:'flex'}}>
                                    {more.genres && more.genres.map(item => item.name).join(', ')}
                                </h3>
                            </Container>
                            <Container className='block13'>
                                <p>{more.overview}</p>
                            </Container>
                        </>
                    </Col>
                    <Col xs={0} sm={3}>{props.genres.map((item, i) => {
                        return (
                            <Nav.Link className='genrestext' as={Link} to={`/genre/tv/${item.id}`}>{item.name}</Nav.Link>
                        )
                    })}</Col>
                </Row>
            </Container>
        </div>
    )
}
