import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Login/Login.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validate()) {
            await axios.post('http://localhost:3001/login', {
                ...values,
            }, {
                credentials: true
            }
            ).then((res) => {
                console.log(res)

                if (res.data.type === 'success') {
                    // console.log("hiiToken")
                    console.log(res.data.token)
                    toast.success('Success');
                    localStorage.setItem('jwtToken', res.data.token)
                    navigate('/home')

                    // diffToast()
                }
                if (res.status === 400) {
                    toast.error("Invalid Credentials")
                }
            })

                .catch((err) => {
                    toast.error('Login Failed due to :' + err.message);
                    navigate('/')
                })
        }
    }

    const validate = () => {
        let result = true;
        if (values.email === '' || values.email === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (values.password === '' || values.password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }


    return (

        <div className='loginpage'>
            <div className='logcontainer'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor='email'>Email<span className="errmsg">*</span></label>
                        <input type='email'
                            name='email'
                            placeholder='Email'
                            value={values.email}

                            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password<span className="errmsg">*</span></label>
                        <input type='password'
                            name='password'
                            placeholder='Password'
                            value={values.password}
                            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}

                        />
                    </div>
                    <button type='submit' >Login</button>
                    <span>
                        Don't have an Account?<Link to='/register'>Register Here</Link>
                    </span>
                </form>
                <ToastContainer />
            </div >
        </div >
    )
}

export default Login