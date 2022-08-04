<!-- TOC -->

- [1. API Documentation](#1-api-documentation)
  * [1.1. POST /api/tests](#11-post--api-tests)
    + [1.1.1. Expected Payload](#111-expected-payload)
    + [1.1.2. Successful Response](#112-successful-response)
      - [1.1.2.1. Example Response](#1121-example-response)
      - [1.1.3 Forwarded Payload](#113-forwarded-payload)
  * [1.2. GET /api/tests](#12-get--api-tests)
    + [1.2.1. Expected Payload](#121-expected-payload)
    + [1.2.2. Successful Response](#122-successful-response)
      - [1.2.2.1. Example Response](#1221-example-response)
      - [1.2.3 Forwarded Payload](#123-forwarded-payload)
  * [1.3. GET /api/tests/:id](#13-get--api-tests--id)
    + [1.3.1. Expected Payload](#131-expected-payload)
    + [1.3.2. Successful Response](#132-successful-response)
      - [1.3.2.1. Example Response](#1321-example-response)
      - [1.3.3 Forwarded Payload](#133-forwarded-payload)
  * [1.4.0 GET /api/sideload](#140-get--api-sideload)
    + [1.4.1. Expected Payload](#141-expected-payload)
    + [1.4.2. Successful Response](#142-successful-response)
      - [1.4.2.1. Example Response](#1421-example-response)
      - [1.4.3 Forwarded Payload](#143-forwarded-payload)
  * [1.5.0 POST /api/tests/:id/run](#150-post--api-tests--id-run)
    + [1.5.1. Expected Payload](#151-expected-payload)
    + [1.5.2. Successful Response](#152-successful-response)
      - [1.5.2.1. Example Response](#1521-example-response)
      - [1.5.3 Forwarded Payload](#153-forwarded-payload)
  * [1.5.0 GET /api/tests/:id/runs](#150-get--api-tests--id-runs)
    + [1.5.1. Expected Payload](#151-expected-payload-1)
    + [1.5.2. Successful Response](#152-successful-response-1)
      - [1.5.2.1. Example Response](#1521-example-response-1)
      - [1.5.3 Forwarded Payload](#153-forwarded-payload-1)
  * [1.6.0. GET /api/tests/:testId/runs/:runId](#160-get--api-tests--testid-runs--runid)
    + [1.6.1. Expected payload](#161-expected-payload)
    + [1.6.2. Successful response](#162-successful-response)
      - [1.6.2.1 Example response](#1621-example-response)
  * [1.7.0. DELETE /api/tests/:testId](#170-delete--api-tests--testid)
    + [1.6.1. Expected payload](#161-expected-payload-1)
    + [1.6.2. Successful response](#162-successful-response-1)
  * [1.7. PUT /api/tests/:id](#17-put--api-tests--id)
    + [1.7.1. Expected Payload](#171-expected-payload)
    + [1.7.2. Successful Response](#172-successful-response)
      - [1.7.2.1. Example Response](#1721-example-response)
      - [1.7.3 Forwarded Payload](#173-forwarded-payload)

<!-- /TOC -->
<!-- generated using: https://ecotrust-canada.github.io/markdown-toc/ -->

# 1. API Documentation

## 1.1. POST /api/tests

Creates a synthetic test

### 1.1.1. Expected Payload

```json
{
    "test": {
        "title": "0731-t2",
        "locations": [
            "us-east-1"
        ],
        "minutesBetweenRuns": "60",
        "type": "api",
        "httpRequest": {
            "method": "get",
            "url": "https://trellific.corkboard.dev/api/boards",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": {
                "board": {
                    "title": "0731-t3 board"
                }
            },
            "assertions": [
                {
                    "type": "responseTime",
                    "property": "",
                    "comparison": "lessThan",
                    "target": "500"
                },
                {
                    "type": "statusCode",
                    "property": "",
                    "comparison": "equalTo",
                    "target": "200"
                },
                {
                    "type": "header",
                    "property": "access-control-allow-origin",
                    "comparison": "equalTo",
                    "target": "*"
                },
                {
                    "type": "body",
                    "property": "",
                    "comparison": "contains",
                    "target": "_id"
                }
            ]
        },
        "alertChannels": [
          {
            "type": "slack",
            "destination": "https://hooks.slack.com/services/...",
            "alertsOnRecovery": false,
            "alertsOnFailure": true
          },
          {
            "type": "email",
            "destination": "name@domain.com",
            "alertsOnRecovery": false,
            "alertsOnFailure": true
          },
          {
              "type": "discord",
              "destination": "https://discord.com/api/webhooks/...",
              "alertsOnRecovery": false,
              "alertsOnFailure": true
          }
        ]
    }
}
```

### 1.1.2. Successful Response

The new test is returned in JSON format with a 201 response status code.

#### 1.1.2.1. Example Response

```text
Test my-new-test created
```

#### 1.1.3 Forwarded Payload

The payload received from the client (refer to 1.1.1) is forwarded to EventBridge for use as the "Input to Target" JSON largely without modification (ids are added for the test and assertions).


## 1.2. GET /api/tests

Get all tests and results from last three runs

### 1.2.1. Expected Payload

no payload

### 1.2.2. Successful Response

The tests are returned in JSON format with a 200 response status code.

#### 1.2.2.1. Example Response

```json
{
    "tests": [
        {
            "id": 14,
            "name": "New-UI-test",
            "minutesBetweenRuns": 1,
            "createdAt": "2022-07-28T04:31:38.157Z",
            "runs": [
                {
                    "id": 847,
                    "testId": 14,
                    "success": true,
                    "createdAt": "2022-07-28T04:33:47.514Z",
                    "assertions": []
                },
                {
                    "id": 846,
                    "testId": 14,
                    "success": false,
                    "createdAt": "2022-07-28T04:33:47.238Z",
                    "assertions": []
                },
                {
                    "id": 845,
                    "testId": 14,
                    "success": false,
                    "createdAt": "2022-07-28T04:33:00.915Z",
                    "assertions": []
                }
            ]
        },
        {
            "id": 100000,
            "name": "first-get-test",
            "minutesBetweenRuns": 5,
            "createdAt": "2022-07-27T04:07:31.632Z",
            "runs": [
                {
                    "id": 840,
                    "testId": 100000,
                    "success": false,
                    "createdAt": "2022-07-28T04:20:39.445Z",
                    "assertions": []
                },
                {
                    "id": 100001,
                    "testId": 100000,
                    "success": true,
                    "createdAt": "2022-07-27T04:07:31.632Z",
                    "assertions": []
                },
                {
                    "id": 100000,
                    "testId": 100000,
                    "success": true,
                    "createdAt": "2022-07-27T04:07:31.632Z",
                    "assertions": []
                }
            ]
        },
        {
            "id": 100001,
            "name": "first-post-test",
            "minutesBetweenRuns": 5,
            "createdAt": "2022-07-27T04:07:31.632Z",
            "runs": [
                {
                    "id": 100004,
                    "testId": 100001,
                    "success": null,
                    "createdAt": "2022-07-27T04:07:31.632Z",
                    "assertions": []
                },
                {
                    "id": 100003,
                    "testId": 100001,
                    "success": true,
                    "createdAt": "2022-07-27T04:07:31.632Z",
                    "assertions": []
                }
            ]
        }
    ]
}
```

#### 1.2.3 Forwarded Payload

none

## 1.3. GET /api/tests/:id

Get all runs for a single test

### 1.3.1. Expected Payload

no payload

### 1.3.2. Successful Response

The tests runs are returned in JSON format with a 200 response status code.

#### 1.3.2.1. Example Response

```json
[
    {
        "name": "get",
        "url": "https://trellific.corkboard.dev/api/boards",
        "region": "us-east-1",
        "type": "responseTimeMs",
        "property": null,
        "actual_value": "237",
        "comparison": "lessThan",
        "expected_value": "500",
        "success": true
    },
    {
        "name": "get",
        "url": "https://trellific.corkboard.dev/api/boards",
        "region": "us-east-1",
        "type": "statusCode",
        "property": null,
        "actual_value": "200",
        "comparison": "equalTo",
        "expected_value": "200",
        "success": true
    },
    {
        "name": "get",
        "url": "https://trellific.corkboard.dev/api/boards",
        "region": "us-east-2",
        "type": "responseTimeMs",
        "property": null,
        "actual_value": "423",
        "comparison": "lessThan",
        "expected_value": "500",
        "success": true
    },
    {
        "name": "get",
        "url": "https://trellific.corkboard.dev/api/boards",
        "region": "us-east-2",
        "type": "statusCode",
        "property": null,
        "actual_value": "200",
        "comparison": "equalTo",
        "expected_value": "200",
        "success": true
    },
    {
        "name": "get",
        "url": "https://trellific.corkboard.dev/api/boards",
        "region": "us-west-1",
        "type": "responseTimeMs",
        "property": null,
        "actual_value": "96",
        "comparison": "lessThan",
        "expected_value": "500",
        "success": true
    },
    {
        "name": "get",
        "url": "https://trellific.corkboard.dev/api/boards",
        "region": "us-west-1",
        "type": "statusCode",
        "property": null,
        "actual_value": "200",
        "comparison": "equalTo",
        "expected_value": "200",
        "success": true
    }
]
```

#### 1.3.3 Forwarded Payload

none

## 1.4.0 GET /api/sideload

Get sideload data 

### 1.4.1. Expected Payload

no payload

### 1.4.2. Successful Response

The tests runs are returned in JSON format with a 200 OK response status code.

#### 1.4.2.1. Example Response

```json
{
  "comparisons": [
    {
      "id": 1,
      "name": "equalTo",
      "display_name": "Equal to",
      "symbol": "=",
      "supported": true
    },
    {
      "id": 2,
      "name": "notEqualTo",
      "display_name": "Not equal to",
      "symbol": "!=",
      "supported": true
    },
  ],
  "regions": [
    {
      "id": 1,
      "name": "usEast1",
      "display_name": "N. Virginia",
      "aws_name": "us-east-1",
      "flag_url": "https://countryflagsapi.com/png/usa",
      "supported": true
    },
    {
      "id": 2,
      "name": "usEast2",
      "display_name": "Ohio",
      "aws_name": "us-east-2",
      "flag_url": "https://countryflagsapi.com/png/usa",
      "supported": false
    },
  ],
  "httpsMethod": [
    {
      "id": 1,
      "name": "get",
      "display_name": "GET",
      "supported": true
    },
    {
      "id": 2,
      "name": "post",
      "display_name": "POST",
      "supported": true
    },
  ],
  "assertionTypesResult": [
    {
      "id": 1,
      "name": "responseTime",
      "display_name": "Response time",
      "supported": true
    },
    {
      "id": 2,
      "name": "statusCode",
      "display_name": "Status code",
      "supported": true
    },
  ]
}

```

#### 1.4.3 Forwarded Payload

none

## 1.5.0 POST /api/tests/:id/run

Run single test run

### 1.5.1. Expected Payload

no payload

### 1.5.2. Successful Response

200 response status code.

#### 1.5.2.1. Example Response

200 OK

#### 1.5.3 Forwarded Payload
```json
{
    "test": {
        "title": "example-title",
        "locations": [
            "us-west-1"
        ],
        "minutesBetweenRuns": 1,
        "type": "API",
        "httpRequest": {
            "method": "GET",
            "url": "https://example-website.com",
            "headers": null,
            "body": null,
            "assertions": {
                "headers": [
                    {
                        "property": "access-control-allow-origin",
                        "target": "*",
                        "comparison": "equal_to"
                    },
                    {
                        "property": "connection",
                        "target": "closed",
                        "comparison": "equal_to"
                    }
                ]
            }
        }
    }
}
```

## 1.5.0 GET /api/tests/:id/runs

Get test runs for a single test

### 1.5.1. Expected Payload

no payload

### 1.5.2. Successful Response

200

#### 1.5.2.1. Example Response

```json
{
    "id": 100001,
    "name": "first-post-test",
    "method": "post",
    "createdAt": "2022-07-27T04:07:31.632Z",
    "runs": [
        {
            "id": 100003,
            "testId": 100001,
            "success": true,
            "completedAt": "2022-07-27T04:07:31.632Z",
            "regionName": "us-east-1",
            "regionDisplayName": "N. Virginia",
            "regionFlagUrl": "https://countryflagsapi.com/png/usa",
            "responseTime": "645",
            "responseStatus": "200",
            "responseBody": {},
            "responseHeaders": {},
            "assertions": [
                {
                    "id": 100002,
                    "type": "statusCode",
                    "property": null,
                    "comparison": "equalTo",
                    "expectedValue": "201",
                    "actualValue": "201",
                    "success": true
                },
                {
                    "id": 100003,
                    "type": "responseTimeMs",
                    "property": null,
                    "comparison": "lessThan",
                    "expectedValue": "600",
                    "actualValue": "598",
                    "success": true
                },
                {
                    "id": 100004,
                    "type": "containsProperty",
                    "property": null,
                    "comparison": "equalTo",
                    "expectedValue": "title",
                    "actualValue": "title",
                    "success": true
                },
                {
                    "id": 100005,
                    "type": "containsValue",
                    "property": "title",
                    "comparison": "equalTo",
                    "expectedValue": "my-test-board",
                    "actualValue": "my-test-board",
                    "success": true
                }
            ]
        },
        {
            "id": 100004,
            "testId": 100001,
            "success": null,
            "completedAt": null,
            "regionName": "us-west-1",
            "regionDisplayName": "N. California",
            "regionFlagUrl": "https://countryflagsapi.com/png/usa",
            "responseTime": "645",
            "responseStatus": "200",
            "responseBody": {},
            "responseHeaders": {},
            "assertions": [
                {
                    "id": 100002,
                    "type": "statusCode",
                    "property": null,
                    "comparison": "equalTo",
                    "expectedValue": "201",
                    "actualValue": "201",
                    "success": true
                },
                {
                    "id": 100003,
                    "type": "responseTimeMs",
                    "property": null,
                    "comparison": "lessThan",
                    "expectedValue": "600",
                    "actualValue": "329",
                    "success": true
                },
                {
                    "id": 100004,
                    "type": "containsProperty",
                    "property": null,
                    "comparison": "equalTo",
                    "expectedValue": "title",
                    "actualValue": "title",
                    "success": true
                },
                {
                    "id": 100005,
                    "type": "containsValue",
                    "property": "title",
                    "comparison": "equalTo",
                    "expectedValue": "my-test-board",
                    "actualValue": "my-test-board",
                    "success": true
                },
                {
                    "id": 100004,
                    "type": "containsProperty",
                    "property": null,
                    "comparison": "equalTo",
                    "expectedValue": "title",
                    "actualValue": null,
                    "success": true
                }
            ]
        }
    ]
}
```

#### 1.5.3 Forwarded Payload

no payload

## 1.6.0. GET /api/tests/:testId/runs/:runId

Get data for a single test run

### 1.6.1. Expected payload

no playload

### 1.6.2. Successful response 

200

#### 1.6.2.1 Example response 
```json
{
    "id": 100000,
    "name": "first-get-test",
    "method": "get",
    "createdAt": "2022-07-27T04:07:31.632Z",
    "url": "https://trellific.corkboard.dev/api/boards",
    "runs": [
        {
            "id": 100000,
            "testId": 100000,
            "success": true,
            "completedAt": "2022-07-27T04:07:31.632Z",
            "regionName": "us-east-1",
            "regionDisplayName": "N. Virginia",
            "regionFlagUrl": "https://countryflagsapi.com/png/usa",
            "responseTime": "645",
            "responseStatus": "200",
            "responseBody": {},
            "responseHeaders": {},
            "assertions": [
                {
                    "id": 100000,
                    "type": "statusCode",
                    "property": null,
                    "comparison": "equalTo",
                    "expectedValue": "200",
                    "actualValue": "200",
                    "success": true
                },
                {
                    "id": 100001,
                    "type": "responseTimeMs",
                    "property": null,
                    "comparison": "lessThan",
                    "expectedValue": "500",
                    "actualValue": "237",
                    "success": true
                }
            ]
        }
    ]
}
```
## 1.7.0. DELETE /api/tests/:testId

Delete a single test by id

### 1.6.1. Expected payload

no playload

### 1.6.2. Successful response 

200

## 1.7. PUT /api/tests/:id

Edits a test configuration

### 1.7.1. Expected Payload

```json
{
    "test": {
        "title": "0731-t6",
        "locations": [
            "us-east-1"
        ],
        "minutesBetweenRuns": "5",
        "type": "api",
        "httpRequest": {
            "method": "get",
            "url": "https://trellific.corkboard.dev/api/boards",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": {
                "board": {
                    "title": "0731-t3 board (edit 1)"
                }
            },
            "assertions": [
                {
                    "type": "responseTime",
                    "property": "",
                    "comparison": "lessThan",
                    "target": "500"
                },
                {
                    "type": "statusCode",
                    "property": "",
                    "comparison": "equalTo",
                    "target": "200"
                },
                {
                    "type": "header",
                    "property": "access-control-allow-origin",
                    "comparison": "equalTo",
                    "target": "*"
                },
                {
                    "type": "body",
                    "property": "",
                    "comparison": "contains",
                    "target": "_id"
                }
            ]
        },
        "alertChannels": [
            {
                "id": "94db2374-a765-4f93-9d3b-114fabfa21f0",
                "type": "discord",
                "destination": "https://discord.com/api/webhooks/999824136513798254/-tZUo-kvKnBFJB9b0htqMu2zgaWA2CA_da1h8O3H6AgLYP_E4FpOe6sczmuqc9vpJ703",
                "alertsOnRecovery": false,
                "alertsOnFailure": true
            }
        ]
    }
}
```

### 1.7.2. Successful Response

The new test is returned in JSON format with a 200 response status code.

#### 1.7.2.1. Example Response

```text
Test my-updated-test updated
```

#### 1.7.3 Forwarded Payload

The payload received from the client (refer to 1.1.1) is forwarded to EventBridge for use as the "Input to Target" JSON largely without modification (ids are added for the test and assertions).
