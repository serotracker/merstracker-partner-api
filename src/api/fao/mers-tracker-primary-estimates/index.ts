import { RequestHandler } from "express";
import { MongoClient } from "mongodb";
import { MersPrimaryEstimateDocument } from "../../../storage/types.js";

interface GenerateMersPrimaryEstimatesRequestHandlerInput {
  mongoClient: MongoClient;
}

interface GenerateMersPrimaryEstimatesRequestHandlerOutput {
  mersPrimaryEstimatesRequestHandler: RequestHandler;
}

export const generateMersPrimaryEstimatesRequestHandler = (
  input: GenerateMersPrimaryEstimatesRequestHandlerInput
): GenerateMersPrimaryEstimatesRequestHandlerOutput => {
  const { mongoClient } = input;
  const databaseName = process.env.DATABASE_NAME;

  const mersPrimaryEstimatesRequestHandler: RequestHandler = async(request, response) => {
    const mersPrimaryEstimatesCollection = mongoClient.db(databaseName).collection<MersPrimaryEstimateDocument>('mersPrimaryEstimates');
    const mersPrimaryEstimates = await mersPrimaryEstimatesCollection.find({}).toArray();

    return response.json(mersPrimaryEstimates.map((mersPrimaryEstimate) => ({
      id: mersPrimaryEstimate._id.toHexString(),
      estimateId: mersPrimaryEstimate.estimateId
    })))
  }

  return {
    mersPrimaryEstimatesRequestHandler
  }
}
