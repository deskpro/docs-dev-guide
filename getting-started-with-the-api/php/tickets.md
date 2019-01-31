# Tickets

## Create tickets

### Basic ticket

If a ticket is created by a user you can run the following code:

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

include (__DIR__ . '/vendor/autoload.php');

$client = new DeskproClient('http://deskpro.company.com');

$client->setAuthKey(1, 'dev-admin-code');

try {
    $payload = [
        'agent' => 1,
        'person' => 'joe@deskprodemo.com',
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

### Checking if the user exists

If you are unsure the user that creates the ticket exists in Deskpro, you can run this code to check for it and create it otherwise:

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

include (__DIR__ . '/vendor/autoload.php');

$client = new DeskproClient('http://deskpro.company.com');

$client->setAuthKey(1, 'dev-admin-code');

$userEmail = 'testnewuser@deskprodemo.com';
$userName = 'New User';
try {
    $params = ['primary_email' => $userEmail];
    $resp = $client->get('/people', $params);
    $users = $resp->getData();


    if (count($users)) {
        $userId = $users[0]['id'];
    } else {
        $payload = [
            'name' => $userName,
            'primary_email' => $userEmail
        ];
        $resp = $client->post('/people', $payload);
        $user = $resp->getData();
        $userId = $user['id'];
    }

    $payload = [
        'agent' => 1,
        'subject' => 'Test ticket with new user',
        'person' => $userId,
        'department' => 1,
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

$client = new DeskproClient('http://deskpro.company.com');

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

$client = new DeskproClient('http://deskpro.company.com');

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

$client = new DeskproClient('http://deskpro.company.com');

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

To post a message with an attachment, you need:

* First to post the attachment and create a blob.
* Then create the ticket
* And finally add a message to this ticket with the attachement

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

include (__DIR__ . '/vendor/autoload.php');

$client = new DeskproClient('http://deskpro.company.com');

$client->setAuthKey('1:dev-admin-code');

$path = __DIR__.'/dummy.zip';

try {
    $payload = [
        'multipart' => [
            [
                'name' => 'file',
                'FileContents' => fopen($path, 'r'),
                'contents' => fopen($path, 'r'),
                'filename' => 'dummy.zip'
            ]
        ]
    ];
    $blob = $client->post('/blobs/temp', $payload);

    $payload = [
        'agent' => 1,
        'person' => 'joe@deskprodemo.com',
        'subject' => 'Test ticket with attachment'
    ];
    $ticket = $client->post('/tickets', $payload);

    $payload = [
        'message' => 'Ticket message with attachment',
        'attachments' => [
            $blob['blob_id'] => [
                'blob_auth' => $blob['blob_auth']
            ]
        ],
        'person' => 'joe@deskprodemo.com'
    ];
    $resp = $client->post('tickets/'.$ticket['id'].'/messages', $payload);
    print_r($resp->getData());
    print_r($resp->getMeta());
} catch (APIException $e) {
    echo $e->getMessage();
}

```

## Get Tickets

### Tickets from a user

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

include (__DIR__ . '/vendor/autoload.php');

$client = new DeskproClient('http://deskpro.company.com');

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

$client = new DeskproClient('http://deskpro.company.com');

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

$client = new DeskproClient('http://deskpro.company.com');

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



