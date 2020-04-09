// server.js
const express = require('express');
const path = require('path');
const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('api/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares)
server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}))
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static('client/build'))
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

server.use(router)
server.listen(4000, () => {
    console.log('JSON Server is running')
})
