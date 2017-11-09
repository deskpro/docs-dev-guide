Batch Requests
==============

Sometimes you want to perform multiple queries all at once. For example, maybe you need to load a few collections to populate a form. Normally you would need to submit multiple HTTP requests which could be slow.

You POST a map to the `/batch` endpoint describing the requests you want to submit. The system will process all of your requests at once, and send you back a single result object. The keys of the result will be the same keys you submitted.

Example request using a key-value map of requests to execute in a batch:

```shell
curl -H "Authorization: key 1:CVRRGQ58QDX8H5B4W4RAJ978Q" \
     -H "Content-Type: application/json" \
     -X POST \
     -d '
 {
     "t": {
         "method": "POST",
         "url": "/api/tickets",
         "payload": {
             "title": "new-ticket"
         }
    },
    "john": "/api/people/1",
    "img": "/api/people/1/image",
    "parts": "/api/tickets/5/participants"
 }
'
     http://example.com/api/v2/batch
```

Example response where each response uses the same key you sent in the request:

```json
{
    "t": {
      "headers": {
          "response_code": 201,

      },
      "data": {
         "title": "new-ticket"
         "...": "..."
      }
    },
    "john": {
        "headers": {
          "response_code": 404
        },
        "data": {
          "...": "..."
        }
    },
    "...": "..."
}
```

### `POST /batch`

Post an object/map (top-level) with the following schema:

| Property | Description | Example |
| --- | --- | --- |
| Note: `KEY` | Any arbitrary string you want to use to identify the request. | req_1, department_info, foobar, 12 |
| `KEY.url` | The API endpoint you want to call. You can also specify query-string params here. | `/api/v2/me`, `/api/v2/tickets?page=2` |
| `KEY.method` | (optional) GET, POST, DELETE, PUT. Defaults to GET. | GET |
| `KEY.payload` | (optional) When using POST/PUT, this is the JSON object you want to submit as the payload itself. | `{"foo": "bar"}` |


### `GET /batch` -- Short GET Syntax

You can also use the short GET syntax to process multiple GET requests all at once by specifying multiple `get[KEY]=endpoint_path` parameters.

| Param | Description | Example |
| --- | --- | --- |
| Note: `KEY` | The 'key' in `get[KEY]` can be any arbitrary string. It serves the same purpose as KEY above in the POST version of batch. | |
| `get[KEY]` | The API endpoint to fetch | `/api/v2/me`, `/api/v2/tickets` |

If you need to specify parameters for any of the `get[KEY]` calls (for example, to specify a page number), you can use the extended syntax.

Example GET call (note: for purposes of readability, the URL has been split on multiple lines):

```shell
curl -H "Authorization: key 1:CVRRGQ58QDX8H5B4W4RAJ978Q" \
    http://example.com/api/v2/batch/api/v2/batch?
	    get[stars]=/api/v2/ticket_stars
	    &get[departments]=/api/v2/ticket_departments
```

Here's an example where the endpoint contains parameters. You need to encode '?' and '&' so they don't get read by the main batch request itself.

```shell
curl -H "Authorization: key 1:CVRRGQ58QDX8H5B4W4RAJ978Q" \
    http://example.com/api/v2/batch/api/v2/batch?
	    get[stars]=/api/v2/ticket_stars
	    &get[tickets]=/api/v2/tickets%3Fpage%3D2%26ids%3D1%2C2%2C3%2C4
	    
# the last line decodes to a URL like:
# /api/v2/tickets?page=2&ids=1,2,3,4
```
