import React, { useState } from 'react'
import '../AddUser/AddUser.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const AddUser = () => {
    const Navigate = useNavigate()
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        image: ''

    })
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', values.image)
        formData.append('name', values.name)
        formData.append('email', values.email)
        formData.append('password', values.password)

        console.log(values.image)
        axios.post('http://localhost:3001/admin/adduser', formData, { headers: {} })
            .then(res => {
                console.log(res)
                Navigate('/admin/dashboard')

            })
            .catch((err) => {
                console.log(err)
            })

    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleImage = (e) => {
        setValues({ ...values, image: e.target.files[0] })

    }

    return (
        <div>
            <h3>Add User Form</h3>

            <form onSubmit={handleSubmit} encType='multipart/form-data' className='adduserform' >
                <label for="name">Name</label>
                <input type="text" id="name"
                    name="name"
                    placeholder="Name of the User"
                    value={values.name}
                    onChange={handleChange}
                    required />

                <label for="email">Email</label>
                <input type="email" id="email"
                    className='adduserinput'
                    name="email"
                    placeholder="Enter User email"
                    value={values.email}
                    onChange={handleChange}
                    required />

                <label for="password">Password</label>
                <input type="password" id="password"
                    className='adduserinput'
                    name="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    required />

                {/* <label for="profile-image">Profile Image</label>
                <div class="profile-image"></div>
                <input type="file" id="profile-image"
                    name="image"
                    accept='.png,.jpg,.jpeg'
                    onChange={handleImage}
                /> */}

                <button class="button" type="submit">Add User</button>
            </form>
        </div >
    )
}



export default AddUser