import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function DirectorsHub() {
    const [movieList, setMovieList] = useState([]);
   
    useEffect(() => {
        const fetchMovieList = async () => {
            try {
                const res = await axios.get("http://localhost:8800/all-movies")
                setMovieList(res.data)
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMovieList()
    }, [])


    return (
        <>
            <section>
                <h2>DIRECTORS HUB</h2>
                <div className="movies">
                {movieList.length !== 0 &&
                        <>
                        <h4>Movie Sessions <button onClick={() => alert("add movies")}>+</button></h4>
                            <ul className="movie-list">
                                {
                                    movieList.map((movie) => (
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
                        (movieList.length === 0) &&
                        <>
                        <h4>There are no movie sessions</h4>
                        
                        </>
                    }
                </div>
            </section>
        </>
    );
}


export default DirectorsHub