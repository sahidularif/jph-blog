import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router';
import { postsContext, userContext } from '../../App';
import Navs from '../Header/Navs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons';
import LeftSide from '../LeftSide/LeftSide';
import { useHistory } from 'react-router-dom';

const EditPost = () => {
    const { id } = useParams();
    const [allPost] = useContext(postsContext);
    const [postUpdateData, setPostUpdateData] = useState({ title: "", body: "" });    
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const myPost = allPost.find((post) => post.id == id);
    const history = useHistory();

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => setPostUpdateData(data));
    }, [id]);

    const handleSubmit = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${myPost?.id}`, {
            method: 'PUT',
            body: JSON.stringify(postUpdateData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then(() => setUpdateSuccess(true))
        setTimeout(function () {
            setUpdateSuccess(false);
            history.push({
                pathname: `/profile`
            })
        }, 5000);
    }

    return (
        <Container fluid>
            <Row>
                <Col sm={12}>
                    <Navs />
                </Col>
            </Row>
            <Row className="d-flex mt-5 justify-content-center">
                <Col sm={3} className="leftSide">
                    <LeftSide />
                </Col>
                <Col sm={7} className="p-5 mainContent">
                    <Card className="text-dark border-0">
                        {updateSuccess && <Alert variant="success">Post Updated</Alert>}
                        <Card.Title>Update post</Card.Title>
                        <form onSubmit={e => handleSubmit(e)}>
                            <div className="form-group col-md-8 border-0">
                            <label for="title">Post title</label>
                                <input
                                    type="text"
                                    id="title"
                                    className="form-control mb-2"
                                    value={postUpdateData.title}
                                    onChange={(e) =>
                                        setPostUpdateData({ ...postUpdateData, title: e.target.value })
                                    }
                                    placeholder="Enter post title"
                                />
                                 <label for="body" className="mt-2">Post description</label>
                                <Form.Control as="textarea"
                                    onChange={(e) =>
                                        setPostUpdateData({ ...postUpdateData, body: e.target.value })
                                    }
                                    value={postUpdateData.body}
                                    placeholder="Enter post body"
                                    rows={4}
                                    className="mb-4"
                                    id="body"
                                />
                                <Button variant="info" onClick={handleSubmit}><FontAwesomeIcon icon={faSave} /> Save</Button>
                            </div>
                        </form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default EditPost;
