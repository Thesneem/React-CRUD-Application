import React from 'react'
import { Link } from 'react-router-dom'
import '../AdminHeader/AdminHeader.css'
const AdminHeader = () => {
    return (
        <div>
            <header className="header">
                <h1 className="logo"><Link to='/admin/dashboard'>Admin Dashboard</Link></h1>
                <ul className="main-nav">
                    <li><Link to=''></Link></li>
                    <li><Link to='/admin/adduser'>AddUser</Link></li>
                    <li><Link to='/admin/dashboard'>Settings</Link></li>
                    <li><Link to='/admin/dashboard'>Reports</Link></li>
                    <li><span onClick={() => { localStorage.removeItem('jwtToken') }}><Link to='/admin'>Logout</Link></span></li>
                </ul>
            </header>
        </div >

    )
}

export default AdminHeader