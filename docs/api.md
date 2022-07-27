<!-- TOC -->

- [1. API Documentation](#1-api-documentation)
  - [1.1. POST /api/tests](#14-post-apitests)
  - [1.2. GET /api/tests](#99-get-apitests)
  - [1.3. GET /api/tests/:id](#158-get-apitest)
  - [1.4. GET /api/sideload](#201-get-sideload)
  - [1.5. POST /api/tests/:id/run](#298-post-apitestrun)
  - [1.6. GET /api/tests/:id/runs](#304-get-apitestruns)


## 1.1. POST /api/tests

Creates a synthetic test

### 1.1.1. Expected Payload

```json
{
  "test": {
    "title": "New-UI-test",
    "locations": [
        "us-east-1",
        "us-west-1",
        "ca-central-1",
        "eu-north-1"
    ],
    "minutesBetweenRuns": "1",
    "type": "api",
    "httpRequest": {
      "method": "get",
      "url": "https://trellific.corkboard.dev/api/boards",
      "headers": {},
      "body": {},
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
    }
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

The payload received from the client (refer to 1.1.1) is forwarded to EventBridge for use as the "Input to Target" JSON without modification.


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
            "id": 1,
            "name": "New-test-deployed",
            "minutesBetweenRuns": 1,
            "createdAt": "2022-07-26 21:07:31.63249",
            "runs": [
                {
                    "success": false,
                    "createdAt": "2022-07-27T05:23:57.982Z"
                },
                {
                    "success": null,
                    "createdAt": "2022-07-27T05:22:14.703Z"
                },
                {
                    "success": null,
                    "createdAt": "2022-07-27T05:21:16.181Z"
                }
            ]
        },
        {
            "id": 2,
            "name": "New-test-deployed-2",
            "minutesBetweenRuns": 1,
            "createdAt": "2022-07-26 21:07:29.69851",
            "runs": [
                {
                    "success": true,
                    "createdAt": "2022-07-27T09:05:14.687Z"
                },
                {
                    "success": true,
                    "createdAt": "2022-07-27T09:05:14.128Z"
                },
                {
                    "success": true,
                    "createdAt": "2022-07-27T09:05:14.108Z"
                }
            ]
        },
        {
            "id": 3,
            "name": "0726-t1",
            "minutesBetweenRuns": 1,
            "createdAt": "2022-07-26 21:07:32.62547",
            "runs": [
                {
                    "success": true,
                    "createdAt": "2022-07-27T06:31:57.264Z"
                },
                {
                    "success": true,
                    "createdAt": "2022-07-27T06:26:15.211Z"
                },
                {
                    "success": true,
                    "createdAt": "2022-07-27T06:25:15.331Z"
                }
            ]
        },
        {
            "id": 100000,
            "name": "first-get-test",
            "minutesBetweenRuns": 5,
            "createdAt": "2022-07-26 21:07:40.69877",
            "runs": [
                {
                    "success": true,
                    "createdAt": "2022-07-27T04:07:31.632Z"
                },
                {
                    "success": true,
                    "createdAt": "2022-07-27T04:07:31.632Z"
                },
                {
                    "success": true,
                    "createdAt": "2022-07-27T04:07:31.632Z"
                }
            ]
        },
        {
            "id": 100001,
            "name": "first-post-test",
            "minutesBetweenRuns": 5,
            "createdAt": "2022-07-26 21:07:35.65781",
            "runs": [
                {
                    "success": true,
                    "createdAt": "2022-07-27T04:07:31.632Z"
                },
                {
                    "success": true,
                    "createdAt": "2022-07-27T04:07:31.632Z"
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
    "name": "first-post-test",
    "method": "POST",
    "url": "https://trellific.corkboard.dev/api/boards",
    "createdAt": "2022-07-27T03:07:31.632Z",
    "updatedAt": null,
    "runs": [
        {
            "id": 100003,
            "location": "N. Virginia",
            "responseTimeMs": 0,
            "assertions": 4,
            "assertionsPassed": 0,
            "region": {
                "id": 1,
                "flagUrl": "https://countryflagsapi.com/png/usa"
            }
        },
        {
            "id": 100004,
            "location": "N. California",
            "responseTimeMs": null,
            "assertions": 5,
            "assertionsPassed": 0,
            "region": {
                "id": 3,
                "flagUrl": "https://countryflagsapi.com/png/usa"
            }
        }
    ]
}
```

#### 1.5.3 Forwarded Payload

no payload
