```json

{
  "test": {
    "title": "New UI test",
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