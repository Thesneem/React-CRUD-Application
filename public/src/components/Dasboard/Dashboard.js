import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AdminHeader from '../AdminHeader/AdminHeader'
import Table from '../Table/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { setUsers, deleteUser, editUser } from '../../redux/UserSlice'
import { Form } from 'react-bootstrap';

// import Search from '../Search/Search'


const Dashboard = () => {
    const users = useSelector(state => state.users.users)
    const dispatch = useDispatch()
    // const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:3001/admin/dashboard?search=${search}`, {
            credentials: true
        })
            .then(response => {
                console.log(response.data.user + 'Hi');
                dispatch(setUsers(response.data.user))
            })
            .catch(error => {
                console.log(error);
            });
    }, [dispatch, search]);

    const handleDeleteUser = (id) => {
        // console.log(userToDelete)

        // Make a POST request to the backend API endpoint to delete the user
        axios.post(`http://localhost:3001/admin/deleteuser/${id}`)
            .then(response => {
                // If the request is successful, dispatch the deleteUser action with the userToDelete parameter
                dispatch(deleteUser(id))
            })
            .catch(error => {
                console.log(error);
            });
    }
    const handleEdituser = (user) => {
        console.log(user + 'postedoit')
        axios.post(`http://localhost:3001/admin/edituser/${user._id}`, user)
            .then(response => {
                dispatch(editUser(user))
                console.log(user + 'DispatchedUser')
            })
            .catch(err => {
                console.group(err)
            })
    }

    // const handleSearch = (query) => {
    //     setSearchQuery(query)
    // }
    // const filteredUsers = users.filter(user => {
    //     return user.name.toLowerCase().includes(searchQuery.toLowerCase())
    // })


    return (
        <div>

            <AdminHeader />
            <div>
                <div className='container '>
                    <div className='row m-3'>
                        <Form className="product--SearchForm "  >
                            <input type="text" className="adduserinput" name="search" placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {/* <input type="submit" value="search" /> */}
                        </Form>
                        <Table users={users} onDeleteUser={handleDeleteUser} onEditUser={handleEdituser} />
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Dashboard