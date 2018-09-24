# Initialize the client

Let's begin by initializing the API client in our `form.php` file. Copy this code:

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

include(__DIR__ . '/vendor/autoload.php');

// Pass the URL to your Deskpro instance when creating the client.
$client = new DeskproClient('http://deskpro.company.com');

// `Many API methods require authentication. Set the ID of the user
// to authenticate with and either the auth key or token.`
$client->setAuthKey(1, 'dev-admin-code');
// $client->setAuthToken(1, 'AWJ2BQ7WG589PQ6S862TCGY4');

try {
    $resp = $client->get('/articles');
    print_r($resp->getData());
    print_r($resp->getMeta());
} catch (APIException $e) {
    echo $e->getMessage();
}
```

Run this page in your browser and you'll see a bunch of JSON output. Something like:

```text
Array
(
    [0] => Array
        (
            [id] => 1
            [title] => "Mary Had a Little Lamb"
            ...
        )

    [1] => Array
        (
            [id] => 2
            [title] => "Baa Baa Black Sheep"
            ...
        )
)
```

```text
Array
(
    [pagination] => Array
        (
            [total] => 2
            [count] => 2
            [per_page] => 10
            [current_page] => 1
            [total_pages] => 1
        )
)
```

