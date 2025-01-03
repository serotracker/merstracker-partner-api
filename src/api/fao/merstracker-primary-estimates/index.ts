import { RequestHandler } from "express";
import { MongoClient } from "mongodb";
import { isHumanMersAgeGroupSubEstimate, isMersSeroprevalenceSubEstimateInformation, MersEstimateType, MersPrimaryEstimateDocument, MersSubEstimateInformation } from "../../../storage/types.js";

interface GenerateMersPrimaryEstimatesRequestHandlerInput {
  mongoClient: MongoClient;
}

interface GenerateMersPrimaryEstimatesRequestHandlerOutput {
  mersPrimaryEstimatesRequestHandler: RequestHandler;
}

const mapSubestimateInformationForApi = (subestimateInformation: MersSubEstimateInformation): MersSubEstimateInformation => ({
  sampleDenominator: subestimateInformation.sampleDenominator,
  sampleNumerator: subestimateInformation.sampleNumerator,
  ...(isMersSeroprevalenceSubEstimateInformation(subestimateInformation) ? {
    seroprevalence: subestimateInformation.seroprevalence,
    seroprevalence95CILower: subestimateInformation.seroprevalence95CILower,
    seroprevalence95CIUpper: subestimateInformation.seroprevalence95CIUpper
  } : {
    positivePrevalence: subestimateInformation.positivePrevalence,
    positivePrevalence95CILower: subestimateInformation.positivePrevalence95CILower,
    positivePrevalence95CIUpper: subestimateInformation.positivePrevalence95CIUpper
  })
})

enum AgeGroupSubestimateType {
  ANIMAL_AGE_GROUP = "ANIMAL_AGE_GROUP",
  HUMAN_AGE_GROUP = "HUMAN_AGE_GROUP",
}

