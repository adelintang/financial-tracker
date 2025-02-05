## User Endpoint

This is documentations for user endpoints

### 1. Get Users

- endpoint : `/users`
- method : `GET`
- Content-Type : `application/json`
- request headers :

  - Authorization: Bearer `accessToken`
  - query :
    ```json
    {
      "search": "john",
      "page": "1",
      "perPage": "10"
    }
    ```

- response body:

  status code : `200`

  ```json
  {
    "status": "Success",
    "message": "Users Fetched Successfully",
    "data": [
      {
        "id": "user-hdjsd3-hfjei",
        "email": "john@gmail.com",
        "name": "John Doe",
        "currency": "IDR"
      }
    ],
    "meta": {
      "currentPage": 1,
      "perPage": 10,
      "totalCurrentPage": 1,
      "totalPage": 2,
      "totalData": 20
    }
  }
  ```

### 2. Get User

- endpoint : `/users/:userId`
- method : `GET`
- Content-Type : `application/json`
- request headers :

  - Authorization: Bearer `accessToken`
  - params: `userId`

- response body:

  status code : `200`

  ```json
  {
    "status": "Success",
    "message": "User Fetched Successfully",
    "data": {
      "id": "user-hdjsd3-hfjei",
      "email": "john@gmail.com",
      "name": "John Doe",
      "currency": "IDR"
    }
  }
  ```
