Add a form
==========

Now we have a form, we can handle when the user submits it and then pass it to the API for to handle and turn into a ticket.

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

// True when the form is submitted
$isPosted = $_SERVER['REQUEST_METHOD'] === 'POST';

if ($isPosted) {
    $request = $client->ticketForms('user')->create([
        'subject'     => 'Submitted Form',
        'message'     => [
            'message' => $_POST['message'],
            'format'  => 'text'
        ],
        'person'      => [
            'name'    => $_POST['name'],
            'emaill'  => $_POST['email']
        ],
        'department'  => 1, // enter the target department ID here
    ]);
    
    $result = $request->send();
    $ticket = $result->getData();

    echo "Thank you! Your ticket {$ticket['ref']} has been accepted.";
    exit;
}
?>
<form action="form.php" method="POST">
    Name: <input type="text" name="name"><br>
    Email: <input type="email" name="email"><br>
    <textarea
        name="message"
        placeholder="Enter your message here"
        cols="80"
        rows="10"
    ></textarea><br>
    <button type="submit">Submit</button>
</form>
```

{% common %}
Submitting the form should show you something like:

```
Thank you! Your ticket MEFG-8567-LQGW has been accepted.
```
{% endmethod %}
