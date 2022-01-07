const http = require('http');
const express = require('express');

const app = express();

app.use(express.static('./dist/html'));
app.use(express.static('./dist/js'));

http.createServer(app).listen(8000);
