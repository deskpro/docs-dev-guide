Create an Article
=================
Now we have a form, we can handle when the user submits it and then pass it to the API for to handle and turn into an article.

{% method %}
{% sample lang="js" %}
```html
<!DOCTYPE>
<html>
  <head>
    <script src="https://unpkg.com/@deskpro/deskpro-api-client-javascript@2.0.0/dist/index.js"></script>
  </head>
  <body>
    <form>
        <div>
            Title:
            <input type="text" name="title">
        </div>
        <div>
            Content:
            <textarea name="content" cols="80" rows="10"></textarea>
        </div>
        <button type="submit">Submit</button>
    </form>
    <script>
        var form = document.getElementsByTagName('form')[0];
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var body = {
                title: form.elements['title'].value,
                content: form.elements['content'].value,
                content_input_type: 'rte',
                status: 'published'
            };
            
            // Send the article body to the API.
            var client = new DeskproClient('http://deskpro.company.com');
            client.setAuthKey(1, 'dev-admin-code');
            
            client.post('/articles', body)
                .then(function(resp) {
                    console.log('Article created with ID ' + resp.data.id);
                })
                .catch(function(err) {
                    console.error(err.message);
                });
        });
    </script>
  </body>
</html>
```

{% common %}
Submitting the form should show you something like this in your debug console:

```
Article created with ID 107
```
{% endmethod %}
