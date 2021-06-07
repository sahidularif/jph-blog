import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navs.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navs = () => {
  return (
    <nav class="navbar fixed-top navbar-expand-lg navbar-light" variant="dark" style={{backgroundColor:'#111A28'}}>
      <div class="container-fluid">
        <Navbar.Brand className="text-light" href="#home">React-Bootstrap</Navbar.Brand>
        <NavDropdown title={
          <span className="mes text-primary my-auto"><FontAwesomeIcon icon={faUser} /> Ervin Howell</span>
        } className="mes text-light navbar-light" id="collasible-nav-dropdown">
          <NavDropdown.Item><Link to="/profile">Profile</Link></NavDropdown.Item>
          <NavDropdown.Item><Link to="/createPost">Create new post</Link></NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item><Link to="/users">Users</Link></NavDropdown.Item>
        </NavDropdown>
      </div>
    </nav>
  );
};

export default Navs;
