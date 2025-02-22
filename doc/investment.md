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
    "user_id": "user-hf848-fhh66", // string
    "investment_type_id": 8 // number
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
      "user_id": "user-hf848-fhh66",
      "investment_type_id": 8,
      "createdAt": "2025-02-18T13:28:09.379Z",
      "updatedAt": "2025-02-18T13:28:09.379Z"
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
        "createdAt": "2025-02-18T13:28:09.379Z",
        "updatedAt": "2025-02-18T13:28:09.379Z",
        "user": "user-a22db-dc83-4705-9094",
        "investment_type": {
          "id": 8,
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
      "createdAt": "2025-02-18T13:28:09.379Z",
      "updatedAt": "2025-02-18T13:28:09.379Z",
      "user": {
        "id": "user-a22db-dc83-4705-9094",
        "email": "john@gmail.com",
        "name": "John Doe",
        "currency": "IDR"
      },
      "investment_type": {
        "id": 8,
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
    "value_buy": 1000000000 // number
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
      "createdAt": "2025-02-18T13:28:09.379Z",
      "updatedAt": "2025-02-18T13:28:09.379Z",
      "user_id": "user-hf848-fhh66",
      "investment_type_id": 8
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
      "createdAt": "2025-02-18T13:28:09.379Z",
      "updatedAt": "2025-02-18T13:28:09.379Z",
      "user_id": "user-hf848-fhh66",
      "investment_type_id": 8
    }
  }
  ```
