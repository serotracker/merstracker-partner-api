import { Router } from 'express';
import { generateMersPrimaryEstimatesRequestHandler } from './fao/merstracker-primary-estimates/index.js'
import { MongoClient } from 'mongodb';

interface GenerateRouterInput {
  mongoClient: MongoClient;
}

interface GenerateRouterOutput {
  router: Router;
}

const generateRouter = (input: GenerateRouterInput): GenerateRouterOutput => {
  const { mongoClient } = input;

  const router = Router();

  const { mersPrimaryEstimatesRequestHandler } = generateMersPrimaryEstimatesRequestHandler({
    mongoClient
  })

  router.get('/fao/merstracker-primary-estimates', mersPrimaryEstimatesRequestHandler);

  return {
    router
  }
}

export {
  generateRouter
};