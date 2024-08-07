import { RequestHandler } from "express";

interface GenerateMersPrimaryEstimatePartitionsRequestHandlerInput {
}

interface GenerateMersPrimaryEstimatePartitionsRequestHandlerOutput {
  mersPrimaryEstimatePartitionsRequestHandler: RequestHandler;
}

export const generateMersPrimaryEstimatePartitionsRequestHandler = (
  input: GenerateMersPrimaryEstimatePartitionsRequestHandlerInput
): GenerateMersPrimaryEstimatePartitionsRequestHandlerOutput => {
  const mersPrimaryEstimatePartitionsRequestHandler: RequestHandler = async(request, response) => {
    // TODO: Real paritioning when we need it.
    return response.status(200).json({
      partitionKeys: [ 1 ]
    });
  }

  return {
    mersPrimaryEstimatePartitionsRequestHandler
  }
}