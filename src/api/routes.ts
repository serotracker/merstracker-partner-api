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
  router.use('/api-docs', serve, setup(swaggerDocument, {
    customCss: ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"
  }));

  return {
    router
  }
}

export {
  generateRouter
};