import http from 'http';

import app from './app';

import './routes/persons';

http.createServer(app).listen(3000);

export default app;
