import { useEffect, useState } from 'react';
import './App.css';
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Tv from './pages/Tv';
import Person from './pages/Person';
import Genre from './pages/Genre';
import More1 from './pages/More';
import axios from 'axios';

export default function App() {
  const [genres, setgenres] = useState([])

  let { slug } = useParams();

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=f87b524a4f77026b64be619c7d41e92e&language=ru-RU')
      .then((data) => {
        setgenres(data.data.genres)

      })
  }, [])
 

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Синематика</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">Главная</Nav.Link>
              <Nav.Link as={Link} to="/movie">Фильмы</Nav.Link>
              <Nav.Link as={Link} to="/tv">Сериалы</Nav.Link>
              <Nav.Link as={Link} to="/person">Люди</Nav.Link>
              <NavDropdown title="Жанры TV" id="basic-nav-dropdown">
                {genres.map((item, i) => {
                  return (
                    <NavDropdown.Item as={Link} to={`/genre/tv/${item.id}`}>{item.name}</NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home genres={genres}/>} />
        <Route path="/home" element={<Home genres={genres}/>} />
        <Route path="/movie" element={<Movie genres={genres} />} />
        <Route path="/tv" element={<Tv genres={genres}/>} />
        <Route path="/person" element={<Person genres={genres}/>} />
        <Route path="/genre/tv/:slug" element={<Genre genres={genres} />} />
        <Route path="/more/:slug" element={<More1 genres={genres} />} />
      </Routes>
    </div>
  )
}

