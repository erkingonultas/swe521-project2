import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

function DatabaseHub() {
    const [directorList, setDirectorList] = useState([]);
    const [audienceList, setAudienceList] = useState([]);
    const [directorMovies, setDirectorMovies] = useState([]);
    const [currentDirector, setCurrentDirector] = useState("");
    useEffect(() => {
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
    }, [])

    const fetchDirectorMovies = async (director_username, director_name, director_surname) => {
        try {
            const res = await axios.get(`http://localhost:8800/director-movies/${director_username}`);
            setCurrentDirector(director_name + " " + director_surname.toUpperCase())
            console.log(res.data)
            setDirectorMovies(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <section>
                <h2>DATABASE HUB</h2>
                <div className="all-directors">
                    <h4>All Directors <button><Link to="/databasehub/director-add">+</Link></button><button>-</button></h4>
                    <ul className="user-list">
                        {
                            directorList.map((director) => (
                                <li className="user-item" key={director.username}>
                                    <p>{director.name} {director.surname.toUpperCase()}, {director.nationality}</p>
                                    <small>{director.username}, {director.platform_id}</small>
                                    <button><Link to={`/databasehub/director-update/${director.username}`}>update platform_id</Link></button>
                                    <button onClick={() => fetchDirectorMovies(director.username, director.name, director.surname)}>View Movies</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="all-audience">
                    <h4>All Audiences<button><Link to="/databasehub/audience-add">+</Link></button><button><Link to="/databasehub/audience-remove">-</Link></button></h4>
                    <ul className="user-list">
                        {
                            audienceList.map((audience) => (
                                <li className="user-item" key={audience.username}>
                                    <p>{audience.name} {audience.surname.toUpperCase()}, {audience.nationality}</p>
                                    <small>{audience.username}, {audience.platform_id}</small>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="director-movies">
                    {directorMovies.length !== 0 &&
                        <>
                        <h4>Movie Sessions</h4>
                        <h5>Directed by {currentDirector}</h5>
                            <ul className="movie-list">
                                {
                                    directorMovies.map((movie) => (
                                        <li className="movie-item" key={movie.session_id}>
                                            <p>movie_id: {movie.movie_id}, movie_name: {movie.movie_name.toUpperCase()}</p>
                                            <small>theatre_id: {movie.theatre_id}, district: {movie.theatre_district}, time_slot: {movie.time_slot}</small>
                                        </li>
                                    ))
                                }
                            </ul>
                        </>
                    }
                    {
                        (directorMovies.length === 0 && currentDirector !== "") &&
                        <>
                        <h4>Movie Sessions</h4>
                        <h5>Directed by {currentDirector}</h5>
                        <small>No movie found. Select a different director.</small>
                        </>
                    }
                </div>
            </section>
        </>
    );
}


export default DatabaseHub