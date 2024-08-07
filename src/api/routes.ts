import { Router } from 'express';
import { generateMersPrimaryEstimatesRequestHandler } from './fao/merstracker-primary-estimates/index.js'
import { MongoClient } from 'mongodb';
import { JsonObject, serve, setup } from 'swagger-ui-express';

interface GenerateRouterInput {
  mongoClient: MongoClient;
  swaggerDocument: JsonObject;
}

interface GenerateRouterOutput {
  router: Router;
}

const generateRouter = (input: GenerateRouterInput): GenerateRouterOutput => {
  const { mongoClient, swaggerDocument } = input;

  const router = Router();

  const { mersPrimaryEstimatesRequestHandler } = generateMersPrimaryEstimatesRequestHandler({
    mongoClient
  })

  router.get('/fao/merstracker-primary-estimates', mersPrimaryEstimatesRequestHandler);
  router.use('/api-docs', serve, setup(swaggerDocument));

  return {
    router
  }
}

export {
  generateRouter
};