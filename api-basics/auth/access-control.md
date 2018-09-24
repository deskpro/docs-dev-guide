# Access Control

## Endpoint Tags

Every API endpoint in the system has one or more "tags" associated with it.

You can view the tags for a particular endpoint by finding it in the [Full API Browser](access-control.md#api-browser). Expand the API endpoint to view the details, and under the "API tags for this endpoint" heading will be the list of tags applied to the endpoint.

The tags assigned to any given API endpoint usually follow a pretty standard pattern with a tag being composed of keywords from least specific to most specific.

* There's a top-level grouping. For example, `tickets.` means the tag is applying to something to do with tickets.
* A resource or object grouping. For example, `tickets.tickets.` means the tag is applying to an actual ticket \(opposed to, say, a custom ticket field\).
* An operation like `tickets.tickets.list` means to get a list of tickets.
  * The common operations are: `list`, `get`, `post`, `put`, and `delete`.

For example, `GET /api/v2/tickets` has a tag of `tickets.tickets.list`. And `DELETE /api/v2/tickets/{id}` has a tag of `tickets.tickets.delete`.

You can fine-tune access to API endpoints by specifying a tag pattern when you define the API key in Admin &gt; Apps &gt; API Keys. In the "Tags" tab, enter one or more tags you want to allow access to.

You can use wildcards to whitelist a whole group of related tags \(indeed, the default value for API keys is to allow _all_ API endpoints so the value is `*`\). You can also use a minus symbol to _remove_ specific actions you don't want to allow.

Examples:

* `*` all API endpoints
* `*, -tickets.*` all API endpoints except tickets
* `tickets.*, -*.delete` all ticket endpoints but nothing to do with deleting
* `tickets.tickets.list` only allow using the ticket listing API

## Access Modes

Most of the time, most APIs are available to any authenticated user of the API. But some APIs are locked down so they cannot be used except by users accessing the API by a specific method.

You can view these limitations on each endpoint by viewing the [Full API Browser](access-control.md#api-browser). In an expanded node for an endpoint, notice the value for "Applicable API Modes".

* `key` is the msot common and means the API can be used via an API key
* `token` means the API can be used by a token
* `session` means that the API can be used from the browser if the agent/admin is currently logged in. These are typically APIs used by the agent or admin interface in DeskPRO itself.

You almost never need to worry about this. Typically only internal APIs are marked as session or token only.

