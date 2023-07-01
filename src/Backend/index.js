import express from "express"
import cors from "cors"
import mysql from "mysql"

const app = express()
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "swe521",
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("hello, this is the backend.")
})

app.get("/managers", (req, res) => {
    const query = "SELECT * FROM swe521.database_managers"
    db.query(query, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    });
})

app.get("/all-users", (req, res) => {
    const query = "SELECT * FROM swe521.User;"
    db.query(query, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    });
})
app.get("/all-directors", (req, res) => {
    const query = "SELECT * FROM swe521.User WHERE user_type = 'director';"
    db.query(query, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    });
})
app.get("/all-audience", (req, res) => {
    const query = "SELECT * FROM swe521.User WHERE user_type = 'audience';"
    db.query(query, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    });
})
app.get("/all-movies", (req, res) => {
    const query = "SELECT * FROM swe521.movie_sessions"
    db.query(query, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    });
})
app.get("/director-movies/:director_username", (req, res) => {
    const username = req.params.director_username;
    const query = "SELECT * FROM swe521.movie_sessions WHERE (`director_username` = ?);"
    db.query(query,username, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    });
})

// ADD OBJECT
app.post("/all-users", (req, res) => {
    const query = "INSERT INTO `swe521`.`User` (`username`, `password`, `name`, `surname`, `user_type`, `nationality`, `platform_id`) VALUES (?);"
    // const values = ['40003', 'Beyoglu', '50', 'Beyoglu'];
    const values = [
        req.body.username,
        req.body.password,
        req.body.name,
        req.body.surname,
        req.body.user_type,
        req.body.nationality,
        req.body.platform_id,
    ];

    db.query(query, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("user has been added.")
    })
})
app.post("/movie_sessions", (req, res) => {
    const query = "INSERT INTO `swe521`.`movie_sessions` (`movie_id`, `theatre_id`, `time_slot`, `duration`, `platform_id`) VALUES (?);"
    const values = [
        req.body.movie_id,
        req.body.theatre_id,
        req.body.time_slot,
        req.body.duration,
        req.body.platform_id,
    ];

    db.query(query, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("movie has been added.")
    })
})
// REMOVE OBJECT
app.delete("/all-users/:username", (req, res) => {
    const username = req.params.username;
    const query = "DELETE FROM `swe521`.`User` WHERE (`username` = ?);"
    db.query(query, username, (err, data) => {
        if (err) return res.json(err)
        return res.json("user has been deleted.")
    })
})
// UPDATE OBJECT
app.put("/all-users/:username", (req, res) => {
    const username = req.params.username;
    const newPlatformId = req.body.platform_id
    const query = "UPDATE `swe521`.`User` SET `platform_id` = ? WHERE (`username` = ?);"
    db.query(query, [newPlatformId,
        username,], (err, data) => {
        if (err) return res.json(err)
        return res.json("user has been updated.")
    })
})



app.listen(8800, () => {
    console.log('backend connected')
})
