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

Get all scheduled test

### 1.2.1. Expected Payload

no payload

### 1.2.2. Successful Response

The scheduled tests are returned in JSON format with a 200 response status code.

#### 1.2.2.1. Example Response

```json
{
    "tests": [
        {
            "id": 100000,
            "name": "first-get-test",
            "run_frequency_mins": 5,
            "method_id": 1,
            "url": "https://trellific.corkboard.dev/api/boards",
            "headers": {},
            "body": {},
            "query_params": null,
            "teardown": null,
            "status": "enabled",
            "eb_rule_arn": "arn:imfake",
            "created_at": "2022-07-27T03:07:31.632Z",
            "updated_at": null
        },
        {
            "id": 100001,
            "name": "first-post-test",
            "run_frequency_mins": 5,
            "method_id": 2,
            "url": "https://trellific.corkboard.dev/api/boards",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": {
                "board": {
                    "title": "post-test-board"
                }
            },
            "query_params": null,
            "teardown": null,
            "status": "enabled",
            "eb_rule_arn": "arn:imfake",
            "created_at": "2022-07-27T03:07:31.632Z",
            "updated_at": null
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
    "name": "example-title",
    "method": "GET",
    "url": "https://example-website.com",
    "createdAt": "2022-07-25T10:47:21.336Z",
    "updatedAt": null,
    "runs": [
        {
            "id": 777,
            "location": "N. California",
            "success": true,
            "responseTimeMs": 1234,
            "assertions": 3,
            "assertionsPassed": 3,
            "region": {
                "id": 3,
                "flagUrl": "https://countryflagsapi.com/png/usa"
            }
        },
        {
            "id": 778,
            "location": "N. California",
            "success": false,
            "responseTimeMs": 2341,
            "assertions": 2,
            "assertionsPassed": 0,
            "region": {
                "id": 3,
                "flagUrl": "https://countryflagsapi.com/png/usa"
            }
        },
        {
            "id": 780,
            "location": "N. Virginia",
            "success": true,
            "responseTimeMs": 3241,
            "assertions": 1,
            "assertionsPassed": 1,
            "region": {
                "id": 1,
                "flagUrl": "https://countryflagsapi.com/png/usa"
            }
        },
        {
            "id": 781,
            "location": "N. California",
            "success": false,
            "responseTimeMs": 1234,
            "assertions": 1,
            "assertionsPassed": 0,
            "region": {
                "id": 3,
                "flagUrl": "https://countryflagsapi.com/png/usa"
            }
        },
    ]
}
```

#### 1.5.3 Forwarded Payload

no payload
