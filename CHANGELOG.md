# CHANGELOG

## Version 0.1.0 - August 6th 2024

- Set up the initial build of the MERSTracker partner API.
- Added route `/fao/merstracker-primary-estimates`. Fetches primary estimates from our database for use in the FAO's [Empres-I dashboard](https://empres-i.apps.fao.org).

## Version 0.2.0 - August 7th 2024

- Added `swagger.json` for generating API docs.
- Added route `/api-docs` for housing the swagger documentation for the entire API.

## Version 0.3.0 - August 7th 2024

- Added `fao/merstracker-primary-estimate-partitions` to fetch every `partitionKey` in our database.
- [BREAKING] Transformed `/fao/merstracker-primary-estimates` into a `POST` request which accepts a `partitionKey` in the request body.

## Version 0.3.1 - August 7th 2024

- Fixed body parsing on `POST` requests.

## Version 0.3.2 - August 7th 2024

- [BREAKING] `partitionKey` is passed as a query parameter rather than in the body for `/fao/merstracker-primary-estimates`
- [BREAKING] `/fao/merstracker-primary-estimates` is transformed back into a `GET` request.

## Version 0.3.3 - August 11th 2024

- [BREAKING] Changed `specimenType` on `BasicPrimaryMersEstimateInformation` to be a mandatory array of strings rather than an optional string.
- [BREAKING] Changed `specimenType` on `MersSampleTypeSubEstimate` to be an array of strings rather than a mandatory string.

## Version 0.3.4 - August 16th 2024

- Added the `socioeconomicStatus`, `exposureToCamels`, `antigen`, `testProducerOther`, `testValidatedOn`, `positiveCutoff`, `symptomPrevalenceOfPositives`, and `symptomDefinition` fields to `BasicPrimaryMersEstimateInformation`.
- Added an enum to `testProducer` on `BasicPrimaryMersEstimateInformation`.

## Version 0.3.5 - August 16th 2024

- Added the `sampleFrame` and `exposureToCamels` fields to `MersOccupationSubEstimate`.

## Version 0.4.0 - August 30th 2024

- [BREAKING] Added new enum values to several fields (`assay`, `specimenType`, `exposureToCamels`, `antigen`, `testProducer`, `sampleFrame`, `animalDetectionSettings`, and `animalAgeGroup`)
- Added `district` to `MersGeographicalAreaSubEstimate`
- Added `district` to `BasicPrimaryMersEstimateInformation`
- Added the `MersCamelExposureLevelSubEstimate` subestimate type.
- Added the `MersNomadismSubEstimate` subestimate type.
- Added `camelExposureLevelSubestimates` to `BasicPrimaryMersEstimateInformation`.
- Added `nomadismSubestimates` to `BasicPrimaryMersEstimateInformation`.
- Added descriptions for all of the subestimate fields under the primary estimate (Ex. `geographicalAreaSubestimates`, `ageGroupSubestimates`, etc.)
- Added `merstracker-grouped-estimates-geojson.json` which contains all of our data as of right now in the same schema as the API for importing into programs that work better with GeoJSON files over APIs.
- Added `ckan-metadata.json` which is a draft for a CKAN header for importing our data into CKAN systems.

## Version 0.5.0 - September 1st 2024

- [BREAKING] The `animalSpecies` field has a new enum value, `DONKEY`.

## Version 0.6.0 - September 4th 2024

- Added `sequencingDone`, `clade`, `accessionNumbers`, and `genomeSequenced` to `BasicPrimaryMersEstimateInformation`.

## Version 0.7.0 - September 9th 2024

- [BREAKING] Added new enum values to `animalSpecies` (`WATER_BUFFALO` and `BABOON`).
- [BREAKING] Added new enum values to `assay` (`RT-LAMP` and `PRNT`).
- [BREAKING] Added a new enum value to `specimenType` (`Sputum`).
- [BREAKING] Changed one of the enum values for `exposureToCamels` from `No exposure` to `No or limited exposure`.
- [BREAKING] Added new enum values to `antigen` (`LAMP ORF1a`, `S`, and `ORF1b`).
- [BREAKING] Added new enum values to `testProducer` (`Corman`, `QProbe`, and `Eiken`).
- Updated the GeoJSON file to contain the most recent data from Airtable.
- typescript `5.5.4` -> `5.6.2`
- mongodb `6.8.0` -> `6.8.1`

## Version 0.7.1 - September 9th 2024

- Updated the GeoJSON file to contain the most recent data from Airtable.
- Some estimates which previously were missing `sampleNumerator`s and `sampleDenominator`s now derive those values from the seroprevalence if one of the numerator or denominator is missing and the other is present.

## Version 0.7.2 - September 9th 2024

- express `4.19.2` -> `4.20.0` in light of CVE-2024-45296

## Version 0.8.0 - September 12th 2024

- [BREAKING] removed `animalCountryOfImport`, `animalCountryOfImportAlphaTwoCode`, and `animalCountryOfImportAlphaThreeCode` from `MersAnimalSourceLocationSubEstimate` in the GeoJSON file.
- [BREAKING] Made `animalCountryOfImport`, `animalCountryOfImportAlphaTwoCode`, and `animalCountryOfImportAlphaThreeCode` no longer mandatory on `MersAnimalSourceLocationSubEstimate`.
- Updated the GeoJSON file to contain the most recent data from Airtable.
- Added `sourcePublicationYear` to `BasicPrimaryMersEstimateInformation`.
- Deprecated `animalCountryOfImport`, `animalCountryOfImportAlphaTwoCode`, and `animalCountryOfImportAlphaThreeCode` from `MersAnimalSourceLocationSubEstimate` from the Swagger API.
- Added `animalCountriesOfImport` to `MersAnimalSourceLocationSubEstimate` on both the Swagger API and the GeoJSON file.
- express `4.20.0` -> `4.21.0`
- mongodb `6.8.1` -> `6.9.0`

## Version 0.8.1 - September 14th 2024

- Added the `humanCountriesOfTravelSubestimates` field to the `PrimaryMersEstimate` type.
- Added the `animalCountriesOfImport` field to `PrimaryAnimalMersSeroprevalenceEstimateInformation` and `PrimaryAnimalMersViralEstimateInformation`.
- Added the `humanCountriesOfTravel` field to `PrimaryHumanMersSeroprevalenceEstimateInformation` and `PrimaryHumanMersViralEstimateInformation`.
- Fixed bug which would prevent several fields from not appearing in the API responses.

## Version 0.9.0 - September 26th 2024

- [BREAKING] Added "Not reported" to the enum for `assay`.
- [BREAKING] Added "Bronchiol (BAL)" to the enum for `specimenType`.
- [BREAKING] Added "TaqMan" to the enum for `testProducer`.
- [BREAKING] Added "Not reported" to the enum for `clade`.
- [BREAKING] Added "Camel herders" to the enum for `sampleFrame`.