import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Row, Col, Table, Button, Modal } from "react-bootstrap";
import axios from 'axios';

const Dashboard = () => {
    const [motorcycles, setMotorcycles] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedItemMerk, setSelectedItemMerk] = useState(null);

    useEffect(() => {
        const fetchMotorcycles = async () => {
            try {
                const response = await axios.get("http://localhost:3000/cuci");
                setMotorcycles(response.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchMotorcycles();
    }, []);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/cuci/${selectedItemMerk}`);
            const updatedData = motorcycles.filter(item => item.merk !== selectedItemMerk);
            setMotorcycles(updatedData);
            handleCloseDeleteModal();
        } catch (error) {
            console.error("Error deleting motorcycle", error);
        }
    };

    const handleShowDeleteModal = (merk) => {
        setSelectedItemMerk(merk);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setSelectedItemMerk(null);
        setShowDeleteModal(false);
    };

    return (
        <div>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-5">
                <Row className="mb-3">
                    <Col className="d-flex justify-content-between align-items-center">
                        <h2>Daftar Motorcycles</h2>
                        <Button variant="primary">Tambah Motorcycle</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Merk</th>
                                    <th>Layanan</th>
                                    <th>Harga</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {motorcycles.map((motorcycle) => (
                                    <tr key={motorcycle._id}>
                                        <td>{motorcycle._id}</td>
                                        <td>{motorcycle.merk}</td>
                                        <td>{motorcycle.layanan}</td>
                                        <td>{motorcycle.harga}</td>
                                        <td>
                                            <Button variant="info" className="me-2">Update</Button>
                                            <Button variant="danger" onClick={() => handleShowDeleteModal(motorcycle.merk)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <footer className="bg-primary text-white text-center py-3 mt-5">
                <Container>
                    <p>&copy; 2024 Sekolah Menengah. All rights reserved.</p>
                </Container>
            </footer>

            {/* Delete Modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Konfirmasi Hapus Motorcycle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Apakah Anda yakin ingin menghapus motorcycle ini?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Batal
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Hapus
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Dashboard;
