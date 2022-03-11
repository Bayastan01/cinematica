import { useState, useEffect} from 'react';
import './pages-css/Tv.css';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HomeCard from '../components/HomeCard';

export default function Tv(props) {
    const [tv, settv] = useState([])
    const [state, setstate] = useState(1)

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/tv/popular?page=1&api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru-RU')
            .then((data) => {
                settv(data.data.results)
            })
    }, [])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/tv/popular?page=${state}&api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru-RU`)
            .then((data) => {
                settv(p => [...p, ...data.data.results])
            })
    }, [state])

    const NextTv = () => {
        setstate(p => p + 1)
    }

    return (
        <div>
             <Container>
                <Row className="mt-3">
                    <Col xs={12} sm={9}>
                        <Container>
                            <h2>TV Сериалы и шоу</h2>
                        </Container>
                        <Container className='block13'>
                            {tv.map((item, i) => {
                                return (
                                    <>
                                        <HomeCard id={item.id} name={item.name} name2={item.title} date={item.first_air_date} img={item.backdrop_path} />
                                    </>
                                )
                            })}
                        </Container>
                        <div align="center" className="m-3">
                            <Button align="center" onClick={NextTv}>Закрузить еще</Button>
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
