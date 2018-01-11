Add a form
==========
Next, let's add a form to the page and get ready to handle it.

{% method %}
{% sample lang="php" %}
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
        // Listen for the form submit event. We will use an ajax
        // request to send the new article to the API.
        var form = document.getElementsByTagName('form')[0];
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var body = {
                title: form.elements['title'].value,
                content: form.elements['content'].value
            };
            
            console.log(body);
        });
    </script>
  </body>
</html>
```

{% common %}
Open the `index.html` in your browser and open the debug console. Fill out and submit the form. You'll see a bunch of JSON output. Something like:

```json
{
    "title": "This is a title",
    "content": "This is the content."
}
```

{% endmethod %}