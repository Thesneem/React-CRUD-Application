import React, { useEffect, useState } from 'react'
import Header from '../UserHeader/Header'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setUsers, editUser } from '../../redux/UserSlice'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';



function Profile() {
    const users = useSelector(state => state.users.users)
    const dispatch = useDispatch()

    const [selectedUser, setSelectedUser] = useState('')

    const [image, setImage] = useState(null)
    const [showEditModal, setShowEditModal] = useState(false)

    const handleCloseEditModal = () => setShowEditModal(false)
    const handleShowEditModal = (users) => {
        setSelectedUser(users);
        console.log('LLALLALA' + users)
        setShowEditModal(true)

    }

    // const handleEdit = () => {
    //     onEditUser(selectedUser)
    //     console.log(selectedUser + 'SelectedUSER')
    //     // setSelectedUser(null)
    //     handleCloseEditModal()
    // }
    const handleEdituser = (user) => {
        console.log(user + 'postedoit')


        axios.post(`http://localhost:3001/admin/edituser/${user._id}`, user)
            .then(response => {
                console.log(response + 'DispatchedUser')
                handleCloseEditModal()

                dispatch(editUser(response.data.user))

            })
            .catch(err => {
                console.group(err)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // handleCloseEditModal()

    }
    const handleImage = (e) => {
        e.preventDefault()
        const form = new FormData();
        form.append('image', image)
        axios.post('http://localhost:3001/editimage', form, {
            headers: {
                'token': `Bearer ${localStorage.getItem('jwtToken')}`

            }
        })
            .then(res => {
                setImage(null)
                console.log(res)
                if (res.data.type === 'Success') {
                    toast.success('Success');
                }

            })
            .catch((err) => {
                console.log(err)
            })


    }

    useEffect(() => {
        axios.get(`http://localhost:3001/profile`, {
            headers: {
                'token': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
            .then(response => {
                console.log(response.data.user + 'TEST');
                // const profileData = response.data
                dispatch(setUsers(response.data.user))
            })


            .catch(error => {
                console.log(error);

            })
    }, [dispatch, image])


    return (
        <div>
            <Header />

            <>
                {/* <div className="container"> */}


                <div className="container">
                    <h1>Profile</h1>
                    <hr />
                    <div className="row">
                        <div className="text-center mt-5 ">
                            <div className="d-flex-column justify-content-center align-items-center ">
                                <img
                                    src={users.image ? `http://localhost:3001/public/images/${users.image}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                                    className="avatar img-circle"
                                    alt="avatar"
                                    style={{
                                        width: '200px', height: '200px'
                                    }}
                                />
                            </div>
                            <Form onSubmit={handleImage} encType='multipart/form-data' style={{
                                width: "250px", margin: "0 auto"
                            }} >
                                <Form.Group className='form-group mb-2' >
                                    <Form.Label>ProfilePic</Form.Label>
                                    <Form.Control
                                        className=''
                                        type="file"
                                        value=""
                                        name="image"
                                        accept='.png,.jpg,.jpeg'
                                        onChange={(e) => setImage(e.target.files[0])}

                                    />
                                    <button>Upload</button>
                                </Form.Group>
                            </Form>

                            <h3>Personal info</h3>
                            <label className=" control-label">Name:<span>{users.name}</span></label>
                            <label className=" control-label">Email:<span>{users.email}</span></label>
                            <button onClick={() => {
                                // if (selectedUser)
                                handleShowEditModal(users)

                            }
                            }>Edit Profile</button>


                        </div>
                    </div>
                </div>
                {/* </div> */}
                <Modal show={showEditModal} onHide={handleCloseEditModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}  >
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"

                                    value={selectedUser.name}
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
                                    value={selectedUser.email}
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
                        <Button variant="primary" onClick={() => handleEdituser(selectedUser)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>


            </>
            <ToastContainer />
        </div >
    )
}

export default Profile