import express from 'express';
import cors from 'cors';
import * as OpenApiValidator from 'express-openapi-validator';
import { specJson } from '@ncd/openapi-master';

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(
  OpenApiValidator.middleware({
    apiSpec: specJson.file,
    validateRequests: true,
    validateResponses: true,
  }),
);

app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

export default app;
