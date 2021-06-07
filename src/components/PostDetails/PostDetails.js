import React, { useState, useEffect, useContext } from 'react';
import { Form, Card, Container, Spinner, Button, Media, Row, Col } from 'react-bootstrap';
import { useParams, Link, useHistory } from "react-router-dom";
import { userContext } from '../../App';
import Navs from '../Header/Navs';

const PostDetails = () => {
    let { id } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [allUser, setAllUser] = useContext(userContext);
    const postAuthor = allUser.find((user) => user.id == post.userId);
    console.log(allUser)
    const postUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
    const comntUrl = `https://jsonplaceholder.typicode.com/comments?postId=${id}`;
    useEffect(() => {
        fetch(postUrl)
            .then((response) => response.json())
            .then((data) => { setPost(data) });
    }, [postUrl]);

    useEffect(() => {
        fetch(comntUrl)
            .then((response) => response.json())
            .then((data) => { setComments(data) });
    }, [comntUrl]);
    return (
        <Container>
            <Row>
                <Col md={12}>
                    <Navs />
                </Col>
            </Row>
            <Row>
                <Col md={10} className="mx-auto mt-3">
                    {post.title && comments ?
                        <Card className='post-card mt-5 shadow'>
                            <Card.Body>
                                <h2>aa{post.title}</h2>
                                <p>By <b>{postAuthor?.name}</b> </p>                   
                        
                                <Card.Text>{post.body}</Card.Text>
                                <hr />
                                <h5>Comments</h5>
                                <br></br>
                                {comments.length > 0 ? comments.map((comment, idx) =>
                                    <Media className="jnMedia border p-3 mb-3 rounded" key={idx}>
                                        <Media.Body>
                                            <h6>{comment.name}</h6>
                                            <p>{comment.email}</p>
                                            <p>{comment.body}</p>
                                        </Media.Body>
                                    </Media>
                                )
                                    : <p>No comment found</p>
                                }

                            </Card.Body>
                        </Card>
                        :
                        <Spinner animation="border" role="status">å
                <span className="sr-only">Loading...</span>
                        </Spinner>
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default PostDetails;