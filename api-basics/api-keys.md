Authentication and Authorization
================================

All API requests are executed in the context of a specific account (e.g. admin, agent, user, guest).

API endpoints have certain access restrictions assigned to them that limit who can access them. A few select API endpoints are completely open and world-readable (like `helpdesk/discover` demonstrated in the intro). But most require you to authenticate.

There are _two ways_ to authenticate with the API that we'll explain in the following section.
