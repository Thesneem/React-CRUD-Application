import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../AdminLogin/AdminLogin.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const Navigate = useNavigate()
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { data } = await axios.post('http://localhost:3001/admin', {
            ...values,
        }, {
            credentials: true
        }
        )
        console.log(data + 'hi')
        if (data.type === 'success') {
            localStorage.setItem('jwtToken', data.token)
            Navigate('/admin/dashboard')
        }
        else {
            Navigate('/admin')
        }

    }
    return (
        <div className='adminpg'>
            <div className='admincontainer'>
                <form onSubmit={handleSubmit}>
                    <h3>Sign In</h3>
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
                            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}

                        />
                    </div>

                    <div className="d-grid mb-5">
                        <button type="submit" className="btn btn-primary ">
                            Submit
                        </button>
                    </div>

                </form>
            </div >
        </div >
    )
}

export default AdminLogin