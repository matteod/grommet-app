// server.js
const express = require('express');
const path = require('path');
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('api/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}))
server.use(router)
server.listen(4000, () => {
    console.log('JSON Server is running')
})


const app = express();
const port = process.env.PORT || 5000;
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
app.listen(port, () => console.log(`Listening on port ${port}`));