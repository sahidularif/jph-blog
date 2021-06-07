import React, { useState } from 'react';
import { Button, Card, Col, Form, Container, Row, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LeftSide from '../LeftSide/LeftSide';
import Navs from '../Header/Navs';
import { useHistory } from 'react-router-dom';

const CreatePost = () => {
    const [createPost, setCreatePost] = useState({
        title: '',
        body: '',
        userId: 2
    });
    const [postSuccess, setPostSuccess] = useState(false);
    const history = useHistory();
    const handleIChange = (e) => {
        const { name, value } = e.target;
        setCreatePost((prevContnet) => {
            return {
                ...prevContnet,
                [name]: value
            };
        });
    };
    const handleSubmit = () => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(createPost),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                setCreatePost({ title: '', body: '' });
                setPostSuccess(true);
            })
            setTimeout(function () {
                setPostSuccess(false);
                history.push({
                    pathname: `/profile`
                })
            }, 5000);
        
    }
    return (
        <div>
            <Container>
                <Row>
                    <Col md={12} className="mb-5">
                        <Navs />
                    </Col>
                </Row>
                <Row>
                    <Col sm={2} className="leftSide">
                        <LeftSide />
                    </Col>
                    <Col sm={10} className="mainContent m-5">
                    {postSuccess && <Alert variant="success">Post Updated</Alert>}
                        <Card className="createPost-card border-0">
                            <Card.Title>Create a new post</Card.Title>
                            <form onSubmit={e => handleSubmit(e)}>
                                <div className="form-group col-md-8 no-border">
                                    <label for="title">Post description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={createPost.title}
                                        onChange={handleIChange}
                                        placeholder="Enter Post title"
                                    />
                                    <label for="body" className="mt-2">Post description</label>
                                    <Form.Control as="textarea"
                                        id="body"
                                        name="body"
                                        value={createPost.body}
                                        onChange={handleIChange}
                                        placeholder="Post Description"
                                        rows={4}
                                        className="mb-4 "
                                    />
                                    <Button variant="info" onClick={handleSubmit}>Submit Post</Button>
                                </div>
                            </form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CreatePost;