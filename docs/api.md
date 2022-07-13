<!-- TOC -->

- [1. API Documentation](#1-api-documentation)
  - [1.1. POST /api/tests](#14-post-apitests)

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
