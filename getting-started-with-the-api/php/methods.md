# Methods

This document details the methods of the PHP client library.

## Initializing the client

Begin by initializing an instance of `Deskpro\API\DeskproClient`, with the URL to your Deskpro instance.

```php
<?php
use Deskpro\API\DeskproClient;

$client = new DeskproClient('http://deskpro.company.com');
```

[Guzzle](http://docs.guzzlephp.org/en/stable/) is used to make HTTP requests. A default Guzzle client will be used by the library, but a custom instance may be provided.

```php
<?php
use Deskpro\API\DeskproClient;
use GuzzleHttp\Client;

$httpClient = new Client([
    'timeout' => 60
]);
$client = new DeskproClient('http://deskpro.company.com', $httpClient);

// Or use the setter method.
// $client->setHTTPClient($httpClient);
```

An instance of `Psr\Log\LoggerInterface` may also be passed to the constructor when initializing the client.

```php
<?php
use Deskpro\API\DeskproClient;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

$logger = new Logger('name');
$logger->pushHandler(new StreamHandler('path/to/your.log', Logger::DEBUG));

$client = new DeskproClient('http://deskpro.company.com', null, $logger);

// Or use the setter method.
// $client->setLogger($logger);
```

## Authenticating

Many API methods require authentication. Set the ID of the user to authenticate with and either the auth "key" or "token".

```php
<?php
use Deskpro\API\DeskproClient;

$client = new DeskproClient('http://deskpro.company.com');

// Use the setAuthKey method to authenticate using a key.
$personId = 1;
$authKey  = 'dev-admin-code';
$client->setAuthKey($personId, $authKey);

// Use the setAuthToken method to authenticate using a token.
$personId  = 1;
$authToken = 'AWJ2BQ7WG589PQ6S862TCGY4';
$client->setAuthToken($personId, $authToken);
```

## Get

Sends a GET request to the API.

`DeskproClientInterface::get($endpoint, array $params = []) : APIResponseInterface`

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

$client = new DeskproClient('http://deskpro.company.com');
$client->setAuthKey(1, 'dev-admin-code');

try {
    $resp = $client->get('/articles');
    print_r($resp->getData());
} catch (APIException $e) {
    echo $e->getMessage();
}

// Parameters are interpolated into the provided URL.
// The next request will be made to "/articles/101?limit=25".
$params = [
    'id'    => 101,
    'limit' => 25
];
$client->get('/articles/{id}', $params);
```

## Post

Sends a POST request to the API.

`DeskproClientInterface::post($endpoint, $body = null, array $params = []) : APIResponseInterface`

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

$client = new DeskproClient('http://deskpro.company.com');
$client->setAuthKey(1, 'dev-admin-code');

try {
    $body = [
        'title'   => 'Mary Had a Little Lamb',
        'content' => 'Whose fleece was white as snow.'
    ];
    $resp = $client->post('/articles', $body);
    print_r($resp->getData());
} catch (APIException $e) {
    echo $e->getMessage();
}
```

## Put

Sends a PUT request to the API.

`DeskproClientInterface::put($endpoint, $body = null, array $params = []) : APIResponseInterface`

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

$client = new DeskproClient('http://deskpro.company.com');
$client->setAuthKey(1, 'dev-admin-code');

try {
    $body = [
        'title'   => 'Mary Had a Little Lamb',
        'content' => 'Whose fleece was white as snow.'
    ];
    $params = [
        'id' => 101
    ];
    $resp = $client->put('/articles/{id}', $body, $params);
    print_r($resp->getData());
} catch (APIException $e) {
    echo $e->getMessage();
}
```

## Delete

Sends a DELETE request to the API.

`DeskproClientInterface::delete($endpoint, array $params = []) : APIResponseInterface`

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

$client = new DeskproClient('http://deskpro.company.com');
$client->setAuthKey(1, 'dev-admin-code');

try {
    $params = [
        'id' => 101
    ];
    $resp = $client->delete('/articles/{id}', $params);
    print_r($resp->getData());
} catch (APIException $e) {
    echo $e->getMessage();
}
```

## Batch

Sends a batch request to the API.

`DeskproClientInterface::batch(array $requests) : APIResponseInterface[]`

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

$client = new DeskproClient('http://deskpro.company.com');
$client->setAuthKey(1, 'dev-admin-code');

try {
    $resp = $client->batch([
        '105' => [
            'method' => 'GET',
            'url'    => '/articles/105'
        ],
        'new' => [
            'method'  => 'POST',
            'url'     => '/articles',
            'payload' => [
                'title'   => 'Mary Had a Little Lamb',
                'content' => 'Whose fleece was white as snow.'
            ]
        ]
    ]);
    print_r($resp['105']->getData());
    print_r($resp['new']->getData());
} catch (APIException $e) {
    echo $e->getMessage();
}
```

## Request

Sends a custom request to the API.

`DeskproClientInterface::request($method, $endpoint, $body = null, array $params = [], array $headers = []) : APIResponseInterface`

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

$client = new DeskproClient('http://deskpro.company.com');
$client->setAuthKey(1, 'dev-admin-code');

try {
    $body = [
        'title'   => 'Mary Had a Little Lamb',
        'content' => 'Whose fleece was white as snow.'
    ];
    $params = [
        'id' => 101
    ];
    $headers = [
        'X-Custom-Value' => 'some value'
    ];
    $resp = $client->request('PUT', '/articles/{id}', $body, $params, $headers);
    print_r($resp->getData());
} catch (APIException $e) {
    echo $e->getMessage();
}
```

## Asynchronous Requests

Each of the methods `get`, `post`, `put`, `delete`, `batch`, and `request` have asynchronous versions which return a promise.

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\APIResponseInterface;
use Deskpro\API\Exception\APIException;

$client = new DeskproClient('http://deskpro.company.com');
$client->setAuthKey(1, 'dev-admin-code');

$promise = $client->getAsync('/articles');
$promise->then(function(APIResponseInterface $resp) {
    print_r($resp->getData());
}, function(APIException $err) {
    echo $err->getMessage();
});
$promise->wait();

$body = [
    'title'   => 'Mary Had a Little Lamb',
    'content' => 'Whose fleece was white as snow.'
];
$promise = $client->postAsync('/articles', $body);
$promise->then(function(APIResponseInterface $resp) {
    print_r($resp->getData());
}, function(APIException $err) {
    echo $err->getMessage();
});
$promise->wait();
```

## Default Headers

Sets the headers sent with each request.

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

$client = new DeskproClient('http://deskpro.company.com');

// Send these headers and values with each request made to the API.
$client->setDefaultHeaders([
    'X-Custom-Value' => 'foo'
]);
```

## Response

Each of the methods `get`, `post`, `put`, `delete`, `batch`, and `request` returns an instance of `APIResponseInterface`.

`APIResponseInterface::getData() : array`  
`APIResponseInterface::getMeta() : array`  
`APIResponseInterface::getLinked() : array`

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

$client = new DeskproClient('http://deskpro.company.com');
$client->setAuthKey(1, 'dev-admin-code');

try {
    $resp = $client->get('/articles');
    print_r($resp->getData());
    print_r($resp->getMeta());
    print_r($resp->getLinked());
} catch (APIException $e) {
    echo $e->getMessage();
}
```

For asynchronous requests, an instance of `APIResponseInterface` is passed to the resolver function.

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\APIResponseInterface;

$client = new DeskproClient('http://deskpro.company.com');
$client->setAuthKey(1, 'dev-admin-code');

$promise = $client->getAsync('/articles');
$promise->then(function(APIResponseInterface $resp) {
    print_r($resp->getData());
});
$promise->wait();
```

The `APIResponseInterface` interface implements [ArrayAccess](http://php.net/manual/en/class.arrayaccess.php), [Iterator](http://php.net/manual/en/class.iterator.php), and [Countable](http://php.net/manual/en/class.countable.php).

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

$client = new DeskproClient('http://deskpro.company.com');
$client->setAuthKey(1, 'dev-admin-code');

try {
    $resp = $client->get('/articles');
    echo "Found " . count($resp) . " articles\n";
    foreach($resp as $article) {
        echo $article['title'] . "\n";
    }
} catch (APIException $e) {
    echo $e->getMessage();
}
```

