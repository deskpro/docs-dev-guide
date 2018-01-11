Initialize the Client
=====================
Let's begin by creating the `index.html` file, and initializing the client. Copy this code:

{% method %}
{% sample lang="js" %}
```html
<!DOCTYPE>
<html>
  <head>
    <script src="https://unpkg.com/@deskpro/deskpro-api-client-javascript@2.0.0/dist/index.js"></script>
  </head>
  <body>
    <script>
      // Pass the URL to your Deskpro instance when creating the client.
      var client = new DeskproClient('http://deskpro.company.com');
      
      // Many API methods require authentication. Set the ID of the user
      // to authenticate with and either the auth key or token.
      client.setAuthKey(1, 'dev-admin-code');
      // client.setAuthToken(1, 'AWJ2BQ7WG589PQ6S862TCGY4');

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

{% common %}
Open the `index.html` in your browser and open the debug console. You'll see a bunch of JSON output. Something like:

```json
[
    {
        "id": 107,
        "title": "This is a title",
        ...
    },
    {
        "id": 106,
        "title": "This is a title",
        ...
    }
]
```
{% endmethod %}