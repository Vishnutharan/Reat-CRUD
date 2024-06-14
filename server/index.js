const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User'); // Ensure this is correctly implemented

const app = express();
app.use(cors());         // This is the coros platform which is heip to the font end & back end server in the same time, enable cross-origin requests
app.use(express.json()); //JSON parsing for the Express.js application

// Connect to MongoDB // specifies the host, port, and database name
mongoose.connect("mongodb://127.0.0.1:27017/crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))  //This line specifies a callback function to be executed when the connection is successful.
    .catch(err => console.log(err));              //This line specifies a callback function to be executed if an error occurs during the connection process.

app.get('/', (req, res) => {                     //callback function ,callback function
    UserModel.find({})                          // This line uses the find() method of the UserModel to retrieve all documents from the users collection. The empty object {} specifies that all documents should be retrieved.
        .then(users => res.json(users))
        .catch(err => res.json(err))
});

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id }, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
        .then(res => res.json(res))
        .catch(err => res.json(err))
})
// Endpoint to create a user
app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
});

// Start the server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
