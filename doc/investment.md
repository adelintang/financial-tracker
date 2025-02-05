## Investment Endpoint

This is documentations for investment endpoints

### 1. Create Investment

- endpoint : `/investments`
- method : `POST`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
- request body :
  ```json
  {
    "name": "Bitcoin", // string
    "amount": 1000000, // number
    "value_buy": 1000000000, // number
    "date": "2025-02-01", // string
    "user_id": "user-hf848-fhh66", // string
    "investment_type_id": "investment-type-hf88-gedhh777" // string
  }
  ```
- response body :
  ```json
  {
    "status": "Success",
    "message": "Investment Created Successfully",
    "data": {
      "id": "investment-hf848-fhh66",
      "name": "Bitcoin",
      "amount": 1000000,
      "value_buy": 1000000000,
      "date": "2025-02-01",
      "user_id": "user-hf848-fhh66",
      "investment_type_id": "investment-type-h8dh-dhh88"
    }
  }
  ```

### 2. Get Investments

- endpoint : `/investments`
- method : `GET`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
  - query :
    ```json
    {
      "search": "Bitcoin",
      "date": "Selasa, 1 Febuari 2025",
      "type": "Crypto",
      "page": "1",
      "perPage": "10"
    }
    ```
- response body :
  ```json
  {
    "status": "Success",
    "message": "Investments Fetched Successfully",
    "data": [
      {
        "id": "investment-hf848-fhh66",
        "name": "Bitcoin",
        "amount": 1000000,
        "value_buy": 1000000000,
        "date": "2025-02-01",
        "user_id": "user-hf848-fhh66",
        "investment_type_id": "investment-type-h8dh-dhh88",
        "investment_type": {
          "id": "investment-type-h8dh-dhh88",
          "type": "Crypto"
        }
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

### 3. Get Investment

- endpoint : `/investments/:investmentId`
- method : `GET`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
- response body :
  ```json
  {
    "status": "Success",
    "message": "Investment Fetched Successfully",
    "data": {
      "id": "investment-hf848-fhh66",
      "name": "Bitcoin",
      "amount": 1000000,
      "value_buy": 1000000000,
      "date": "2025-02-01",
      "user_id": "user-hf848-fhh66",
      "investment_type_id": "investment-type-h8dh-dhh88",
      "investment_type": {
        "id": "investment-type-h8dh-dhh88",
        "type": "Crypto"
      }
    }
  }
  ```

### 4. Update Investment

- endpoint : `/investments/:investmentId`
- method : `PATCH`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
- request body :
  ```json
  {
    "name": "Bitcoin", // string
    "amount": 1000000, // number
    "value_buy": 1000000000, // number
    "date": "2025-02-01" // string
  }
  ```
- response body :
  ```json
  {
    "status": "Success",
    "message": "Investment Updated Successfully",
    "data": {
      "id": "investment-hf848-fhh66",
      "name": "Bitcoin",
      "amount": 1000000,
      "value_buy": 1000000000,
      "date": "2025-02-01",
      "user_id": "user-hf848-fhh66",
      "investment_type_id": "investment-type-h8dh-dhh88"
    }
  }
  ```

### 5. Delete Investment

- endpoint : `/investments/:investmentId`
- method : `DELETE`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
- response body :
  ```json
  {
    "status": "Success",
    "message": "Investment Deleted Successfully",
    "data": {
      "id": "investment-hf848-fhh66",
      "name": "Bitcoin",
      "amount": 1000000,
      "value_buy": 1000000000,
      "date": "2025-02-01",
      "user_id": "user-hf848-fhh66",
      "investment_type_id": "investment-type-h8dh-dhh88"
    }
  }
  ```
