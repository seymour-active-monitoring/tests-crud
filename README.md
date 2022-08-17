# About
This repository contains the code for Seymour's backend service. It provides APIs for the following:

- create/ read/ update/ delete operations for test configurations
- create and read operations for test run data
- triggering a test run on-demand ("run now")
- retrieve side-load data for the UI

Refer to the the [docs](/docs/api.md) for detailed information on each endpoint.

The backend service also utilizes the AWS SDK to configure EventBridge rules.

# Deployment

Seymour's backend service should be deployed along with the entire application. Refer to the following repo for detailed deployment instructions: [infra-setup](https://github.com/seymour-active-monitoring/infra-setup)

