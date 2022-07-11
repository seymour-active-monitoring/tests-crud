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
    "locations": ["us-east-1"],
    "minutesBetweenRuns": 60,
    "type": "API",
    "http_request": {
      "http_method": "GET",
      "url": "https://mysite.com/api/users",
      "headers": {},
      "body": {},
      "assertions": {
        "status_code": 200,
        "contains_properties": []
      },
    },
  }
}
```

### 1.1.2. Successful Response

The new test is returned in JSON format with a 201 response status code.

#### 1.1.2.1. Example Response

```text
Test my-new-test created
```
