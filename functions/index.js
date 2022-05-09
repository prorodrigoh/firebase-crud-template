import functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import { templateRoutes } from './src/routes/template.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(templateRoutes);

export const api = functions.https.onRequest(app)