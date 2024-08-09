[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15504619&assignment_repo_type=AssignmentRepo)

# Individual Project Phase 2

## Endpoints :

List of available endpoints:

-   `GET /`
-   `POST /register`
-   `POST /login`
-   `POST /google-login`
-   `GET /user`
-   `PUT /user`
-   `PATCH /user/img`
-   `GET /user/payment/midtrans`
-   `PATCH /user/upgrade`
-   `GET /items`
-   `POST /items`
-   `GET /items/cat`
-   `GET /items/cat/all`
-   `GET /items/cat/:catId`
-   `GET /items/:itemId`
-   `PUT /items/:itemId`
-   `DELETE /items/:itemId`
-   `PATCH /items/:itemId/img`
-   `POST /openai/fun-fact`
-   `POST /openai/outfit`

## 1. GET /

_Response (200 - OK)_

```json
"Server Running"
```

&nbsp;

## 2. POST /register

Request:

-   body :

```json
{
    "email": "string",
    "password": "string"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "email": "user@gmail.com"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": [
        "Email already registered"
    ]
}
OR
{
    "message": [
        "Email Required!"
    ]
}
OR
{
    "message": [
        "Please input valid email"
    ]
}
OR
{
    "message": [
        "Password Required!"
    ]
}
```

&nbsp;
&nbsp;

## 3. POST /login

Request :

-   body :

```json
{
    "email": "string",
    "password": "string"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Please input your email!"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Please input your password!"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid email or password"
}
```

&nbsp;

## 4. POST /google-login

Request :

-   headers :

```json
{
    "google_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string"
}
```

&nbsp;

## 5. GET /user

Request :

-   headers :

```json
{
    "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  {
    "id": 1,
    "name": "Ariiq Ramadhan",
    "skinUndertone": null,
    "imageUrl": "https://lh3.googleusercontent.com/a/ACg8ocJMrzNeD0Z-MJe8G2aK61rsGiX4oVf9tKZeOv-eXUqS2SzOzFiv=s96-c",
    "UserId": 1,
    "type": "Premium"
  }
}
```
&nbsp;

## 6. PUT /user

Request :

-   headers :

```json
{
    "access_token": "string"
}
```

- body :
```json
{
    "name": "string",
    "skinUndertone": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Successfully update profile"
}
```
&nbsp;

## 7. PATCH /user/img

Request :

-   headers :

```json
{
    "access_token": "string"
}
```

- file :
```json
{
    "userImg": "image"
}
```

_Response (200 - OK)_

```json
{
    "message": "Successfully upload image"
}
```
&nbsp;

## 8. GET /user/payment/midtrans

Request :

-   headers :

```json
{
    "access_token": "string"
}
```

_Response (200 - OK)_

```json
{   
    "trans_token": "string", 
    "orderId": "string"
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "You are already a premium"
}
```
&nbsp;

## 9. PATCH /user/upgrade

Request :

-   headers :

```json
{
    "access_token": "string"
}
```

_Response (200 - OK)_

```json
{   
    "message": "Upgrade Success"
}
```

_Response (404 - Error Not Found)_
```json
{
    "message": "Data Not Found!"
}
```

_Response (400 - Bad Request)_
```json
{
    "message": "You failed to upgrade, contact our customer support"
}
```
&nbsp;

## 10. GET /items

Request :

-   headers :

```json
{
    "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Carpenter Pants",
        "color": "Blue Denim",
        "brand": "",
        "description": "",
        "imageUrl": null,
        "CategoryId": 3,
        "UserId": 1,
        "createdAt": "2024-08-08T23:29:50.368Z",
        "updatedAt": "2024-08-08T23:29:50.368Z",
        "Category": {
            "name": "Pants"
        }
    },
    ...
]
```
## 11. POST /items

Request :

-   headers :

```json
{
    "access_token": "string"
}
```

- body :
```json
{
    "name": "string",
    "color": "string",
    "brand": "string",
    "CategoryId": "integer",
    "description": "string" 
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "name": "Carpenter Pants",
    "color": "Blue Denim",
    "brand": "",
    "description": "",
    "CategoryId": 3,
    "UserId": 1,
    "updatedAt": "2024-08-08T23:29:50.368Z",
    "createdAt": "2024-08-08T23:29:50.368Z",
    "imageUrl": null
}
```
&nbsp;

## 12. GET /items/cat

Request :

-   headers :

```json
{
    "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Shirt",
        "description": "A garment for the upper body, including both collared shirts and casual T-shirts, with various styles and fits.",
        "Items": []
    },
    {
        "id": 2,
        "name": "Outer",
        "description": "Clothing worn over other clothes for warmth or style, such as jackets, coats, and cardigans.",
        "Items": []
    },
    ...
]
```
&nbsp;

## 13. GET /items/cat/all

Request :

-   headers :

