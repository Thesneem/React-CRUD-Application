import React, { useState } from 'react'
import axios from 'axios'

const Search = () => {

    const [search, setSearch] = useState('')

    const searchUsers = (e) => {
        e.preventDefault()
        axios.get(`http://localhost:3001/admin/dashboard?search=${search}`, {
            credentials: true
        })
    }

    return (
        <div>

            <div className="input-group rounded d-flex justify-content-between">
                {/* <form className='d-flex' >
                    <input type="search"
                        className="form-control rounded"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="search-addon"


                    />
                    <span className="input-group-text border-0" id="search-addon">
                        <button >search</button>
                    </span>
                </form> */}


                <form className="product--SearchForm" onSubmit={searchUsers} >
                    <input type="text" className="product--Search" name="search" placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <input type="submit" value="search" />
                </form>
            </div>
        </div >
    )
}

export default Search