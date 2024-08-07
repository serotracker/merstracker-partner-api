import { ObjectId } from "mongodb";
import { UNRegion } from "./un-regions.js";
import { WHORegion } from "./who-regions.js";

enum MersAnimalSpecies {
  CAMEL = "CAMEL",
  SHEEP = "SHEEP",
  GOAT = "GOAT",
  CATTLE = "CATTLE",
  BAT = "BAT",
}

enum MersAnimalType {
  DOMESTIC = "DOMESTIC",
  WILD = "WILD",
}

export enum MersEstimateType {
  HUMAN_VIRAL = 'HUMAN_VIRAL',
  ANIMAL_VIRAL = 'ANIMAL_VIRAL',
  HUMAN_SEROPREVALENCE = 'HUMAN_SEROPREVALENCE',
  ANIMAL_SEROPREVALENCE = 'ANIMAL_SEROPREVALENCE',
}

enum MersSubGroupingVariable {
  PRIMARY = 'PRIMARY',
  ANIMAL_SPECIES = 'ANIMAL_SPECIES',
  TEST_USED = 'TEST_USED',
  GEOGRAPHICAL_AREA = 'GEOGRAPHICAL_AREA',
  TIME_FRAME = 'TIME_FRAME',
  SAMPLE_TYPE = 'SAMPLE_TYPE',
  OCCUPATION = 'OCCUPATION',
  ANIMAL_SOURCE_LOCATION = 'ANIMAL_SOURCE_LOCATION',
  ANIMAL_SAMPLING_CONTEXT = 'ANIMAL_SAMPLING_CONTEXT',
  AGE = 'AGE',
  SEX = 'SEX',
}

interface MersEstimateDocumentBase {
  _id: ObjectId;
  estimateId: string;
  subGroupingVariable: MersSubGroupingVariable;
  city: string | undefined;
  state: string | undefined;
  country: string;
  countryAlphaTwoCode: string;
  countryAlphaThreeCode: string;
  whoRegion: WHORegion | undefined;
  unRegion: UNRegion | undefined;
  latitude: number;
  longitude: number;
  firstAuthorFullName: string;
  sourceUrl: string;
  sourceType: string;
  sourceTitle: string;
  insitutution: string | undefined;
  studyInclusionCriteria: string | undefined;
  studyExclusionCriteria: string | undefined;
  sensitivity: number | undefined;
  sensitivity95CILower: number | undefined;
  sensitivity95CIUpper: number | undefined;
  sensitivityDenominator: number | undefined;
  specificity: number | undefined;
  specificity95CILower: number | undefined;
  specificity95CIUpper: number | undefined;
  specificityDenominator: number | undefined;
  sampleDenominator: number | undefined;
  sampleNumerator: number | undefined;
  assay: string[];
  specimenType: string | undefined;
  sex: string | undefined;
  isotypes: string[];
  samplingStartDate: Date | undefined;
  samplingEndDate: Date | undefined;
  samplingMidDate: Date | undefined;
  samplingMethod: string | undefined;
  geographicScope: string | undefined;
  testProducer: string[];
  testValidation: string[];
  createdAt: Date;
  updatedAt: Date;
}

type HumanMersSeroprevalenceEstimateDocument = MersEstimateDocumentBase & {
  type: MersEstimateType.HUMAN_SEROPREVALENCE;
  seroprevalence: number;
  seroprevalence95CILower: number | undefined;
  seroprevalence95CIUpper: number | undefined;
  ageGroup: string[];
  sampleFrame: string | undefined;
}

type HumanMersViralEstimateDocument = MersEstimateDocumentBase & {
  type: MersEstimateType.HUMAN_VIRAL;
  positivePrevalence: number;
  positivePrevalence95CILower: number | undefined;
  positivePrevalence95CIUpper: number | undefined;
  ageGroup: string[];
  sampleFrame: string | undefined;
}

type AnimalMersSeroprevalenceEstimateDocument = MersEstimateDocumentBase & {
  type: MersEstimateType.ANIMAL_SEROPREVALENCE;
  seroprevalence: number;
  seroprevalence95CILower: number | undefined;
  seroprevalence95CIUpper: number | undefined;
  animalSpecies: MersAnimalSpecies;
  animalType: MersAnimalType[];
  animalDetectionSettings: string[];
  animalPurpose: string | undefined;
  animalImportedOrLocal: string | undefined;
  animalAgeGroup: string[];
}

type AnimalMersViralEstimateDocument = MersEstimateDocumentBase & {
  type: MersEstimateType.ANIMAL_VIRAL;
  positivePrevalence: number;
  positivePrevalence95CILower: number | undefined;
  positivePrevalence95CIUpper: number | undefined;
  animalSpecies: MersAnimalSpecies;
  animalType: MersAnimalType[];
  animalDetectionSettings: string[];
  animalPurpose: string | undefined;
  animalImportedOrLocal: string | undefined;
  animalAgeGroup: string[];
}

