import React from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios'
import '../UserHeader/Header.css'
// import Profile from '../Profile/Profile';

const Header = () => {
    // const [profileData, setProfileData] = useState(null);

    // const getProfile = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:3001/profile', {
    //             headers: {
    //                 'token': `Bearer ${localStorage.getItem('jwtToken')}`
    //             }
    //         });
    //         console.log(response.data);
    //         setProfileData(response.data)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };


    return (
        <div className='homepage' >
            <div>
                <div>
                    <ul className='loginul' >
                        <li><Link to='/home' >Home</Link></li>
                        <li > <Link to='/profile'>Profile</Link></li>
                        <li style={{ float: "right" }}><span onClick={() => { localStorage.removeItem('jwtToken') }}> <Link to='/'>Logout</Link> </span></li>

                    </ul>
                </div >

                {/* {profileData && <Profile profileData={profileData} />} */}

            </div >
        </div >
    )
};
export default Header 