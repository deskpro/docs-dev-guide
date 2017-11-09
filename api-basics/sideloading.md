Sideloading
===========

Most objects in Deskpro have other objects that are related to them. For example, a ticket has various users associated with it such as the creator, the assigned agent and any followers or CC'd users.

By default, the API will only return the IDs of these related objects and if you needed more information, you would need to use the API again to fetch the objects you wanted (for example, to get the actual title of the department a ticket was in).

However, this is tedious if you are doing it a lot. For this reason, the DeskPRO API has the idea of _side-loading_ which instructs the API to return related objects of certain types. You do this by specifying the type of object you want to side-load in the request as a query parameter: `include=type1,type2,type3`.

Examples:

* `/tickets/123?include=department`
* `/tickets/123?include=department,person,category,product,workflow`
* `/people/456?include=usergroup`

When you specify an `include` parameter, the related objects are returned in the response under the `linked` object. You'll get properties like `linked.TYPENAME.ID`.

(Note that the actual data response stays the same. Your own app logic will need to connect the ID from the `data` to the object returned in the `linked` section.)

Example ticket response without side loading

```shell
curl -H "Authorization: key 1:CVRRGQ58QDX8H5B4W4RAJ978Q" \
	http://example.com/api/v2/tickets/123
```

Example response. Notice how we have IDs for various relationships such as the person, agent or department.

```json
{
    "data": {
        "id": 123,
        "ref": "XXXX-0028-IOCC",
        "department": 20,
        "person": 59080,
        "agent": 2,
        "status": "awaiting_user",
        "subject": "Example Ticket"
    },
    "meta": [],
    "linked": []
}
```

Example WITH sideloading on department and person

```shell
curl -H "Authorization: key 1:CVRRGQ58QDX8H5B4W4RAJ978Q" \
	http://example.com/api/v2/tickets/123?include=department,person
```

Example response with sideloaded objects

```json
{
    "data": {
        "id": 123,
        "ref": "XXXX-0028-IOCC",
        "department": 20,
        "person": 59080,
        "agent": 2,
        "status": "awaiting_user",
        "subject": "Example Ticket"
    },
    "meta": [],
    "linked": {
        "department": {
            "20": {
                "id": 20,
                "title": "Support"
            }
        },
        "person": {
            "2": {
                "id": 2,
                "name": "John Doe",
                "primary_email": "agent@example.com"
            },
            "59080": {
                "id": 59080,
                "name": "Fionna Apple",
                "primary_email": "user@example.com"
            }
        }
    }
}
```

