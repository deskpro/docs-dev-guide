# Methods

This document details the methods of the JavaScript client library.

## Initializing the client

Begin by initializing an instance of `DeskproClient`, from the `@deskpro/deskpro-api-client-javascript` package, with the URL to your Deskpro instance.

```javascript
const DeskproClient = require('@deskpro/deskpro-api-client-javascript');

const client = new DeskproClient('http://deskpro.company.com');
```

[Axios](https://github.com/axios/axios) is used to make HTTP requests. A default Axios client will be used by the library, but a custom instance may be provided.

```javascript
const DeskproClient = require('@deskpro/deskpro-api-client-javascript');

const httpClient = axios.create({
  timeout: 1000
});
const client = new DeskproClient('http://deskpro.company.com', httpClient);

// Or use the setter method.
// client.setHTTPClient(httpClient);
```

Requests may be logged by passing a function as the third constructor argument.

```javascript
const DeskproClient = require('@deskpro/deskpro-api-client-javascript');

const logger = console.log;
const client = new DeskproClient('http://deskpro.company.com', null, logger);

// Or use the setter method.
// client.setLogger(logger);
```

## Authenticating

Many API methods require authentication. Set the ID of the user to authenticate with and either the auth "key" or "token".

```javascript
const DeskproClient = require('@deskpro/deskpro-api-client-javascript');

const client = new DeskproClient('http://deskpro.company.com');

// Use the setAuthKey method to authenticate using a key.
const personId = 1;
const authKey  = 'dev-admin-code';
client.setAuthKey(personId, authKey);

// Use the setAuthToken method to authenticate using a token.
personId  = 1;
authToken = 'AWJ2BQ7WG589PQ6S862TCGY4';
client.setAuthToken(personId, authToken);
```

## Get

Sends a GET request to the API.

_DeskproClient::get\(endpoint, params = {}\) : Promise_

```javascript
const DeskproClient = require('@deskpro/deskpro-api-client-javascript');

const client = new DeskproClient('http://deskpro.company.com');
client.setAuthKey(1, 'dev-admin-code');

client.get('/articles')
  .then((resp) => {
    console.log(resp.data);
  })
  .catch((err) => {
    console.error(err.message);
  });

// Parameters are interpolated into the provided URL.
// The next request will be made to "/articles/101?limit=25".
const params = {
  id:    101,
  limit: 25
};
client.get('/articles/{id}', params);
```

## Post

Sends a POST request to the API.

_DeskproClient::post\(endpoint, body = null, params = {}\) : Promise_

```javascript
const DeskproClient = require('@deskpro/deskpro-api-client-javascript');

const client = new DeskproClient('http://deskpro.company.com');
client.setAuthKey(1, 'dev-admin-code');

const body = {
  title:   'Mary Had a Little Lamb',
  content: 'Whose fleece was white as snow.'
};

client.post('/articles', body)
  .then((resp) => {
    console.log(resp.data);
  })
  .catch((err) => {
    console.error(err.message);
  });
```

## Put

Sends a PUT request to the API.

_DeskproClient::put\(endpoint, body = null, params = {}\) : Promise_

```javascript
const DeskproClient = require('@deskpro/deskpro-api-client-javascript');

const client = new DeskproClient('http://deskpro.company.com');
client.setAuthKey(1, 'dev-admin-code');

const body = {
  title:   'Mary Had a Little Lamb',
  content: 'Whose fleece was white as snow.'
};
const params = {
  id: 101
};

client.put('/articles/{id}', body, params)
  .then((resp) => {
    console.log(resp.data);
  })
  .catch((err) => {
    console.error(err.message);
  });
```

## Delete

Sends a DELETE request to the API.

_DeskproClient::del\(endpoint, params = {}\) : Promise_

```javascript
const DeskproClient = require('@deskpro/deskpro-api-client-javascript');

const client = new DeskproClient('http://deskpro.company.com');
client.setAuthKey(1, 'dev-admin-code');

const params = {
  id: 101
};
client.del('/articles/{id}', params)
  .then((resp) => {
    console.log(resp.data);
  })
  .catch((err) => {
    console.error(err.message);
  });
```

## Batch

Sends a batch request to the API.

_DeskproClient::batch\(requests\) : Promise_

```javascript
const DeskproClient = require('@deskpro/deskpro-api-client-javascript');

const client = new DeskproClient('http://deskpro.company.com');
client.setAuthKey(1, 'dev-admin-code');

client.batch({
  one: {
    method: 'GET',
    url: '/articles/105'
  },
  two: '/articles/106'
}).then((resp) => {
  console.log(resp.one.data);
  console.log(resp.two.data);
}).catch((err) => {
  console.error(err.message);
});
```

## Request

Sends a request to the API.

_DeskproClient::request\(method, endpoint, body = null, params = {}, headers = {}\) : Promise_

```javascript
const DeskproClient = require('@deskpro/deskpro-api-client-javascript');

const client = new DeskproClient('http://deskpro.company.com');
client.setAuthKey(1, 'dev-admin-code');

const body = {
  title:   'Mary Had a Little Lamb',
  content: 'Whose fleece was white as snow.'
};
const params = {
  id: 101
};
const headers = {
  'X-Custom-Value': 'some value'
}
client.request('PUT', '/articles/{id}', body, params, headers)
  .then((resp) => {
    console.log(resp.data);
  })
  .catch((err) => {
    console.error(err.message);
  });
```

## Default Headers

Sets the headers sent with each request.

_DeskproClient::setDefaultHeaders\(defaultHeaders\) : DeskproClient_

```javascript
const DeskproClient = require('@deskpro/deskpro-api-client-javascript');

const client = new DeskproClient('http://deskpro.company.com');
client.setAuthKey(1, 'dev-admin-code');

// Send these headers and values with each request made to the API.
client.setDefaultHeaders({
  'X-Custom-Value': 'some value'
});
```

## Response

Each of the methods `get`, `post`, `put`, `delete`, `batch`, and `request` returns an object with the properties `data`, `meta`, and `linked`.

```javascript
const DeskproClient = require('@deskpro/deskpro-api-client-javascript');

const client = new DeskproClient('http://deskpro.company.com');
client.setAuthKey(1, 'dev-admin-code');

client.get('/articles')
  .then((resp) => {
    console.log(resp.data);
    console.log(resp.meta);
    console.log(resp.linked);
  });
```

## Browser Usage

The client library may be used in the browser as well as Node. The library may be installed using `npm` or embedded in a document using the unpkg.com CDN.

```markup
<!DOCTYPE>
<html>
  <head>
    <!-- Import DeskproClient from node_modules -->
    <script src="node_modules/@deskpro/deskpro-api-client-javascript/dist/index.js"></script>

    <!-- Or import it from CDN -->
    <!-- <script src="https://unpkg.com/@deskpro/deskpro-api-client-javascript@2.0.0/dist/index.js"></script> -->
  </head>
  <body>
    <script>
      var client = new DeskproClient('http://deskpro.company.com');
      client.setAuthKey(1, 'dev-admin-code');

      client.get('/articles')
          .then(function(resp) {
            console.log(resp.data);
          })
          .catch(function(err) {
            console.error(err.message);
          });
    </script>
  </body>
</html>
```

