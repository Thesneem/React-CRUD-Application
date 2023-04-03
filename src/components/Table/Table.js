import React, { useState, } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';


const Table = (props) => {

    const [selectedUser, setSelectedUser] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false)


    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = () => setShowDeleteModal(true);

    const handleCloseEditModal = () => setShowEditModal(false)
    const handleShowEditModal = (user) => {
        setSelectedUser(user);
        console.log('LLALLALA' + user)
        setShowEditModal(true)

    }
    // useEffect(() => {
    //     if (selectedUser) {
    //         setShowEditModal(true);
    //     }
    // }, [selectedUser]);

    const handleDelete = () => {
        props.onDeleteUser(selectedUser)
        setSelectedUser(null)
        handleCloseDeleteModal();
    }
    const handleEdit = () => {
        props.onEditUser(selectedUser)
        console.log(selectedUser + 'SelectedUSER')
        // setSelectedUser(null)
        handleCloseEditModal()
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     handleEdit(selectedUser)
    //     console.log(selectedUser + 'handlesubmit')
    // }

    // const handleEdit = (user) => {
    //     console.log('handeEdit')
    //     props.onEditUser(user)
    //     handleCloseEditModal()
    // }


    return (

        <div className="m-3 d-flex-column text-center">
            <h3>Users Table</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map((user, index) => (
                        <tr key={user._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button
                                    className="btn btn-primary m-2"
                                    onClick={() => {
                                        // setSelectedUser(user._id)
                                        handleShowEditModal(user)
                                    }}
                                >
                                    Edit
                                </button>
                                <span>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            setSelectedUser(user._id);
                                            handleShowDeleteModal();
                                        }}
                                    >
                                        Delete
                                    </button>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {selectedUser && selectedUser.name}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"

                                value={selectedUser && selectedUser.name}
                                onChange={(event) =>
                                    setSelectedUser({
                                        ...selectedUser,
                                        name: event.target.value,
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={selectedUser && selectedUser.email}
                                onChange={(event) =>
                                    setSelectedUser({
                                        ...selectedUser,
                                        email: event.target.value,
                                    })
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


        </div >
    );
};

export default Table;