```json
{
    "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Shirt",
        "description": "A garment for the upper body, including both collared shirts and casual T-shirts, with various styles and fits.",
        "Items": []
    },
    {
        "id": 2,
        "name": "Outer",
        "description": "Clothing worn over other clothes for warmth or style, such as jackets, coats, and cardigans.",
        "Items": []
    },
    {
        "id": 3,
        "name": "Pants",
        "description": "Clothing worn from the waist to the ankles, covering each leg separately.",
        "Items": [
            {
                "id": 1,
                "name": "Carpenter Pants",
                "color": "Blue Denim",
                "brand": "",
                "description": "",
                "imageUrl": null
            }
        ]
    },
    ...
]
```
&nbsp;

## 14. GET /items/cat/:catId

Request :

-   headers :

```json
{
    "access_token": "string"
}
```

- params :
```json
{
    "catId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "id": 3,
    "name": "Pants",
    "description": "Clothing worn from the waist to the ankles, covering each leg separately.",
    "createdAt": "2024-08-08T21:58:10.287Z",
    "updatedAt": "2024-08-08T21:58:10.287Z",
    "Items": [
        {
            "id": 1,
            "name": "Carpenter Pants",
            "color": "Blue Denim",
            "brand": "",
            "description": "",
            "imageUrl": null,
            "CategoryId": 3,
            "UserId": 1,
            "createdAt": "2024-08-08T23:29:50.368Z",
            "updatedAt": "2024-08-08T23:29:50.368Z"
        }
    ]
}
```
&nbsp;

## 15. GET /items/:itemId

Request :

-   headers :

```json
{
    "access_token": "string"
}
```

- params :
```json
{
    "itemId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "name": "Carpenter Pants",
    "color": "Blue Denim",
    "brand": "",
    "description": "",
    "imageUrl": null,
    "CategoryId": 3,
    "UserId": 1,
    "createdAt": "2024-08-08T23:29:50.368Z",
    "updatedAt": "2024-08-08T23:29:50.368Z",
    "Category": {
        "name": "Pants"
    }
}
```
_Response (404 - Error Not Found)_
```json
{
    "message": "Data Not Found!"
}
```
_Response (403 - Forbidden)_
```json
{
    "message": "Insufficient privileges to do this action"
}
```
&nbsp;

## 16. PUT /items/:itemId

Request :

-   headers :

```json
{
    "access_token": "string"
}
```

- params :
```json
{
    "itemId": "integer (required)"
}
```
- body :
```json
{
    "name": "string",
    "color": "string",
    "brand": "string",
    "CategoryId": "integer",
    "description": "string" 
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "name": "Carpenter Pants",
    "color": "Blue Denim",
    "brand": "",
    "description": "",
    "CategoryId": 3,
    "UserId": 1,
    "updatedAt": "2024-08-08T23:29:50.368Z",
    "createdAt": "2024-08-08T23:29:50.368Z",
    "imageUrl": null
}
```
_Response (404 - Error Not Found)_
```json
{
    "message": "Data Not Found!"
}
```
_Response (403 - Forbidden)_
```json
{
    "message": "Insufficient privileges to do this action"
}
```
&nbsp;

## 17. DELETE /items/:itemId

Request :

-   headers :

```json
{
    "access_token": "string"
}
```

- params :
```json
{
    "itemId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "message": "Successfully delete item 1"
}
```
_Response (404 - Error Not Found)_
```json
{
    "message": "Data Not Found!"
}
```
_Response (403 - Forbidden)_
```json
{
    "message": "Insufficient privileges to do this action"
}
```
&nbsp;

## 18. PATCH /items/:itemId/img

Request :

-   headers :

```json
{
    "access_token": "string"
}
```

- params :
```json
{
    "itemId": "integer (required)"
}
```
- file :
```json
{
    "itemImg": "image"
}
```

_Response (200 - OK)_

```json
{
    "message": "Successfully upload image"
}
```
_Response (404 - Error Not Found)_
```json
{
    "message": "Data Not Found!"
}
```
_Response (403 - Forbidden)_
```json
{
    "message": "Insufficient privileges to do this action"
}
```
&nbsp;

## 19. POST /openai/fun-fact

Request :

-   headers :

```json
{
    "access_token": "string"
}
```

- body :
```json
{
    "name": "string",
    "brand": "string",
    "catName": "string"
}
```

_Response (200 - OK)_

```json
"string"
```
&nbsp;

## 20. POST /openai/outfit

Request :

-   headers :

```json
{
    "access_token": "string"
}
```

- body :
```json
{
    "data": "array of object",
    "skinUndertone": "string"
}
```

_Response (200 - OK)_

```json
"string"
```

_Response (400 - Bad Request)_
```json
{
    "message": "You must be premium to do this action"
}
```
&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

_Response (401 - Unauthorized)_
```json
{
    "message": "Invalid Token"
}
```