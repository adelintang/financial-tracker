## Product Endpoint

This is documentations for product endpoints

### 1. Create Product

- endpoint : `/products`
- method : `POST`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
- middlewares:
  - Role: `RESELLER`
- request body :
  ```json
  {
    "name": string // Susu Frisian Flag 545g
    "description": string // Susu Frisian Flag 545g deskripsi
    "price": number // 14000
    "qty": number // 100
    "userId": string // user-djs23-fhh444
  }
  ```
- response body :
  - status code : `201`
  ```json
  {
    "status": "Success",
    "message": "Product Created Successfully",
    "data": {
      "name": "Susu Frisian Flag 545g"
      "description": "Susu Frisian Flag 545g deskripsi"
      "price": 14000
      "qty": 100
      "userId": "user-djs23-fhh444"
    }
  }
  ```

### 2. Get Products

- endpoint : `/products`
- method : `GET`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
  - query :
    ```json
    {
      "search": "Frisian Flag",
      "page": "1",
      "perPage": "10"
    }
    ```
- response body:
  - status code: `200`
  ```json
  {
    "status": "Success",
    "message": "Products Fetched Successfully",
    "data": [
      {
        "name": "Susu Frisian Flag 545g"
        "description": "Susu Frisian Flag 545g deskripsi"
        "price": 14000
        "qty": 100
        "userId": "user-djs23-fhh444"
      }
    ],
    "meta": {
      "currentPage": 1,
      "perPage": 10,
      "totalCurrentPage": 1,
      "totalPage": 2,
      "totalData": 20,
    }
  }
  ```

### 3. Get Product

- endpoint : `/products/:productId`
- method : `GET`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
  - params: `productId`
- response body:
  - status code: `200`
  ```json
  {
    "status": "Success",
    "message": "Product Fetched Successfully",
    "data": {
      "name": "Susu Frisian Flag 545g"
      "description": "Susu Frisian Flag 545g deskripsi"
      "price": 14000
      "qty": 100
      "userId": "user-djs23-fhh444"
    }
  }
  ```

### 4. Update Product

- endpoint : `/products/:productId`
- method : `PATCH`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
  - params: `productId`
- middlewares:
  - Role: `RESELLER`
  - Owner: `userId`
- request body:
  ```json
  {
    "name": string // "Susu Frisian Flag 545g"
    "description": string // "Susu Frisian Flag 545g deskripsi"
    "price": number // 14000
    "qty": number // 100
  }
  ```
- response body:
  - status code: `200`
  ```json
  {
    "status": "Success",
    "message": "Product Updated Successfully",
    "data": {
      "name": "Susu Frisian Flag 545g"
      "description": "Susu Frisian Flag 545g deskripsi"
      "price": 14000
      "qty": 100
      "userId": "user-djs23-fhh444"
    }
  }
  ```

### 5. Delete Product

- endpoint : `/products/:productId`
- method : `DELETE`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
  - params: `productId`
- middlewares:
  - Role: `RESELLER`
  - Owner: `userId`
- response body:
  - status code: `200`
  ```json
  {
    "status": "Success",
    "message": "Product Deleted Successfully",
    "data": {
      "name": "Susu Frisian Flag 545g"
      "description": "Susu Frisian Flag 545g deskripsi"
      "price": 14000
      "qty": 100
      "userId": "user-djs23-fhh444"
    }
  }
  ```
