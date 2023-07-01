import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DirectorUpdate() {
    const [query, setQuery] = useState({
        "platform_id": null,
    });

    const navigate = useNavigate();
    const location = useLocation();

    const username = location.pathname.split("/")[3];
    console.log(username)

    const handleChange = (e) => {
        setQuery(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        console.log(query['platform_id']);
        try {
            await axios.put(`http://localhost:8800/all-users/${username}`, query);
            alert('User is updated succesfuly!')
            navigate('/databasehub');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section>
            <div className='form'>
                <h2>Update the platform_id</h2>
                <input type="number" placeholder='platform_id' onChange={handleChange} name='platform_id'/>
            </div>
            <button onClick={handleClick}>Update</button>
        </section>
    );
}
export default DirectorUpdate