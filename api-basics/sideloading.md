# Sideloading

Most objects in Deskpro have other objects that are related to them. For example, a ticket has various users associated with it such as the creator, the assigned agent and any followers or CC'd users.

By default, the API will only return the IDs of these related objects and if you needed more information, you would need to use the API again to fetch the objects you wanted \(for example, to get the actual title of the department a ticket was in\).

However, this is tedious if you are doing it a lot. For this reason, the DeskPRO API has the idea of _side-loading_ which instructs the API to return related objects of certain types. You do this by specifying the type of object you want to side-load in the request as a query parameter: `include=type1,type2,type3`.

Examples:

* `/tickets/123?include=department`
* `/tickets/123?include=department,person,category,product,workflow`
* `/people/456?include=usergroup`

When you specify an `include` parameter, the related objects are returned in the response under the `linked` object. You'll get properties like `linked.TYPENAME.ID`.

\(Note that the actual data response stays the same. Your own app logic will need to connect the ID from the `data` to the object returned in the `linked` section.\)

Example ticket response without side loading

```text
curl -H "Authorization: key 1:CVRRGQ58QDX8H5B4W4RAJ978Q" \
    http://example.com/api/v2/tickets/123
```

Example response. Notice how we have IDs for various relationships such as the person, agent or department.

```javascript
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

```text
curl -H "Authorization: key 1:CVRRGQ58QDX8H5B4W4RAJ978Q" \
    http://example.com/api/v2/tickets/123?include=department,person
```

Example response with sideloaded objects

```javascript
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

## Inline Sideloading

Above you saw that sideloading loads related resources into the `linked` key in the response. That means it's still up to you, the developer, to map an ID from the `data` to the correct value in `linked`.

To make this even easier, you can choose to _inline_ the data. This replaces the IDs with the actual object itself, making consuming requests very very easy.

To enable inlining, you specify a query parameter `inline_sideloads=1`.

Same example above but with inlining enabled:

```text
curl -H "Authorization: key 1:CVRRGQ58QDX8H5B4W4RAJ978Q" \
    http://example.com/api/v2/tickets/123?include=department,person&inline_sideloads=1
```

Example response with sideloaded objects

```javascript
{
    "data": {
        "id": 123,
        "ref": "XXXX-0028-IOCC",
        "department": {
            "id": 20,
            "title": "Support"
        },
        "person": {
            "id": 59080,
            "name": "Fionna Apple",
            "primary_email": "user@example.com"
        },
        "agent": {
            "id": 2,
            "name": "John Doe",
            "primary_email": "agent@example.com"
        },
        "status": "awaiting_user",
        "subject": "Example Ticket"
    },
    "meta": [],
    "linked": {}
}
```

Inlining can make your life easier, but it comes at the cost of _data duplication_. For example, if you loading a list of 100 tickets, then the same agent might be assigned to many different tickets. Inlining would copy the agent data in multiple places which would increase the size of the response considerably.

So it's often beneficial to keep the default behaviour and link IDs to `linked` objects in your application logic.

