# API Introduction

The Deskpro API is a _REST_ API that runs over HTTP\(S\). All API requests are made to a URL that begins with `http://example.com/api/v2/`.

The API uses _JSON_ for requests and responses. There are a few exceptions to this rule where an API is explicitly designed to return a specific kind of resource. Those will be noted within the documentation.

Here’s an example call made to the `helpdesk/discover` endpoint:

```bash
curl http://example.com/api/v2/helpdesk/discover
```

The response will look something like this:

```javascript
{
    "data": {
        "is_deskpro": true,
        "helpdesk_url": "https:\/\/example.com\/",
        "base_api_url": "https:\/\/example.com\/api\/v2\/",
        "build": "1477995658"
    },
    "meta": {},
    "linked": {}
}
```

