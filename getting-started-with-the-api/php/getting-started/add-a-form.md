Add a form
==========
Next, let's add a form to the page and get ready to handle it.

{% method %}
{% sample lang="php" %}
```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

include(__DIR__ . '/vendor/autoload.php');

$client = new DeskproClient('http://deskpro.company.com');
$client->setAuthKey(1, 'dev-admin-code');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // TODO handle the form
    echo "We will fill this in later.";
    die();
}
?>

<form action="form.php" method="POST">
    Title: <input type="text" name="title"><br>
    <textarea
        name="content"
        placeholder="Article Content"
        cols="80"
        rows="10"
    ></textarea><br>
    <button type="submit">Submit</button>
</form>
```
{% endmethod %}