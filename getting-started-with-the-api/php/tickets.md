# Tickets

## Create tickets

### Basic ticket

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

include (__DIR__ . '/vendor/autoload.php');

$client = new DeskproClient('http://deskpro5.local');

$client->setAuthKey(1, 'dev-admin-code');

try {
    $payload = [
        'agent' => 1,
        'subject' => 'Test ticket',
        'message' => [
            'message' => 'Test message'
        ]
    ];
    $resp = $client->post('/tickets', $payload);
    print_r($resp->getData());
    print_r($resp->getMeta());
} catch (APIException $e) {
    echo $e->getMessage();
}
```

### Ticket with custom fields

To fill custom fields you need to know the field ID and its value ID in case of a choice input. Those IDs can be found in the admin section by clicking the cog icon then `Show IDs` 

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

include (__DIR__ . '/vendor/autoload.php');

$client = new DeskproClient('http://deskpro5.local');

$client->setAuthKey(1, 'dev-admin-code');

try {
    $payload = [
        'agent' => 1,
        'subject' => 'Test ticket with custom fields',
        'department' => 5,
        'message' => [
            'message' => 'Test message'
        ],
        'fields' => [
            7 => [9]
        ]
    ];
    $resp = $client->post('/tickets', $payload);
    print_r($resp->getData());
    print_r($resp->getMeta());
} catch (APIException $e) {
    echo $e->getMessage();
}
```

### Ticket with labels

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

include (__DIR__ . '/vendor/autoload.php');

$client = new DeskproClient('http://deskpro5.local');

$client->setAuthKey(1, 'dev-admin-code');

try {
    $payload = [
        'agent' => 1,
        'subject' => 'Test ticket with labels',
        'department' => 1,
        'message' => [
            'message' => 'Test message'
        ],
        'labels' => [
            'test label'
        ]
    ];
    $resp = $client->post('/tickets', $payload);
    print_r($resp->getData());
    print_r($resp->getMeta());
} catch (APIException $e) {
    echo $e->getMessage();
}
```

### Ticket with CC's

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

include (__DIR__ . '/vendor/autoload.php');

$client = new DeskproClient('http://deskpro5.local');

$client->setAuthKey(1, 'dev-admin-code');

try {
    $payload = [
        'agent' => 1,
        'subject' => 'Test ticket with CC',
        'person' => 'joe@deskprodemo.com',
        'department' => 1,
        'message' => [
            'message' => 'Test message'
        ],
        'cc' => [
            'duncan96@example.org'
        ]
    ];
    $resp = $client->post('/tickets', $payload);
    print_r($resp->getData());
    print_r($resp->getMeta());
} catch (APIException $e) {
    echo $e->getMessage();
}

```

### Ticket with attachments

## Get Tickets

### Tickets from a user

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

include (__DIR__ . '/vendor/autoload.php');

$client = new DeskproClient('http://deskpro5.local');

$client->setAuthKey(1, 'dev-admin-code');

try {
    $params = ['person' => 'joe@deskprodemo.com'];
    $resp = $client->get('/tickets', $params);
    print_r($resp->getData());
    print_r($resp->getMeta());
} catch (APIException $e) {
    echo $e->getMessage();
}
```

## Update a ticket

### Modify a ticket

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

include (__DIR__ . '/vendor/autoload.php');

$client = new DeskproClient('http://deskpro5.local');

$client->setAuthKey(1, 'dev-admin-code');

try {
    $payload = ['department' => 5];
    $resp = $client->put('/tickets/678', $payload);
} catch (APIException $e) {
    echo $e->getMessage();
}
```

### Add a reply to a ticket

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

include (__DIR__ . '/vendor/autoload.php');

$client = new DeskproClient('http://deskpro5.local');

$client->setAuthKey(1, 'dev-admin-code');

try {
    $payload = [
        'person' => 'joe@deskprodemo.com',
        'message' => 'test new reply by a user'
    ];
    $resp = $client->post('/tickets/678/messages', $payload);
} catch (APIException $e) {
    echo $e->getMessage();
}
```



