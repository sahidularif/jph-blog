import React, { useContext } from 'react';
import Navs from '../Header/Navs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import './Profile.css';
import { postsContext } from '../../App';
import { faEdit, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import LeftSide from '../LeftSide/LeftSide';

const Profile = () => {
    const id = 2; //As a default user
    const [allPost] = useContext(postsContext);
    const myPost = allPost.filter((post) => post.userId == id);

    const shortPost = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    }
    return (
        <Container fluid>
            <Row>
                <Col sm={12}>
                    <Navs />
                </Col>
            </Row>
            <Row className="d-flex mt-5 justify-content-center">
                <Col sm={2} className="bg-secondary leftSide" >
                    <LeftSide />
                </Col>
                <Col sm={10} className="mainContent">
                    <h3 className="m-2">My recent posts</h3>
                    <Row>
                        {
                            myPost.map((post, index) =>
                                <Col md={4} key={index} className="p-2">
                                    <Card className='post-card'>
                                        <Card.Body>
                                            <Card.Title>{post.title.length > 30
                                                ? shortPost(post.title.slice(0, 30).trim() + '...')
                                                : shortPost(post.title).trim()
                                            }</Card.Title>
                                            <Card.Text>{post.body.slice(0, 60)}</Card.Text>
                                          <span className="d-flex justify-content-between">
                                          <Link to={`/edit-posts/${post.id}`}>
                                                <Button size="sm" variant="link">Read More</Button>
                                            </Link>
                                            <Link to={`/edit-posts/${post.id}`}>
                                                <Button size="sm" variant="light"><FontAwesomeIcon icon={faPen} /> Edit</Button>
                                            </Link>
                                            <Button size="sm" variant="light"><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                                          </span>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};
{/* <FontAwesomeIcon icon={faTrash} /> */ }
export default Profile;