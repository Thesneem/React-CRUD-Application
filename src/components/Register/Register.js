import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Register/Register.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Register() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(values + "ji")
            const { data } = await axios.post('http://localhost:3001/register', {
                ...values,
            }, {
                credentials: true
            })
            console.log(data + 'HEKKOO')
            if (data) {
                diffToast(true)

                localStorage.setItem('jwtToken', data.token);
            }
            else {
                diffToast(false)
                console.log('error')
            }

        }
        catch (err) {
            diffToast(false)
            console.log(err)

        }
    }
    const diffToast = (isSuccess) => {
        if (isSuccess) {
            toast.success('Registration successful', { position: 'top-center' })
        } else {
            toast.error('Registration error, email ID already exists!', { position: 'top-center' })
        }
    }
    return (
        <div className='registerpage'>
            <div className='regcontainer'>
                <h2>Register</h2>
                <form onSubmit={(e) => handleSubmit(e)
                }>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input type='text'
                            name='name'
                            placeholder='Name'
                            value={values.name}
                            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email'
                            name='email'
                            placeholder='Email'
                            value={values.email}
                            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password'
                            name='password'
                            placeholder='Password'
                            value={values.password}
                            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />

                    </div>
                    <button type='submit'>Register</button>
                    <span>
                        Already have an Account?<Link to='/'>Login Here</Link>
                    </span>
                </form>
                <ToastContainer />
            </div >
        </div >

    )
}

export default Register