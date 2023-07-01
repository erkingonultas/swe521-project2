import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AudienceRemove() {
    const [query, setQuery] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        try {
            await axios.delete("http://localhost:8800/all-users/"+ query);
            alert('User is removed succesfuly!')
            navigate('/databasehub');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section>
            <div className='form'>
                <h2>Remove an audience</h2>
                <input type="text" placeholder='username' onChange={handleChange} name='username'/>
            </div>
            <button onClick={handleClick}>Remove</button>
        </section>
    );
}
export default AudienceRemove