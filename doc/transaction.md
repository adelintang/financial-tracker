## Transaction Endpoint

This is documentations for transaction endpoints

ENUM: [INCOME,EXPENSE]

### 1. Create Transaction

- endpoint : `/transactions`
- method : `POST`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
- request body :
  ```json
  {
    "type": "EXPENSE", // Enum
    "amount": 10000, // number
    "description": "membeli beras 10kg", // string
    "userId": "user-hdh77-hdh666",
    "categoryId": "category-hdh77-hdh666"
  }
  ```
- response body :
  ```json
  {
    "status": "Success",
    "message": "Transaction Created Successfully",
    "data": {
      "id": "transaction-hf848-fhh66",
      "type": "EXPENSE",
      "amount": 10000,
      "description": "membeli beras 10kg",
      "created_at": "2025-02-01",
      "updated_at": "2025-02-01"
    }
  }
  ```

### 2. Get Transaction expense

- endpoint : `/transactions/expense`
- method : `GET`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
  - query :
    ```json
    {
      "search": "membeli beras 5kg",
      "date": "Selasa, 1 Febuari 2025",
      "page": "1",
      "perPage": "10"
    }
    ```
- response body :
  ```json
  {
    "status": "Success",
    "message": "Expense Transactions Fetched Successfully",
    "data": [
      {
        "id": "transaction-hf848-fhh66",
        "type": "EXPENSE",
        "amount": 10000,
        "description": "membeli beras 10kg",
        "created_at": "2025-02-01",
        "updated_at": "2025-02-01"
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

### 3. Get Transaction income

- endpoint : `/transactions/income`
- method : `GET`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
  - query :
    ```json
    {
      "search": "gaji bulan januari",
      "date": "Selasa, 1 Febuari 2025",
      "page": "1",
      "perPage": "10"
    }
    ```
- response body :
  ```json
  {
    "status": "Success",
    "message": "Income Transactions Fetched Successfully",
    "data": [
      {
        "id": "transaction-hf848-fhh66",
        "type": "INCOME",
        "amount": 10000,
        "description": "Gajian bulan 1",
        "created_at": "2025-02-01",
        "updated_at": "2025-02-01"
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

### 4. Get Transaction by id

- endpoint : `/transactions/:transactionId`
- method : `GET`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
- response body :
  ```json
  {
    "status": "Success",
    "message": "Transaction Fetched Successfully",
    "data": {
      "id": "transaction-hf848-fhh66",
      "type": "EXPENSE",
      "amount": 10000,
      "description": "membeli beras 10kg",
      "created_at": "2025-02-01",
      "updated_at": "2025-02-01",
      "category": {
        "id": "category-hdg99-hdh77",
        "name": "Makanan",
        "type": "EXPENSE"
      }
    }
  }
  ```

### 5. update Transaction by id

- endpoint : `/transactions/:transactionId`
- method : `PATCH`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
- request body :
  ```json
  {
    "type": "EXPENSE", // Enum
    "amount": 10000, // number
    "description": "membeli beras 10kg" // string
  }
  ```
- response body :
  ```json
  {
    "status": "Success",
    "message": "Transaction Updated Successfully",
    "data": {
      "id": "transaction-hf848-fhh66",
      "type": "EXPENSE",
      "amount": 10000,
      "description": "membeli beras 10kg",
      "created_at": "2025-02-01",
      "updated_at": "2025-02-01"
    }
  }
  ```

### 6. Delete Transaction by id

- endpoint : `/transactions/:transactionId`
- method : `DELETE`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
- response body :
  ```json
  {
    "status": "Success",
    "message": "Transaction Deleted Successfully",
    "data": {
      "id": "transaction-hf848-fhh66",
      "type": "EXPENSE",
      "amount": 10000,
      "description": "membeli beras 10kg",
      "created_at": "2025-02-01",
      "updated_at": "2025-02-01"
    }
  }
  ```
