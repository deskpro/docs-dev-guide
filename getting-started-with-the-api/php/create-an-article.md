# Create an article

Now we have a form, we can handle when the user submits it and then pass it to the API for to handle and turn into an article.

```php
<?php
use Deskpro\API\DeskproClient;
use Deskpro\API\Exception\APIException;

include(__DIR__ . '/vendor/autoload.php');

$client = new DeskproClient('http://deskpro.company.com');
$client->setAuthKey(1, 'dev-admin-code');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = [
        "title"   => $_POST["title"],
        "content" => $_POST["content"]
    ];
    $resp = $client->post('/articles', $body);
    $data = $resp->getData();

    echo "Article with ID {$data['id']} has been accepted.";
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

Submitting the form should show you something like:

```text
Article with ID 107 has been accepted.
```

