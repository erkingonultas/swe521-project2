import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DirectorAdd() {
    const [query, setQuery] = useState({
        "username": "",
        "password": "",
        "name": "",
        "surname": "",
        "user_type": "director",
        "nationality": "",
        "platform_id": null,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setQuery(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/all-users", query);
            alert('New user added succesfuly!')
            navigate('/databasehub');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section>
            <div className='form'>
                <h2>Add new director</h2>
                <input type="text" placeholder='username' onChange={handleChange} name='username'/>
                <input type="text" placeholder='password' onChange={handleChange} name='password'/>
                <input type="text" placeholder='name' onChange={handleChange} name='name'/>
                <input type="text" placeholder='surname' onChange={handleChange} name='surname'/>
                <input type="text" placeholder='nationality' onChange={handleChange} name='nationality'/>
                <input type="number" placeholder='platform_id' onChange={handleChange} name='platform_id'/>
            </div>
            <button onClick={handleClick}>Add</button>
        </section>
    );
}
export default DirectorAdd