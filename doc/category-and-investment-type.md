## Category and Investment Type Endpoint

This is documentations for Category and Investment Type endpoints

### 1. Get Categories

- endpoint : `/categories`
- method : `GET`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
- response body :
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

### 2. Get Investment Types

- endpoint : `/investment-types`
- method : `GET`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
- response body :
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
