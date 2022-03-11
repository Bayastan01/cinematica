import { useState, useEffect } from 'react';
import './pages-css/Genre.css';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import HomeCard from '../components/HomeCard';

export default function Genre(props) {
    const [genre, setgenre] = useState([])
    const params = useParams();

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${params.slug}&api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru-RU`)
            .then((data) => {
                setgenre(data.data.results)
            })
    }, [params])

    return (
        <div>
            <Container>
                <Row className="mt-3">
                    <Col md={9}>
                        <Container className='block13'>
                            {
                                genre.map((item, i) => {
                                    return (
                                        <>
                                            <HomeCard id={item.id} name={item.name} name2={item.title} date={item.first_air_date} img={item.backdrop_path} />
                                        </>
                                    )
                                })
                            }
                        </Container>
                    </Col>
                    <Col className="d-xs-none" md={3}>{props.genres.map((item, i) => {
                        return (
                            <Nav.Link className='genrestext' as={Link} to={`/genre/tv/${item.id}`}>{item.name}</Nav.Link>
                        )
                    })}</Col>
                </Row>
            </Container>
        </div>
    )
}
