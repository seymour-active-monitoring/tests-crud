<!-- TOC -->

- [1. API Documentation](#1-api-documentation)
  * [1.1. POST /api/tests](#11-post--api-tests)
    + [1.1.1. Expected Payload](#111-expected-payload)
    + [1.1.2. Successful Response](#112-successful-response)
      - [1.1.2.1. Example Response](#1121-example-response)
    + [1.1.3 Forwarded Payload](#113-forwarded-payload)
  * [1.2. POST /api/tests/:id/run](#12-post--api-tests--id-run)
    + [1.2.1. Expected Payload](#121-expected-payload)
    + [1.2.2. Successful Response](#122-successful-response)
    + [1.2.3. Forwarded Payload](#123-forwarded-payload)
  * [1.3. PUT /api/tests/:id](#13-put--api-tests--id)
    + [1.3.1. Expected Payload](#131-expected-payload)
    + [1.3.2. Successful Response](#132-successful-response)
      - [1.3.2.1. Example Response](#1321-example-response)
    + [1.3.3 Forwarded Payload](#133-forwarded-payload)
  * [1.4. DELETE /api/tests/:id](#14-delete--api-tests--id)
    + [1.4.1. Expected payload](#141-expected-payload)
    + [1.4.2. Successful response](#142-successful-response)
  * [1.5. GET /api/tests](#15-get--api-tests)
    + [1.5.1. Expected Payload](#151-expected-payload)
    + [1.5.2. Successful Response](#152-successful-response)
      - [1.5.2.1. Example Response](#1521-example-response)
  * [1.6. GET /api/tests/:id](#16-get--api-tests--id)
    + [1.6.1. Expected Payload](#161-expected-payload)
    + [1.6.2. Successful Response](#162-successful-response)
      - [1.6.2.1. Example Response](#1621-example-response)
  * [1.7. GET /api/tests/:id/runs](#17-get--api-tests--id-runs)
    + [1.7.1. Expected Payload](#171-expected-payload)
    + [1.7.2. Successful Response](#172-successful-response)
      - [1.7.2.1. Example Response](#1721-example-response)
  * [1.8. GET /api/tests/:testId/runs/:runId](#18-get--api-tests--testid-runs--runid)
    + [1.8.1. Expected payload](#181-expected-payload)
    + [1.8.2. Successful response](#182-successful-response)
      - [1.8.2.1 Example response](#1821-example-response)
  * [1.9. GET /api/sideload](#19-get--api-sideload)
    + [1.9.1. Expected Payload](#191-expected-payload)
    + [1.9.2. Successful Response](#192-successful-response)
      - [1.9.2.1. Example Response](#1921-example-response)

<!-- /TOC -->
<!-- generated using: https://ecotrust-canada.github.io/markdown-toc/ -->

# 1. API Documentation

## 1.1. POST /api/tests

Creates a test

### 1.1.1. Expected Payload

```json
{
    "test": {
        "title": "my-first-test",
        "locations": [
            "us-east-1",
            "us-west-1",
        ],
        "minutesBetweenRuns": "60",
        "type": "api",
        "httpRequest": {
            "method": "post",
            "url": "https://myapi/api/users",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": {
                "user": {
                    "name": "Seymour"
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
                    "target": "201"
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

The title of the new test is returned with a 201 status code

#### 1.1.2.1. Example Response

```text
Test my-first-test created
```

### 1.1.3 Forwarded Payload

The payload received from the client (refer to 1.1.1) is forwarded to EventBridge for use as the "Input to Target" JSON largely without modification (ids are added for the test and assertions)


## 1.2. POST /api/tests/:id/run

Trigger single test run

### 1.2.1. Expected Payload

No payload

### 1.2.2. Successful Response

200 status code

### 1.2.3. Forwarded Payload

The test configuration is forwarded


## 1.3. PUT /api/tests/:id

Edits a test

### 1.3.1. Expected Payload

```json
{
    "test": {
        "title": "my-updated-test",
        "locations": [
            "us-east-1",
            "eu-north-1",
        ],
        "minutesBetweenRuns": "60",
        "type": "api",
        "httpRequest": {
            "method": "post",
            "url": "https://myapi/api/users",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": {
                "user": {
                    "name": "Seymour"
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
                    "target": "201"
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

### 1.3.2. Successful Response

The title of the new test is returned with a 201 status code

#### 1.3.2.1. Example Response

```text
Test my-updated-test updated
```

### 1.3.3 Forwarded Payload

The test configuration is forwarded to EventBridge for use as the "Input to Target" JSON largely without modification (ids are added for the test and assertions)


## 1.4. DELETE /api/tests/:id

Deletes a test

### 1.4.1. Expected payload

No playload

### 1.4.2. Successful response 

201 status code


## 1.5. GET /api/tests

Get all tests

### 1.5.1. Expected Payload

No payload

### 1.5.2. Successful Response

The tests are returned in JSON format with a 200 status code

#### 1.5.2.1. Example Response

```json
{
    "tests": [
        {
            "id": 1,
            "name": "first-test",
            "minutesBetweenRuns": 1,
            "createdAt": "2022-07-28T04:31:38.157Z",
            "runs": [
                {
                    "id": 847,
                    "testId": 1,
                    "success": true,
                    "createdAt": "2022-07-28T04:33:47.514Z",
                    "assertions": []
                },
                {
                    "id": 846,
                    "testId": 1,
                    "success": false,
                    "createdAt": "2022-07-28T04:33:47.238Z",
                    "assertions": []
                },
                {
                    "id": 845,
                    "testId": 1,
                    "success": false,
                    "createdAt": "2022-07-28T04:33:00.915Z",
                    "assertions": []
                }
            ]
        },
        {
            "id": 2,
            "name": "second-test",
            "minutesBetweenRuns": 5,
            "createdAt": "2022-07-27T04:07:31.632Z",
            "runs": [
                {
                    "id": 840,
                    "testId": 2,
                    "success": false,
                    "createdAt": "2022-07-28T04:20:39.445Z",
                    "assertions": []
                },
                {
                    "id": 100001,
                    "testId": 2,
                    "success": true,
                    "createdAt": "2022-07-27T04:07:31.632Z",
                    "assertions": []
                },
                {
                    "id": 100000,
                    "testId": 2,
                    "success": true,
                    "createdAt": "2022-07-27T04:07:31.632Z",
                    "assertions": []
                }
            ]
        },
        {
            "id": 3,
            "name": "third-test",
            "minutesBetweenRuns": 5,
            "createdAt": "2022-07-27T04:07:31.632Z",
            "runs": [
                {
                    "id": 100004,
                    "testId": 3,
                    "success": null,
                    "createdAt": "2022-07-27T04:07:31.632Z",
                    "assertions": []
                },
                {
                    "id": 100003,
                    "testId": 3,
                    "success": true,
                    "createdAt": "2022-07-27T04:07:31.632Z",
                    "assertions": []
                }
            ]
        }
    ]
}
```


## 1.6. GET /api/tests/:id

Gets a single test

### 1.6.1. Expected Payload

No payload

### 1.6.2. Successful Response

The test runs are returned in JSON format with a 200 status code

#### 1.6.2.1. Example Response

```json
{
    "test": {
        "title": "my-first-test",
        "locations": [
            "us-east-1",
            "us-west-1",
        ],
        "minutesBetweenRuns": "60",
        "type": "api",
        "httpRequest": {
            "method": "post",
            "url": "https://myapi/api/users",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": {
                "user": {
                    "name": "Seymour"
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
                    "target": "201"
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


## 1.7. GET /api/tests/:id/runs

Gets test runs for a single test

### 1.7.1. Expected Payload

No payload

### 1.7.2. Successful Response

200 status code

#### 1.7.2.1. Example Response

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


## 1.8. GET /api/tests/:testId/runs/:runId

Gets data for a single test run

### 1.8.1. Expected payload

No playload

### 1.8.2. Successful response 

200 status code

#### 1.8.2.1 Example response 

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

## 1.9. GET /api/sideload

Gets lookup data (e.g. http methods, regions, etc.) for UI 

### 1.9.1. Expected Payload

No payload

### 1.9.2. Successful Response

The lookup data is returned in JSON format with a 200 status code

#### 1.9.2.1. Example Response

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
