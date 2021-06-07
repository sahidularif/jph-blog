import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LeftSide from '../LeftSide/LeftSide';
import MainContent from '../MainContent/MainContent';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import Navs from '../Header/Navs';
const Home = () => {
    return (
        <Container fluid>
            <Row>
                <Col sm={12}>
                    <Navs />
                </Col>
            </Row>
            <Row className="d-flex justify-content-between mt-5">
                <Col sm={3} className="leftSide"><LeftSide /></Col>
                <Col sm={9} className="mainContent"><MainContent /></Col>
            </Row>
        </Container>
    );
};

export default Home;