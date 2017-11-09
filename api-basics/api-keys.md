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

{% method %}
{% sample lang="bash" %}
Here’s an example call made to the `helpdesk/discover` endpoint:
```bash
curl -H "Authorization: key 2:YWK2PGCS8CNW62SR8TBTBKWMY" \
    http://example.com/api/v2/me
```

{% common %}
The response will look something like this:
```json
{
    "data": {
        "auth_method": "api_key",
        "app_id": null,
        "person_id": 1,
        "person": {
            "id": 1,
            "...": "..."
        }
    },
    "meta": {},
    "linked": {}
}
```
{% endmethod %}

#### FAQ

**So the things I can do with the API depends on which agent the key is bound to?**

That's right. The API key inherits all permissions from the agent it's bound to. For example, if an agent can't access tickets assigned to other agents, then using the API to do that will fail as well.

**How do I create a "super" API key that can do anything?**

This is typically done by creating an API key bound to an administrator user who has permissions to do everything.

**What is a "superuser" API key?**

A superuser API key is an API key that can be bound to _any_ agent. This makes it possible to specify a different agent ID in your API request and the API request will be run in that agent context instead. You can do this with an HTTP header like this:

```bash
curl -H "Authorization: key 2:YWK2PGCS8CNW62SR8TBTBKWMY" \
    -H "X-DeskPRO-Agent-ID: 4" \
    http://example.com/api/v2/me
```

For example, this might be useful if you had an API that wants to change the author of an automated reply. Instead of creating one API key per agent, and using different API keys in your scripts, you can use a single API key and switch the agent dynamically.

