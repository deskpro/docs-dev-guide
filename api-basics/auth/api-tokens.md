API Tokens
==========

API tokens are similar to API Keys except that they are _generated_ by some mechanism and not created manually by an admin. An API token is otherwise mostly identical to an API key in how they function.

You would use API tokens when you want to have your agents authorize apps that work on behalf of them. Examples:

* Mobile apps
* Browser extensions
* "Log in with Deskpro" type workflows

There are two methods to generate API Tokens. The recommended method is with [OAuth](/api-basics/api-keys/oauth.md). However, there's a [legacy token exchange](/api-basics/api-keys/api-tokens/token-exchange-endpoint.md) method that can be used as well.

## Differences between API Keys and API Tokens

Functionally, there is little difference between keys and tokens other than the manner in which they're defined and, generally, the problem they're meant to solve.

* Keys are manually created by an admin and are perfect for scripts that need to perform tasks against the Deskpro API.
* Conversely, tokens are created by end-users (by authenticating some how, such as with OAuth) and the token is given to the application so the app can perform actions on behalf of the user.

There are a few other differences as well:

* Tokens are always bound to the user that created it. i.e. there is no way to re-assign a token to another user or change the user on-the-fly. Indeed, there isn't any management interface for tokens at all.
* Tokens and API keys both only allow the API to perform tasks that the user is allowed to perform. However, with API keys you can further limit the endpoints with tags. This feature is not available to tokens.
* Tokens can be revoked by end-users. For example, they can review a list of apps they have granted access to and decide to revoke access if they want to.