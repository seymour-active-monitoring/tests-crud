<!-- TOC -->

- [1. API Documentation](#1-api-documentation)
  - [1.1. POST /api/tests](#14-post-apitests)
  - [1.2. GET /api/tests](#79-get-apitests)
  - [1.3. GET /api/tests/:id](#138-get-apitest)
	- [1.4. GET /api/sideload](#201-get-apitest)

## 1.1. POST /api/tests

Creates a synthetic test

### 1.1.1. Expected Payload

```json
{
  "test": {
    "title": "My new test",
    "locations": [
      "us-east-1"
    ],
    "minutesBetweenRuns": 60,
    "type": "API",
    "httpRequest": {
      "method": "GET",
      "url": "https://example.com/api/endpoint",
      "headers": {},
      "body": {},
      "assertions": {
        "statusCode": {
          "comparison": "equal_to",
          "target": 200
        },
        "responseTime": {
          "comparison": "less_than",
          "target": 925
        },
        "headers": [
            {
                "property": "Content-Type",
                "comparison": "equal_to",
                "target": "application json"
            },
            {
                "property": "Connection",
                "comparison": "equal_to",
                "target": "keep-alive"
            }
        ],
        "jsonBody": [
            {
                "property": "title",
                "comparison": "equal_to",
                "target": "Test board #2"
            },
            {
                "property": "lists",
                "comparison": "is_not_empty"
            }
        ]
      }
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
[
  {
    "id": 100000,
    "name": "first_get_test",
    "run_frequency_mins": 60,
    "method": "GET",
    "url": "https://example.com/api/endpoint",
    "headers": {},
    "payload": {},
    "query_params": null,
    "teardown": null,
    "status": "RUNNING",
    "eb_rule_arn": "arn:imfake",
    "created_at": "2022-07-15T20:43:18.001Z",
    "updated_at": null
  },
  {
    "id": 100001,
    "name": "first_post_test",
    "run_frequency_mins": 60,
    "method": "POST",
    "url": "https://example.com/api/endpoint",
    "headers": {
        "Content-Type": "application/json"
    },
    "payload": {
        "board": {
            "title": "post-test-board"
        }
    },
    "query_params": null,
    "teardown": null,
    "status": "RUNNING",
    "eb_rule_arn": "arn:imfake",
    "created_at": "2022-07-15T20:43:18.001Z",
    "updated_at": null
  }
]
```

#### 1.2.3 Forwarded Payload

none

## 1.3. GET /api/test/:id

Get all runs for a single test

### 1.3.1. Expected Payload

no payload

### 1.3.2. Successful Response

The tests runs are returned in JSON format with a 200 response status code.

#### 1.3.2.1. Example Response

```json
[
  {
    "name": "first_get_test",
    "method": "GET",
    "url": "https://trellific.corkboard.dev/api/boards",
    "region": "us-east-1",
    "type": "response_time_ms",
    "property": null,
    "actual_value": "237",
    "comparison_type": "<=",
    "expected_value": "500",
    "pass": true
  },
  {
    "name": "first_get_test",
    "method": "GET",
    "url": "https://trellific.corkboard.dev/api/boards",
    "region": "ca-central-1",
    "type": "response_time_ms",
    "property": null,
    "actual_value": "423",
    "comparison_type": "<=",
    "expected_value": "500",
    "pass": false
  },
  {
    "name": "first_get_test",
    "method": "GET",
    "url": "https://trellific.corkboard.dev/api/boards",
    "region": "ca-central-1",
    "type": "status_code",
    "property": null,
    "actual_value": "200",
    "comparison_type": "=",
    "expected_value": "200",
    "pass": true
  },
]

```

#### 1.3.3 Forwarded Payload

none

## 1.4.0 GET /api/sideload

Get sideload data 

### 1.4.1. Expected Payload

no payload

### 1.4.2. Successful Response

The tests runs are returned in JSON format with a 200 response status code.

#### 1.4.2.1. Example Response

```json
{
  "comparisonTypes": [
    {
      "id": 1,
      "name": "equal_to",
      "display_name": "Equal to",
      "symbol": "=",
      "supported": true
    },
    {
      "id": 2,
      "name": "not_equal_to",
      "display_name": "Not equal to",
      "symbol": "!=",
      "supported": true
    },
  ],
  "regions": [
    {
      "id": 1,
      "name": "us_east_1",
      "display_name": "N. Virginia",
      "aws_name": "us-east-1",
      "flag_url": "https://countryflagsapi.com/png/usa",
      "supported": true
    },
    {
      "id": 2,
      "name": "us_east_2",
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
      "name": "response_time",
      "display_name": "Response time",
      "supported": true
    },
    {
      "id": 2,
      "name": "status_code",
      "display_name": "Status code",
      "supported": true
    },
  ]
}

```

#### 1.4.3 Forwarded Payload

none
