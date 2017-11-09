Access Control with Tags
========================

Every API endpoint in the system has one or more "tags" associated with it. 

You can view the tags for a particular endpoint by finding it in the [Full API Browser](#api-browser). Expand the API endpoint to view the details, and under the "API tags for this endpoint" heading will be the list of tags applied to the endpoint.

The tags assigned to any given API endpoint usually follow a pretty standard pattern with a tag being composed of keywords from least specific to most specific.

* There's a top-level grouping. For example, `tickets.` means the tag is applying to something to do with tickets.
* A resource or object grouping. For example, `tickets.tickets.` means the tag is applying to an actual ticket (opposed to, say, a custom ticket field).
* An operation like `tickets.tickets.list` means to get a list of tickets.
  * The common operations are: `list`, `get`, `post`, `put`, and `delete`.

For example, `GET /api/v2/tickets` has a tag of `tickets.tickets.list`. And `DELETE /api/v2/tickets/{id}` has a tag of `tickets.tickets.delete`.

You can fine-tune access to API endpoints by specifying a tag pattern when you define the API key in Admin > Apps > API Keys. In the "Tags" tab, enter one or more tags you want to allow access to.

You can use wildcards to whitelist a whole group of related tags (indeed, the default value for API keys is to allow _all_ API endpoints so the value is `*`). You can also use a minus symbol to _remove_ specific actions you don't want to allow.

Examples:

* `*` all API endpoints
* `*, -tickets.*` all API endpoints except tickets
* `tickets.*, -*.delete` all ticket endpoints but nothing to do with deleting
* `tickets.tickets.list` only allow using the ticket listing API
