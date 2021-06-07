import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { postContext } from '../../App';
import BlogPost from '../BlogPost/BlogPost';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainContent = () => {
    const limit = 10;
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [loadingPost, setLoadingPost] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUserList = () => {
            setLoading(true);
            fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)
                .then(res => res.json())
                .then(res => {
                    setTotalPages(page + 1);
                    setLoadingPost([...loadingPost, ...res]);
                    setLoading(false);
                });
        }
        getUserList();
    }, [page]);
    return (
        <Container fluid="md" className="mt-2">
            <Row>
                <Col className="">
                    <h6>PINNED POST</h6>
                </Col>
            </Row>
            <Row>
                <Col className="">
                    {
                        loadingPost.map((posts, id) => <BlogPost key={id} posts={posts} />)
                    }
                    <div className="clearfix"></div>

                    {(totalPages !== limit + 1) ?
                        (<button className="btn-primary" onClick={() => setPage(page + 1)}>{loading ? 'Loading...' : 'Load More'}</button>)
                        :
                        (<p>There are no post</p>)}
                </Col>
            </Row>
        </Container>
    );
};

export default MainContent;