export const generateMersPrimaryEstimatesRequestHandler = (
  input: GenerateMersPrimaryEstimatesRequestHandlerInput
): GenerateMersPrimaryEstimatesRequestHandlerOutput => {
  const { mongoClient } = input;
  const databaseName = process.env.DATABASE_NAME;

  const mersPrimaryEstimatesRequestHandler: RequestHandler = async(request, response) => {
    let partitionKey: number = NaN

    try {
      const queryPartitionKey = request.query.partitionKey;
      if(!!queryPartitionKey && typeof queryPartitionKey === 'string') {
        partitionKey = parseInt(queryPartitionKey)
      }
    }
    catch (error) {
      return response.status(400).json({ message: "No valid partitionKey specified. The partition key must be a number" });
    }

    if(Number.isNaN(partitionKey)) {
      return response.status(400).json({ message: "No valid partitionKey specified. The partition key must be a number" });
    }

    if(partitionKey !== 1) {
      return response.json([]);
    }

    const mersPrimaryEstimatesCollection = mongoClient.db(databaseName).collection<MersPrimaryEstimateDocument>('mersPrimaryEstimates');
    const mersPrimaryEstimates = await mersPrimaryEstimatesCollection.find({}).toArray();

    return response.json(mersPrimaryEstimates.map((mersPrimaryEstimate) => ({
      id: mersPrimaryEstimate._id.toHexString(),
      estimateId: mersPrimaryEstimate.estimateId,
      primaryEstimateInfo: {
        id: mersPrimaryEstimate.primaryEstimateInfo.id.toHexString(),
        type: mersPrimaryEstimate.primaryEstimateInfo.type,
        estimateId: mersPrimaryEstimate.primaryEstimateInfo.estimateId,
        city: mersPrimaryEstimate.primaryEstimateInfo.city,
        state: mersPrimaryEstimate.primaryEstimateInfo.state,
        country: mersPrimaryEstimate.primaryEstimateInfo.country,
        countryAlphaTwoCode: mersPrimaryEstimate.primaryEstimateInfo.countryAlphaTwoCode,
        countryAlphaThreeCode: mersPrimaryEstimate.primaryEstimateInfo.countryAlphaThreeCode,
        latitude: mersPrimaryEstimate.primaryEstimateInfo.latitude,
        longitude: mersPrimaryEstimate.primaryEstimateInfo.longitude,
        whoRegion: mersPrimaryEstimate.primaryEstimateInfo.whoRegion,
        unRegion: mersPrimaryEstimate.primaryEstimateInfo.unRegion,
        firstAuthorFullName: mersPrimaryEstimate.primaryEstimateInfo.firstAuthorFullName,
        antigen: mersPrimaryEstimate.primaryEstimateInfo.antigen,
        exposureToCamels: mersPrimaryEstimate.primaryEstimateInfo.exposureToCamels,
        samplingMethod: mersPrimaryEstimate.primaryEstimateInfo.samplingMethod,
        sourcePublicationYear: mersPrimaryEstimate.primaryEstimateInfo.sourcePublicationYear,
        sourceUrl: mersPrimaryEstimate.primaryEstimateInfo.sourceUrl,
        sourceType: mersPrimaryEstimate.primaryEstimateInfo.sourceType,
        sourceTitle: mersPrimaryEstimate.primaryEstimateInfo.sourceTitle,
        institution: mersPrimaryEstimate.primaryEstimateInfo.insitutution,
        studyInclusionCriteria: mersPrimaryEstimate.primaryEstimateInfo.studyInclusionCriteria,
        studyExclusionCriteria: mersPrimaryEstimate.primaryEstimateInfo.studyExclusionCriteria,
        sensitivity: mersPrimaryEstimate.primaryEstimateInfo.sensitivity,
        sensitivity95CILower: mersPrimaryEstimate.primaryEstimateInfo.sensitivity95CILower,
        sensitivity95CIUpper: mersPrimaryEstimate.primaryEstimateInfo.sensitivity95CIUpper,
        sensitivityDenominator: mersPrimaryEstimate.primaryEstimateInfo.sensitivityDenominator,
        specificity: mersPrimaryEstimate.primaryEstimateInfo.specificity,
        specificity95CILower: mersPrimaryEstimate.primaryEstimateInfo.specificity95CILower,
        specificity95CIUpper: mersPrimaryEstimate.primaryEstimateInfo.specificity95CIUpper,
        specificityDenominator: mersPrimaryEstimate.primaryEstimateInfo.specificityDenominator,
        sampleDenominator: mersPrimaryEstimate.primaryEstimateInfo.sampleDenominator,
        sampleNumerator: mersPrimaryEstimate.primaryEstimateInfo.sampleNumerator,
        assay: mersPrimaryEstimate.primaryEstimateInfo.assay,
        specimenType: mersPrimaryEstimate.primaryEstimateInfo.specimenType,
        sex: mersPrimaryEstimate.primaryEstimateInfo.sex,
        isotypes: mersPrimaryEstimate.primaryEstimateInfo.isotypes,
        samplingStartDate: mersPrimaryEstimate.primaryEstimateInfo.samplingStartDate?.toISOString(),
        samplingEndDate: mersPrimaryEstimate.primaryEstimateInfo.samplingEndDate?.toISOString(),
        samplingMidDate: mersPrimaryEstimate.primaryEstimateInfo.samplingMidDate?.toISOString(),
        geographicScope: mersPrimaryEstimate.primaryEstimateInfo.geographicScope,
        testProducer: mersPrimaryEstimate.primaryEstimateInfo.testProducer,
        testValidation: mersPrimaryEstimate.primaryEstimateInfo.testValidation,
        sequencingDone: mersPrimaryEstimate.primaryEstimateInfo.sequencingDone,
        clade: mersPrimaryEstimate.primaryEstimateInfo.clade,
        accessionNumbers: mersPrimaryEstimate.primaryEstimateInfo.accessionNumbers,
        genomeSequenced: mersPrimaryEstimate.primaryEstimateInfo.genomeSequenced,
        ...( mersPrimaryEstimate.primaryEstimateInfo.type === MersEstimateType.HUMAN_SEROPREVALENCE ? {
          seroprevalence: mersPrimaryEstimate.primaryEstimateInfo.seroprevalence,
          seroprevalence95CILower: mersPrimaryEstimate.primaryEstimateInfo.seroprevalence95CILower,
          seroprevalence95CIUpper: mersPrimaryEstimate.primaryEstimateInfo.seroprevalence95CIUpper,
          ageGroup: mersPrimaryEstimate.primaryEstimateInfo.ageGroup,
          sampleFrames: mersPrimaryEstimate.primaryEstimateInfo.sampleFrames,
          humanCountriesOfTravel: mersPrimaryEstimate.primaryEstimateInfo.humanCountriesOfTravel.map((element) => ({
            country: element.country,
            countryAlphaTwoCode: element.countryAlphaTwoCode,
            countryAlphaThreeCode: element.countryAlphaThreeCode
          }))
        } : {}),
        ...( mersPrimaryEstimate.primaryEstimateInfo.type === MersEstimateType.ANIMAL_SEROPREVALENCE ? {
          seroprevalence: mersPrimaryEstimate.primaryEstimateInfo.seroprevalence,
          seroprevalence95CILower: mersPrimaryEstimate.primaryEstimateInfo.seroprevalence95CILower,
          seroprevalence95CIUpper: mersPrimaryEstimate.primaryEstimateInfo.seroprevalence95CIUpper,
          animalSpecies: mersPrimaryEstimate.primaryEstimateInfo.animalSpecies,
          animalType: mersPrimaryEstimate.primaryEstimateInfo.animalType,
          animalDetectionSettings: mersPrimaryEstimate.primaryEstimateInfo.animalDetectionSettings,
          animalPurpose: mersPrimaryEstimate.primaryEstimateInfo.animalPurpose,
          animalImportedOrLocal: mersPrimaryEstimate.primaryEstimateInfo.animalImportedOrLocal,
          animalAgeGroup: mersPrimaryEstimate.primaryEstimateInfo.animalAgeGroup,
          animalCountriesOfImport: mersPrimaryEstimate.primaryEstimateInfo.animalCountriesOfImport.map((element) => ({
            country: element.country,
            countryAlphaTwoCode: element.countryAlphaTwoCode,
            countryAlphaThreeCode: element.countryAlphaThreeCode
          }))
        } : {}),
        ...( mersPrimaryEstimate.primaryEstimateInfo.type === MersEstimateType.HUMAN_VIRAL ? {
          positivePrevalence: mersPrimaryEstimate.primaryEstimateInfo.positivePrevalence,
          positivePrevalence95CILower: mersPrimaryEstimate.primaryEstimateInfo.positivePrevalence95CILower,
          positivePrevalence95CIUpper: mersPrimaryEstimate.primaryEstimateInfo.positivePrevalence95CIUpper,
          ageGroup: mersPrimaryEstimate.primaryEstimateInfo.ageGroup,
          sampleFrames: mersPrimaryEstimate.primaryEstimateInfo.sampleFrames,
          humanCountriesOfTravel: mersPrimaryEstimate.primaryEstimateInfo.humanCountriesOfTravel.map((element) => ({
            country: element.country,
            countryAlphaTwoCode: element.countryAlphaTwoCode,
            countryAlphaThreeCode: element.countryAlphaThreeCode
          }))
        } : {}),
        ...( mersPrimaryEstimate.primaryEstimateInfo.type === MersEstimateType.ANIMAL_VIRAL ? {
          positivePrevalence: mersPrimaryEstimate.primaryEstimateInfo.positivePrevalence,
          positivePrevalence95CILower: mersPrimaryEstimate.primaryEstimateInfo.positivePrevalence95CILower,
          positivePrevalence95CIUpper: mersPrimaryEstimate.primaryEstimateInfo.positivePrevalence95CIUpper,
          animalSpecies: mersPrimaryEstimate.primaryEstimateInfo.animalSpecies,
          animalType: mersPrimaryEstimate.primaryEstimateInfo.animalType,
          animalDetectionSettings: mersPrimaryEstimate.primaryEstimateInfo.animalDetectionSettings,
          animalPurpose: mersPrimaryEstimate.primaryEstimateInfo.animalPurpose,
          animalImportedOrLocal: mersPrimaryEstimate.primaryEstimateInfo.animalImportedOrLocal,
          animalAgeGroup: mersPrimaryEstimate.primaryEstimateInfo.animalAgeGroup,
          animalCountriesOfImport: mersPrimaryEstimate.primaryEstimateInfo.animalCountriesOfImport.map((element) => ({
            country: element.country,
            countryAlphaTwoCode: element.countryAlphaTwoCode,
            countryAlphaThreeCode: element.countryAlphaThreeCode
          }))
        } : {}),
      },
      geographicalAreaSubestimates: mersPrimaryEstimate.geographicalAreaSubestimates.map((subestimate) => ({
        id: subestimate.id,
        estimateId: subestimate.estimateId,
        estimateInfo: mapSubestimateInformationForApi(subestimate.estimateInfo),
        city: subestimate.city,
        state: subestimate.state,
        district: subestimate.district,
        country: subestimate.country,
        countryAlphaTwoCode: subestimate.countryAlphaTwoCode,
        countryAlphaThreeCode: subestimate.countryAlphaThreeCode,
        latitude: subestimate.latitude,
        longitude: subestimate.longitude,
        whoRegion: subestimate.whoRegion,
        unRegion: subestimate.unRegion,
        geographicScope: subestimate.geographicScope
      })),
      ageGroupSubestimates: mersPrimaryEstimate.ageGroupSubestimates.map((subestimate) => ({
        id: subestimate.id,
        estimateId: subestimate.estimateId,
        estimateInfo: mapSubestimateInformationForApi(subestimate.estimateInfo),
        ...(isHumanMersAgeGroupSubEstimate(subestimate) ? {
          type: AgeGroupSubestimateType.HUMAN_AGE_GROUP,
          ageGroup: subestimate.ageGroup,
          ageGroupLabel: subestimate.ageGroupLabel,
        } : {
          type: AgeGroupSubestimateType.ANIMAL_AGE_GROUP,
          animalAgeGroup: subestimate.animalAgeGroup,
          animalAgeGroupLabel: subestimate.animalAgeGroupLabel,
        })
      })),
      testUsedSubestimates: mersPrimaryEstimate.testUsedSubestimates.map((subestimate) => ({
        id: subestimate.id,
        estimateId: subestimate.estimateId,
        estimateInfo: mapSubestimateInformationForApi(subestimate.estimateInfo),
        assay: subestimate.assay
      })),
      animalSpeciesSubestimates: mersPrimaryEstimate.animalSpeciesSubestimates.map((subestimate) => ({
        id: subestimate.id,
        estimateId: subestimate.estimateId,
        estimateInfo: mapSubestimateInformationForApi(subestimate.estimateInfo),
        animalSpecies: subestimate.animalSpecies
      })),
      sexSubestimates: mersPrimaryEstimate.sexSubestimates.map((subestimate) => ({
        id: subestimate.id,
        estimateId: subestimate.estimateId,
        estimateInfo: mapSubestimateInformationForApi(subestimate.estimateInfo),
        sex: subestimate.sex
      })),
      timeFrameSubestimates: mersPrimaryEstimate.timeFrameSubestimates.map((subestimate) => ({
        id: subestimate.id,
        estimateId: subestimate.estimateId,
        estimateInfo: mapSubestimateInformationForApi(subestimate.estimateInfo),
        samplingStartDate: subestimate.samplingStartDate,
        samplingEndDate: subestimate.samplingEndDate,
      })),
      sampleTypeSubestimates: mersPrimaryEstimate.sampleTypeSubestimates.map((subestimate) => ({
        id: subestimate.id,
        estimateId: subestimate.estimateId,
        estimateInfo: mapSubestimateInformationForApi(subestimate.estimateInfo),
        specimenType: subestimate.specimenType
      })),
      occupationSubestimates: mersPrimaryEstimate.occupationSubestimates.map((subestimate) => ({
        id: subestimate.id,
        estimateId: subestimate.estimateId,
        estimateInfo: mapSubestimateInformationForApi(subestimate.estimateInfo),
        occupation: subestimate.occupation,
        sampleFrames: subestimate.sampleFrames,
        exposureToCamels: subestimate.exposureToCamels
      })),
      animalSourceLocationSubestimates: mersPrimaryEstimate.animalSourceLocationSubestimates.map((subestimate) => ({
        id: subestimate.id,
        estimateId: subestimate.estimateId,
        estimateInfo: mapSubestimateInformationForApi(subestimate.estimateInfo),
        animalImportedOrLocal: subestimate.animalImportedOrLocal,
        animalCountryOfImport: subestimate.animalCountriesOfImport.at(0),
        animalCountryOfImportAlphaTwoCode: subestimate.animalCountriesOfImport.at(0),
        animalCountryOfImportAlphaThreeCode: subestimate.animalCountriesOfImport.at(0),
        animalCountriesOfImport: subestimate.animalCountriesOfImport
      })),
      animalSamplingContextSubestimates: mersPrimaryEstimate.animalSamplingContextSubestimates.map((subestimate) => ({
        id: subestimate.id,
        estimateId: subestimate.estimateId,
        estimateInfo: mapSubestimateInformationForApi(subestimate.estimateInfo),
        animalDetectionSettings: subestimate.animalDetectionSettings
      })),
      camelExposureLevelSubestimates: mersPrimaryEstimate.camelExposureLevelSubestimates.map((subestimate) => ({
        id: subestimate.id,
        estimateId: subestimate.estimateId,
        estimateInfo: mapSubestimateInformationForApi(subestimate.estimateInfo),
        details: subestimate.details,
        sampleFrames: subestimate.sampleFrames,
        exposureToCamels: subestimate.exposureToCamels
      })),
      nomadismSubestimates: mersPrimaryEstimate.nomadismSubestimates.map((subestimate) => ({
        id: subestimate.id,
        estimateId: subestimate.estimateId,
        estimateInfo: mapSubestimateInformationForApi(subestimate.estimateInfo),
        details: subestimate.details
      })),
      humanCountriesOfTravelSubestimates: mersPrimaryEstimate.humanCountriesOfTravelSubestimates.map((subestimate) => ({
        id: subestimate.id,
        estimateId: subestimate.estimateId,
        estimateInfo: mapSubestimateInformationForApi(subestimate.estimateInfo),
        humanCountriesOfTravel: subestimate.humanCountriesOfTravel.map((element) => ({
          country: element.country,
          countryAlphaTwoCode: element.countryAlphaTwoCode,
          countryAlphaThreeCode: element.countryAlphaThreeCode
        }))
      }))
    })))
  }

  return {
    mersPrimaryEstimatesRequestHandler
  }
}
