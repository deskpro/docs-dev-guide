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