type PrimaryMersEstimateInformation = (
  | Omit<HumanMersSeroprevalenceEstimateDocument, '_id'|'createdAt'|'updatedAt'>
  | Omit<HumanMersViralEstimateDocument, '_id'|'createdAt'|'updatedAt'>
  | Omit<AnimalMersSeroprevalenceEstimateDocument, '_id'|'createdAt'|'updatedAt'>
  | Omit<AnimalMersViralEstimateDocument, '_id'|'createdAt'|'updatedAt'>
) & {
  id: ObjectId;
  createdAt: undefined;
  updatedAt: undefined;
};

interface MersSubEstimateInformationBase {
  sampleDenominator: number | undefined;
  sampleNumerator: number | undefined;
}

type MersSeroprevalenceSubEstimateInformation = MersSubEstimateInformationBase & {
  seroprevalence: number;
  seroprevalence95CILower: number | undefined;
  seroprevalence95CIUpper: number | undefined;
}


type MersViralSubEstimateInformation = MersSubEstimateInformationBase & {
  positivePrevalence: number;
  positivePrevalence95CILower: number | undefined;
  positivePrevalence95CIUpper: number | undefined;
}

export type MersSubEstimateInformation = 
  | MersSeroprevalenceSubEstimateInformation
  | MersViralSubEstimateInformation;

  export const isMersSeroprevalenceSubEstimateInformation = (subestimate: MersSubEstimateInformation): subestimate is Extract<typeof subestimate, { seroprevalence: number} > => {
    return 'seroprevalence' in subestimate && typeof subestimate['seroprevalence'] === 'number';
  }
  
  export const isMersViralSubEstimateInformation = (subestimate: MersSubEstimateInformation): subestimate is Extract<typeof subestimate, { positivePrevalence: number} > => {
    return 'positivePrevalence' in subestimate && typeof subestimate['positivePrevalence'] === 'number';
  }

interface MersSubEstimateBase {
  id: string;
  estimateId: string;
  estimateInfo: MersSubEstimateInformation;
}
  
type MersGeographicalAreaSubEstimate = MersSubEstimateBase & {
  city: string | undefined;
  state: string | undefined;
  country: string;
  countryAlphaTwoCode: string;
  countryAlphaThreeCode: string;
  latitude: number;
  longitude: number;
  whoRegion: WHORegion | undefined;
  unRegion: UNRegion | undefined;
  geographicScope: string | undefined;
}

type HumanMersAgeGroupSubEstimate = MersSubEstimateBase & {
  ageGroup: string[];
  ageGroupLabel: string;
}

type AnimalMersAgeGroupSubEstimate = MersSubEstimateBase & {
  animalAgeGroup: string[];
  animalAgeGroupLabel: string;
}

type MersAgeGroupSubEstimate = HumanMersAgeGroupSubEstimate | AnimalMersAgeGroupSubEstimate;

export const isHumanMersAgeGroupSubEstimate = (subestimate: MersAgeGroupSubEstimate): subestimate is Extract<MersAgeGroupSubEstimate, { ageGroup: string[] }> => {
  return 'ageGroup' in subestimate && Array.isArray(subestimate['ageGroup'])
}

export const isAnimalMersAgeGroupSubEstimate = (subestimate: MersAgeGroupSubEstimate): subestimate is Extract<MersAgeGroupSubEstimate, { animalAgeGroup: string[] }> => {
  return 'animalAgeGroup' in subestimate && Array.isArray(subestimate['animalAgeGroup'])
}

type MersTestUsedSubEstimate = MersSubEstimateBase & {
  assay: string[];
}

type MersAnimalSpeciesSubEstimate = MersSubEstimateBase & {
  animalSpecies: MersAnimalSpecies;
}

type MersSexSubEstimate = MersSubEstimateBase & {
  sex: string;
}

type MersTimeFrameSubEstimate = MersSubEstimateBase & {
  samplingStartDate: Date;
  samplingEndDate: Date;
}

type MersSampleTypeSubEstimate = MersSubEstimateBase & {
  specimenType: string;
}

type MersOccupationSubEstimate = MersSubEstimateBase & {
  occupation: string;
}

type MersAnimalSourceLocationSubEstimate = MersSubEstimateBase & {
  animalImportedOrLocal: string;
  animalCountryOfImport: string;
  animalCountryOfImportAlphaTwoCode: string;
  animalCountryOfImportAlphaThreeCode: string;
}

type MersAnimalSamplingContextSubEstimate = MersSubEstimateBase & {
  animalDetectionSettings: string[];
}

export interface MersPrimaryEstimateDocument {
  _id: ObjectId;
  estimateId: string;
  primaryEstimateInfo: PrimaryMersEstimateInformation;
  geographicalAreaSubestimates: MersGeographicalAreaSubEstimate[];
  ageGroupSubestimates: MersAgeGroupSubEstimate[];
  testUsedSubestimates: MersTestUsedSubEstimate[];
  animalSpeciesSubestimates: MersAnimalSpeciesSubEstimate[];
  sexSubestimates: MersSexSubEstimate[];
  timeFrameSubestimates: MersTimeFrameSubEstimate[];
  sampleTypeSubestimates: MersSampleTypeSubEstimate[];
  occupationSubestimates: MersOccupationSubEstimate[];
  animalSourceLocationSubestimates: MersAnimalSourceLocationSubEstimate[];
  animalSamplingContextSubestimates: MersAnimalSamplingContextSubEstimate[];
  createdAt: Date;
  updatedAt: Date;
}