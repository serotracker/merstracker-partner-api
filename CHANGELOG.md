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