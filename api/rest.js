import express from 'express';
import { MongoClient } from "mongodb";
import { generateRouter } from '../public/dist/src/api/routes.js';
import swaggerDocument from "../swagger.json" with { type: "json" };

const mongoUrl = process.env.MONGODB_URI;

if (!mongoUrl) {
  console.log("Unable to find value for MONGODB_URI. Please make sure you have run generate-env-files.sh and have specified one in the appropriate environment file.");
  console.log("Exiting early.");
  process.exit(1);
}

const mongoClient = new MongoClient(mongoUrl);
await mongoClient.connect();

const app = express();
const { router } = generateRouter({ mongoClient, swaggerDocument });

app.use('/', router);

app.all('*', (req, res) => res.status(404).json(new ErrorResponseObject('Route not defined.')));

export default app;

export const config = {
  api: {
    bodyParser: true
  }
}