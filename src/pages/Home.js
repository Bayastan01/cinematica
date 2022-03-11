import { useState, useEffect } from 'react';
import './pages-css/Home.css';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import axios from 'axios';
import HomeCard from '../components/HomeCard';
import { Link } from 'react-router-dom'

function Home(props) {
    const [popular, setpopular] = useState([])
    const [popular2, setpopular2] = useState([])
    const [select, setSelect] = useState(true)
    const [select2, setSelect2] = useState(true)

    useEffect(() => {
        if (select) {
            SetTv()
        } else {
            Inmovie()
        }
    }, [select])

    useEffect(() => {
        if (select2) {
            SetTv2()
        } else {
            Inmovie2()
        }
    }, [select2])
    
    const SetTv = () => {
        setSelect(true)
        if (select) {
            axios.get('https://api.themoviedb.org/3/tv/popular?api_key=f87b524a4f77026b64be619c7d41e92e&language=ru-RU')
                .then((data) => {
                    setpopular(data.data.results)
                })
        }
    }
    const Inmovie = () => {
        setSelect(false)
        if (select === false) {
            axios.get('https://api.themoviedb.org/3/movie/popular?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru-RU')
                .then((data) => {
                    setpopular(data.data.results)
                })
        }
    }

    const SetTv2 = () => {
        setSelect2(true)
        if (select2) {
            axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru-RU')
                .then((data) => {
                    setpopular2(data.data.results)
                })
        }
    }
    const Inmovie2 = () => {
        setSelect2(false)
        if (select2 === false) {
            axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru-RU')
                .then((data) => {
                    setpopular2(data.data.results)
                })
        }
    }

    return (
        <Container>
            <Row className="mt-3">
                <Col xs={12} sm={9}>
                    <Container className="d-flex justify-content-between ">
                        <h2>Что популярно</h2>
                        <div className="block01">
                            <Button onClick={SetTv} className="btn1" variant={select?'primary':'dark'}>По ТВ</Button>
                            <Button onClick={Inmovie} className="btn1" variant={!select?'primary':'dark'}>В кинотеатрах</Button>
                        </div>
                    </Container>
                    <Container className='block12'>
                        {popular.map((item, i) => {
                            return (
                                <HomeCard id={item.id} name={item.name} name2={item.title} date={item.first_air_date} date2={item.release_date} img={item.backdrop_path} />
                            )
                        })}
                    </Container>

                    <Container className="d-flex justify-content-between ">
                        <h2>Что в тренде</h2>
                        <div className="block01">
                            <Button onClick={SetTv2} className="btn1" variant={select2?'primary':'dark'}>Сегодня</Button>
                            <Button onClick={Inmovie2} className="btn1" variant={!select2?'primary':'dark'}>На этой неделе</Button>
                        </div>
                    </Container>
                    <Container className='block12'>
                        {popular2.map((item, i) => {
                            return (
                                <HomeCard id={item.id} name={item.name} name2={item.title} date={item.first_air_date} date2={item.release_date} img={item.backdrop_path} />
                            )
                        })}
                    </Container>
                </Col>
                <Col xs={0} sm={3}>{props.genres.map((item, i) => {
                    return (
                        <Nav.Link className='genrestext' as={Link} to={`/genre/tv/${item.id}`}>{item.name}</Nav.Link>
                    )
                })}</Col>
            </Row>
        </Container>
    );
}

export default Home;