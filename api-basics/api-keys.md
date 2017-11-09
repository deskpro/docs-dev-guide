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

#### Using API Keys

To use an API key, send an `Authorization` header in the format of: `key your_api_key`. That's the constant string "`key`" followed by a space, followed by the API key as it appears in the admin interface.

#### FAQ

**So the things I can do with the API depends on which agent the key is bound to?**

That's right. The API key inherits all permissions from the agent it's bound to. For example, if an agent can't access tickets assigned to other agents, then using the API to do that will fail as well.

**How do I create a "super" API key that can do anything?**

This is typically done by creating an API key bound to an administrator user who has permissions to do everything.

**What is a "superuser" API key?**

A superuser API key is an API key that can be bound to _any_ agent. You need to specify the agent as part of your request.