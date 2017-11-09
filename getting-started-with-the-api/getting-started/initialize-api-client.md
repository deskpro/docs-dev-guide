Initialize API Client
=====================

Let's begin by initializing the API client in our `form.php` file. Copy this code:

{% method %}
{% sample lang="php" %}
```php
<?php
require("vendor/autoload.php");

// Fill in your details
$helpdeskUrl = 'https://your-deskpro.url/';
$apiKey      = '1:XXX';

// Create the API client
$api = new DeskPROApi($helpdeskUrl, "key $apiKey");

// Lets test it out!
$admin = $api->people()->get(1)->send();

// Print it to the screen
print_r($admin->getData());
```

{% common %}
Run this page in your browser and you'll see a bunch of JSON output. Something like:

```json
{
    "data": {
        "id": 1,
        "name": "John Doe",
        ...
    },
    "meta": {},
    "linked": {}
}
```
{% endmethod %}