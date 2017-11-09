Authentication and Authorization
================================

All API requests are executed in the context of a specific account (e.g. admin, agent, user, guest).

API endpoints have certain access restrictions assigned to them that limit who can access them. A few select API endpoints are completely open and world-readable (like `helpdesk/discover` demonstrated in the intro). But most require you to authenticate.

There are _two ways_ to authenticate with the API that we'll explain below.

### API Keys

The most common way to use the API is with an _API Key_.

An API Key can be defined from within Deskpro at _Admin -> Apps -> API Keys_. You can define as many API keys as you want.

![](/assets/Screen Shot 2017-11-09 at 14.36.29.png)

The two important properties here are:

* The _API Key Code_ is like a password. You use this in your API requests to authenticate the request.
* The _Key Type_ option sets the user context for requests using this key. For example, if you set the agent to "Matthew", it means any API request you make with this API key will be run with all the permissions that Matthew normally has.
