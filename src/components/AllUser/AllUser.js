import React, { useEffect, useState } from 'react';
import './AllUser.css';
import { Jumbotron, Col, InputGroup, FormControl, Row, Table, Form, Container, Button } from 'react-bootstrap';
import Navs from '../Header/Navs';
import LeftSide from '../LeftSide/LeftSide';
import { Link } from "react-router-dom";
import Pagination from './Pagination';

const AllUser = () => {
    const [users, setUsers] = useState([]);
    const [userSearch, setUserSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [userPerPage, setUserPerPage] = useState(3);
    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState('albums');

    const userUrl = `https://jsonplaceholder.typicode.com/users`;
    useEffect(() => {

        const indexofLastUser = currentPage * userPerPage;
        const indexofFirstUser = indexofLastUser - userPerPage;
        const currentUser = users.slice(indexofFirstUser, indexofLastUser);
        setData(currentUser);

        fetch(userUrl)
            .then((response) => response.json())
            .then((data) => {
                setUsers(data)
                setData(data)
            });
    }, [userUrl]);

    //filter search 
    const searchUser = (tr) => {
        return tr.filter(tr =>
            tr.name.toLowerCase().indexOf(userSearch.toLowerCase()) !== -1 ||
            tr.email.toLowerCase().indexOf(userSearch.toLowerCase()) !== -1 ||
            tr.website.toLowerCase().indexOf(userSearch.toLowerCase()) !== -1
        )
    };

    //get User
    const indexofLastUser = currentPage * userPerPage;
    const indexofFirstUser = indexofLastUser - userPerPage;
    let currentUser = users.slice(indexofFirstUser, indexofLastUser);

    //change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleUserSerach = (e) => {
        const newsearchValue = e.target.value;
        setUserSearch(newsearchValue);
    }

    const handlePaginationUser = (e) => {
        console.log(e.target.value)
        setUserPerPage(e.target.value)
    }
    // Sorting table
 
    useEffect(() => {
        setData(currentUser);
        const sortArray = type => {
            const types = {
                name: 'name',
                email: 'email'
            };
            const sortProperty = types[type];
            const sorted = [...data].sort((a, b) => b[sortProperty] - a[sortProperty]);
            setData(...data, sorted);
            console.log(data)
        };

        sortArray(sortType);
    }, [sortType]);
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <Navs />
                    </Col>
                </Row>
                <Row>
                    <Col md={2} className="leftSide mt-5">
                        <LeftSide />
                    </Col>
                    <Col md={10} className="mainContent mt-5">
                        <Jumbotron >
                            <Container>
                                <Row className="mx-auto">
                                    <Col md={8} className="mx-auto mt-5">
                                        <h3 className="text-center mb-10">All Users</h3>
                                        <Form>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                    placeholder="Search User"
                                                    onChange={handleUserSerach}
                                                    value={userSearch ? userSearch : ''}
                                                    name="userSearch"
                                                    id="userSearch"
                                                />
                                                <InputGroup.Append>
                                                    <Button variant="success">Search </Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                        </Jumbotron>
                        <Container>
                            <Col md={2}>
                                <h5>Sort by
                                <select onChange={(e) => setSortType(e.target.value)}>
                                        <option value="name">Name</option>
                                        <option value="email">Email</option>
                                    </select>
                                </h5>
                            </Col>
                            <table className="user">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Website</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="user-tbale-body">
                                    {currentUser.length ? searchUser(currentUser).map((user, idx3) =>
                                        <tr key={idx3}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.website}</td>
                                            <td><Link to={`/users/${user.id}`}>View Details</Link></td>
                                        </tr>
                                    ) : 'No user found'}
                                </tbody>
                            </table>
                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group controlId="paginationperpage">
                                            <Form.Label>User Per Page</Form.Label>
                                            <Form.Control style={{ width: '100px', marginLeft: '10px' }} as="select" onChange={handlePaginationUser} custom>
                                                <option>3</option>
                                                <option>5</option>
                                                <option>10</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </Col>

                                <Col md={6} className='d-flex justify-content-end'>
                                    <Pagination userPerPage={userPerPage} totalUser={users.length} paginate={paginate}></Pagination>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AllUser;