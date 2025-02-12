## Category and Investment Type Endpoint

This is documentations for Category and Investment Type endpoints

### 1. Create Category

ENUM TYPE : [INCOME,EXPENSE]

ENUM ROLE : [ADMIN]

- endpoint : `/categories`
- method : `POST`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
- request body :
  ```json
  {
    "name": "Makanan", // string
    "type": "EXPENSE" // ENUM
  }
  ```
- response body :
  - status code: `201`
  ```json
  {
    "status": "Success",
    "message": "Category Created Successfully",
    "data": {
      "id": "category-hf99-hg65",
      "name": "Makanan",
      "type": "EXPENSE"
    }
  }
  ```

### 2. Get Categories

- endpoint : `/categories`
- method : `GET`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
  - query :
  ```json
  {
    "search": "Makanan", // name or type,
    "page": "1",
    "perPage": "10"
  }
  ```
- response body :
  - status code : `200`
  ```json
  {
    "status": "Success",
    "message": "Categories Fetched Successfully",
    "data": [
      {
        "id": "category-hf99-hg65",
        "name": "Makanan",
        "type": "EXPENSE"
      }
    ]
  }
  ```

### 3. Create Investment Type

ENUM ROLE : [ADMIN]

- endpoint : `/investment-types`
- method : `POST`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
- request body :
  ```json
  {
    "type": "Crypto" // string
  }
  ```
- response body :
  - status code : `201`
  ```json
  {
    "status": "Success",
    "message": "Investment Types Fetched Successfully",
    "data": {
      "id": "investment-type-hf99-hg65",
      "type": "Crypto"
    }
  }
  ```

### 4. Get Investment Types

- endpoint : `/investment-types`
- method : `GET`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
  - query :
  ```json
  {
    "search": "Crypto", // type
    "page": "1",
    "perPage": "10"
  }
  ```
- response body :
  - status code : `200`
  ```json
  {
    "status": "Success",
    "message": "Investment Types Fetched Successfully",
    "data": [
      {
        "id": "investment-type-hf99-hg65",
        "type": "Crypto"
      }
    ]
  }
  ```
