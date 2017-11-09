API Tokens
==========

API tokens are similar to API Keys except that they are _generated_ by some mechanism and not created manually by an admin. An API token is otherwise mostly identical to an API key in how they function.

You would use API tokens when you want to have your agents authorize apps that work on behalf of them. Examples:

* Mobile apps
* Browser extensions
* "Log in with Deskpro" type workflows

There are two methods to generate API Tokens.

## Recommended: OAuth

The best way and most secure way to obtain tokens is through OAuth. OAuth is a well-established standard and is widely used (e.g. Google, Facebook, Twitter, etc).

Generally, the way OAuth works is:

1. Your app wants a token for a particular user and initiates an OAuth flow
2. The user is redirected to Deskpro where the user logs-in to their account
3. The user is asked to confirm they want to allow the connection
4. Deskpro redirects the user back to your app
5. Then you finish the OAuth2 flow and obtain a token for the user.

For a more in-depth guide to using OAuth, follow through to the next section.

## Not recommended: Token Exchange Endpoint (email/password)

A simple way to get an API token is to use the `api_tokens` endpoint. This endpoint accepts a email address and password, and returns you an API token that you can use from that point forward.

This is an _open_ API (so it doesn't require an API key to use). The purpose for this was originally to allow developers to use a custom login form. This is not very secure because _your_ script needs to accept the user password and pass it on to the API -- so there's more surface area for things to go wrong and have a password leaked.

Additionally, this method does not work with any external auth providers you might set up in Deskpro (e.g. SAML, Google Apps, etc).

Here's an example

{% method %}
{% sample lang="bash" %}
```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"email": "john@example.com", "password": "foobar"}' \
    http://example.com/api/v2/me
```

{% common %}
```json
{
    "person_id": 5,
    "token": "X:XXX",
    ...
}
```
{% endmethod %}

To use a token, use the `Authorization` header like you would with an API key except instead of the string "key" use the string "token":

{% method %}
{% sample lang="bash" %}
```bash
curl -H "Authorization: token X:XXX" \
    http://example.com/api/v2/me
```
{% endmethod %}
