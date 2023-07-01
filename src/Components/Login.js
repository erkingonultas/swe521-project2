import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';
import axios from 'axios';

function Login() {
    const [managerList, setManagerList] = useState([]);
    const [directorList, setDirectorList] = useState([]);
    const [audienceList, setAudienceList] = useState([]);
    const [userType, setUserType] = useState("database manager");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

useEffect(() =>{
    const fetchAllManagers = async () => {
        try {
            const res = await axios.get("http://localhost:8800/managers")
            setManagerList(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchDirectorList = async () => {
        try {
            const res = await axios.get("http://localhost:8800/all-directors")
            setDirectorList(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchAudienceList = async () => {
        try {
            const res = await axios.get("http://localhost:8800/all-audience")
            setAudienceList(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    fetchDirectorList()
    fetchAudienceList()
    fetchAllManagers()
},[])


const handleSubmit = (event) => {
    console.log(userType);
        event.preventDefault();
        var isUserNameExists = false;
        var isPasswordCorrect = false;
        switch (userType) {
            case "database manager":
                for(var i = 0; i < managerList.length; i++) {
                    if(userName === managerList[i].username) {
                        isUserNameExists = true;
                    }
                    if(password === managerList[i].password) {
                        isPasswordCorrect = true
                    }
                }
                if(isUserNameExists && isPasswordCorrect){
                    alert('you have been signed in as a database manager');
                    navigate("/databasehub");
                } else if(!isPasswordCorrect && isUserNameExists) {
                    alert('incorrect password');
                } else {
                    alert('user not found');
                }
                break;
            case "director":
                for(var j = 0; j < directorList.length; j++) {
                    if(userName === directorList[j].username) {
                        isUserNameExists = true;
                    }
                    if(password === directorList[j].password) {
                        isPasswordCorrect = true
                    }
                }
                if(isUserNameExists && isPasswordCorrect){
                    alert('you have been signed in as a director');
                    navigate("/directorshub");
                } else if(!isPasswordCorrect && isUserNameExists) {
                    alert('incorrect password');
                } else {
                    alert('user not found');
                }
                break;
            case "audience":
                for(var k = 0; k < audienceList.length; k++) {
                    if(userName === audienceList[k].username) {
                        isUserNameExists = true;
                    }
                    if(password === audienceList[k].password) {
                        isPasswordCorrect = true
                    }
                }
                if(isUserNameExists && isPasswordCorrect){
                    alert('you have been signed in as an audience member');
                    navigate("/audiencehub");
                } else if(!isPasswordCorrect && isUserNameExists) {
                    alert('incorrect password');
                } else {
                    alert('user not found');
                }
                break;
            default:
                break;
        }
        
};

    return (
        <>
            <section className="App">
                <form className="App-body" onSubmit={handleSubmit}>
                    <img src={logo} className="App-logo" alt="logo" />
                    <h5>I am a {userType}</h5>
                    <button onClick={() =>setUserType("database manager")}>database manager</button><button onClick={() =>setUserType("director")}>director</button><button onClick={() =>setUserType("audience")}>audience</button>
                    <div className='name'>
                        <label htmlFor="userName">User Name</label>
                        <input
                            required
                            key={'userName'}
                            type="text"
                            id="userName"
                            placeholder='Username'
                            minLength={2}
                            maxLength={64}
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className='name'>
                        <label htmlFor="password">Password </label>
                        <input
                            required
                            key={'password'}
                            type="password"
                            id="password"
                            placeholder='password'
                            minLength={2}
                            maxLength={64}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        key={'login-button'}
                        value="login"
                        className='btn'
                    >Login</button>
                </form>
            </section>
        </>
    );
}

export default Login