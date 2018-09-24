# PHP

Welcome to the Deskpro API. This section will guide you through creating an article form with PHP, from start to finish.

The first step is to create an [API Key](../../api-basics/auth/api-keys.md). Go to _Admin &gt; Apps &gt; API Keys_ to create an API Key for yourself.

Next:

1. Create a new directory on your computer
2. Use [composer](https://getcomposer.org) to create a new project
3. Use composer to install the [PHP API Client](https://github.com/deskpro/deskpro-api-client-php)
4. Create an empty `form.php` file

For example, from the command-line it might look something like this:

```bash
$ mkdir article-form
$ cd article-form/
$ composer init -n --name example/article-form
$ composer require deskpro/deskpro-api-client-php
$ touch form.php
```

