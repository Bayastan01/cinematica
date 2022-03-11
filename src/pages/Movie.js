import { useState, useEffect } from 'react';
import './pages-css/Movie.css';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HomeCard from '../components/HomeCard';

export default function Movie(props) {
    const [movie, setmovie] = useState([]);
    const [state, setstate] = useState(1)

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/movie/popular?page=1&api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru-RU')
            .then((data) => {
                setmovie(data.data.results)
            })
    }, [])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?page=${state}&api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru-RU`)
            .then((data) => {
                setmovie(p => [...p, ...data.data.results])
            })
    }, [state])

    const Nextmovie = () => {
        setstate(p => p + 1)
    }

    return (
        <div>
            <Container>
                <Row className="mt-3">
                    <Col xs={0} sm={9}>
                        <Container>
                            <h2>Фильмы</h2>
                        </Container>
                        <Container className='block13'>
                            {movie.map((item, i) => {
                                return (
                                    <>
                                        <HomeCard id={item.id} name={item.name} name2={item.title} img={item.backdrop_path} />
                                    </>
                                )
                            })}
                        </Container>
                        <div align="center" className="m-3">
                            <Button align="center" onClick={Nextmovie}>Закрузить еще</Button>
                        </div>
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
