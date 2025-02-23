## Report Endpoint

This is documentations for report endpoints

### 1. Create Report this Month

- endpoint : `/reports/generate-permonth`
- method : `GET`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
- response body :
  ```json
  {
    "status": "Success",
    "message": "Report Created Successfully",
    "data": {
      "id": "report-hf99-gh12",
      "month": "2025-02-01",
      "totalIncome": 25000000,
      "totalexpense": 10000000,
      "investmentGrowth": 80,
      "userId": "user-hg87-hy65"
    }
  }
  ```

### 2. Get Reports

- endpoint : `/reports`
- method : `GET`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
  - query :
  ```json
  {
    "year": "2025",
    "month": "1",
    "page": "1",
    "perPage": "10"
  }
  ```
- response body :
  ```json
  {
    "status": "Success",
    "message": "Reports Fetched Successfully",
    "data": [
      {
        "id": "report-hf99-gh12",
        "month": "2025-02-01",
        "totalIncome": 25000000,
        "totalexpense": 10000000,
        "investmentGrowth": 80,
        "userId": "user-hg87-hy65"
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

### 3. Get Report

- endpoint : `/reports/:reportId`
- method : `GET`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
- response body :
  ```json
  {
    "status": "Success",
    "message": "Report Fetched Successfully",
    "data": {
      "id": "report-hf99-gh12",
      "month": "2025-02-01",
      "totalIncome": 25000000,
      "totalexpense": 10000000,
      "investmentGrowth": 80,
      "userId": "user-hg87-hy65"
    }
  }
  ```
