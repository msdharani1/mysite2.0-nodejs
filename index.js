// Importing required modules
const express = require('express');
const path = require('path');
const firebase = require('firebase');

// Creating an Express application
const app = express();

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCdwwxaeDkUd-cH0GXMg1ndDEll_y6HiKo",
    authDomain: "aristmsdharani.firebaseapp.com",
    projectId: "aristmsdharani",
    storageBucket: "aristmsdharani.appspot.com",
    messagingSenderId: "349890565745",
    appId: "1:349890565745:web:05d4e173e09d58a26a2dd0",
    measurementId: "G-4H9SPRV6V4"
};

firebase.initializeApp(firebaseConfig);

// Setting up static file serving middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Define routes for each HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/tracks', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'tracks.html'));
});

app.get('/own-tracks', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'own-tracks.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/add', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'add-tracks.html'));
});



// Get a reference to the database service
const database = firebase.database();

// Get reference to the tracks node in your Firebase database
const tracksRef = database.ref('new-music'); // Change this to the appropriate database node

function createRoutes() {
  tracksRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
          const trackData = childSnapshot.val();
          const url = trackData.url;
          app.get(`/${url}`, (req, res) => {
              res.sendFile(path.join(__dirname, 'public', 'tracks-detail.html'));
          });
      });
  });
}



// Call the function to create routes dynamically
createRoutes();
// 


// Starting the server
const PORT = process.env.PORT || 2121;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
