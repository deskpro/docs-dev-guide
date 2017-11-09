Add a form
==========

Next, let's add a form to the page and get ready to handle it.

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
    // TODO handle the form
    echo "We will fill this in later.";
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
Opening this in your browser, you should see something like this:
![](/assets/Screen Shot 2017-11-09 at 17.43.51.png)
{% endmethod %}