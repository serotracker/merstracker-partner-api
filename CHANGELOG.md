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