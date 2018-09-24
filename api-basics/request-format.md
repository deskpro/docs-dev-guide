# Request Format

The DeskPRO API is completely JSON.

* You SHOULD send a `Accept: application/json` to confirm that your app is expecting JSON back from the API.
* You MUST send `POST/PUT` requests with a `Content-Type: application/json` header and send a well-formed JSON payload.

### HTTP Verbs

The HTTP verb you use is meaningful. Here's a summary of the HTTP verbs you can use with the DeskPRO API and what they mean:

| Verb | Description | Example |
| :--- | :--- | :--- |
| GET | Get a single resource or collection | GET /tickets or GET /tickets/13 |
| DELETE | Delete a single resource | DELETE /ticket/13 |
| PUT | Create something new | PUT /tickets |
| POST | Update an existing resource | POST /tickets/13 |

## Response Format

When you perform a `GET` request to load a resource or a collection, you'll get a response like this.

```javascript
{
    "data": {},
    "links": {},
    "meta": {}
}
```

* `data` is the JSON representation of the resource requested, or an array of objects if you requested a collection
* `links` optional; when specified, it is an array of useful links. Resource collections always include links for “next”, “prev”, “first”, “last”.
* `meta` optional; misc information that varies based on endpoint. Resource collections should include “count”, “total\_count\*, “page”, “total\_pages”.

### Collection Responses

Example request to /tickets which is a collection resource:

```text
curl -H "Authorization: key 2:YWK2PGCS8CNW62SR8TBTBKWMY" http://example.com/api/v2/tickets
```

Example response of a collection resource

```javascript
{
   "links": {
        "first": "/tickets",
        "next": "/tickets?page=2",
        "prev": null,
        "last": "/tickets?page=106"
   },
   "data": [
      {
        "id": 1,
        "person_id": 4,
        "subject": "Foo Bar",
        "...": "..."
      },
      {
        "id": 2,
        "person_id": 12,
        "subject": "Fizz Buzz",
        "...": "..."
      }
   ],
   "meta": {
      "total": 5445,
      "page": 1,
      "per_page": 10,
      "total_pages": 545
   }
}
```

Example fetching ticket objects for 3 specific ticket IDs

```text
curl -H "Authorization: key 2:YWK2PGCS8CNW62SR8TBTBKWMY" \
    http://example.com/api/v2/tickets?ids=123,456,789
```

During a resource collection request, you can specify the following optional query parameters:

* `count` the number of results to return
* `page`the page you are requesting

Collection responses are always an _array_ of objects inside of `data`.

`links` will contain some useful links to help you paginate:

* `next` URL to the next page of results
* `prev` URL to the previous page of results
* `self` URL to the page you requested
* `first` URL to the first page of results
* `last` URL to the last page of results

`meta` will contain some useful data:

* `total` is the total count \(all matching resources\)
* `page` is current page number
* `per_page` is a count of the number of resources returned to you on this page
* `total_pages` is the total number of pages for this request

**Tip: Most collections accept a** `ids` **parameters**

Most collection resources accept an `ids` parameter where you can provide specific IDs for resources you want to retrieve. This makes it easy to load multiple objects at once.

### Creating and Updating Content

When you update a resource with `POST`, the API will simply return a `204 No Content` empty response to acknowledge that the request succeeded. When you create a resource with a `PUT` request, the API will return a `201 Created` response.

In both cases, a `Location` header will be supplied with the full URL to the API endpoint where you can `GET` the resource.

TIP: If you would rather your `POST/PUT` request return the full resource automatically \(i.e. you want to use it right away\), you can submit your request with the `?follow_location=1` query string parameter. This will cause the API to return the resource as if you did the GET yourself.

### Common HTTP Status Codes

The HTTP status codes that the API returns is significant. Here is a list of common return codes.

| Code | Verbs | Example |  |
| :--- | :--- | :--- | :--- |
| 200 | GET | found and returned | response is described above |
| 404 | Any | resource not found |  |
| 201 | POST | created resource | the created entity is in the response \(including “self” and “data” links\) |
| 204 | PUT | updated resource | no body will be in the response |
| 400 | Any | Bad Request | malformed request or invalid input |
| 401 | Any | unauthorized | you are not authenticated |
| 403 | Any | forbidden | we accept your token, but you can’t perform this action, no resource has been updated |
| 405 | Any | method not allowed |  |
| 429 | Any | too many requests | throttle/rate-limit hit |
| 423 | Any | Locked | Special code we use when the helpdesk is offline for maintenance |

### API Key Limits

You can specify API limits on every API key you create. For example, it is not uncommon to set an upper limit on an API key to prevent some kind of mistake in it's use \(such as a flood or infinite loop situation\). You can define these limits in terms of an hourly limit or a daily limit.

For cloud customers, there is also default global limit to prevent abuse. You can raise this on request by contacting us at support@deskpro.com.

When you hit a rate limit, requests will begin to fail with a HTTP status code `429 Too Many Requests` error.

## Error Responses

```text
{
    "status": 400,
    "code": "invalid_json_body",
    "message": "Invalid JSON body"
}
```

Error responses are also JSON and follow the shape described here.

* The `status` will be the HTTP status code that most closely matches the error.
* The `code` is a DeskPRO specific string to represent the specific error that happened. You may

  wish to use this value in your code in an if/switch etc to base your error handling on.

* The `message` is a human-readable English string that describes what went wrong. This value is typcially

  only useful for developers.

### Detailed Errors

```javascript
{
    "status": 400,
    "code": "invalid_input",
    "message": "Request input is invalid.",
    "errors": {
        "errors": [
            {
                "code": "extra_fields",
                "message": "Unexpected field names: name"
            }
        ],
        "fields": {
            "email": {
                "errors": [
                    {
                        "code": "required",
                        "message": "This value should not be blank."
                    }
                ]
            },
            "date": {
                "errors": [
                  {
                    "code": "invalid_date",
                    "message": "This date is invalid"
                  }
                ],
                "fields": {
                  "day": {
                      "errors": [
                        {
                          "code": "out_of_range",
                          "message": "Must be a number between 1 and 31"
                        }
                      ]
                  },
                  "year": {
                    "errors": [
                      {
                        "code": "required",
                        "message": "This value is required"
                      }
                    ]
                  }
                }
            }
        }
    }
}
```

In some cases, detailed error messages are available, such as when there are form validation errors.

The root `errors` property is an object that has two properties:

* `errors.errors` is a JSON array of error objects that happened on a global level \(not specific to any one input\).
* `errors.fields` is a JSON object that has a property for every expected input name that had an error. Inside of each field is a property named “errors” which is an array of error objects \(code/message\).

