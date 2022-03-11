import { useState, useEffect} from 'react';
import './pages-css/Person.css'
import PersonCard from '../components/PersonCard';
import { Container, Row, Col, Button, Nav} from 'react-bootstrap';
import { Link} from 'react-router-dom';
import axios from 'axios';

export default function Person(props) {
    const [person, setperson] = useState([])
    const [state, setstate] = useState(1)

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/person/popular?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru-RU')
            .then((data) => {
                setperson(data.data.results)
            })
    }, [])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/person/popular?page=${state}&api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru-RU`)
            .then((data) => {
                setperson(p => [...p, ...data.data.results])
            })
    }, [state])

    const NextPerson = () => {
        setstate(p => p + 1)
    }

    console.log(person);
    return (
        <div>
            <Container>
                <Row className="mt-3">
                    <Col xs={12} sm={9}>
                        <Container>
                            <h2>Популярные люди</h2>
                        </Container>
                        <Container className='block13'>
                            {person.map((item, i) => {
                                return (
                                    <>
                                        <PersonCard name={item.name} title={item.known_for.map((item) => item.title)} img={item.profile_path} />
                                    </>
                                )
                            })}
                        </Container>
                        <div align="center" className="m-3">
                            <Button align="center" onClick={NextPerson}>Закрузить еще</Button>
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
