Getting Started
===============

Welcome to the Deskpro API. This section will guide you through creating a simple ticket form with PHP, from start to finish.

The first step is to create an [API Key](/api-basics/auth/api-keys.md). Go to _Admin > Apps > API Keys_ to create an API Key for yourself.

Next:

1. Create a new directory on your computer
2. Use [composer](https://getcomposer.org) to create a new project
3. Use composer install the [PHP API Client](https://github.com/deskpro/deskpro-api-client-php).
4. Create an empty `form.php` file

For example, from the command-line it might look something like this:

```bash
$ mkdir new-ticket-form
$ cd new-ticket-form/
$ composer init -n --name example/new-ticket-form
$ composer require deskpro/deskpro-api-client-php
$ touch form.php
```

You should have a directory on your computer that looks a little like this:

![](/assets/Screen Shot 2017-11-09 at 17.26.12.png)
