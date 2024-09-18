import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import HomePage from '../Pages/HomePage';
import MoviesPage from '../Pages/MoviesPage';
import TvPages from '../Pages/TvPages';

function Navigation() {
    return (
        <BrowserRouter>
            <Navbar expand="lg" >
                <Container>
                    <Navbar.Brand as={Link} to={'/'} className='LogoColor'>Movies Park</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav"  className="justify-content-end">
                        <Nav>
                            <Nav.Link as={Link} to={'/'} className=' text-white'>Home</Nav.Link>
                            <Nav.Link as={Link} to={'/movie'} className=' text-white'>TV</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/TV' element={<TvPages />}/>
                <Route path='/movie/:id' element={<MoviesPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Navigation