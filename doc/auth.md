## Authentication Endpoint

This is documentations for authentication endpoints

ENUM: [IDR,USD]

### 1. Register

- endpoint : `/auth/register`
- method : `POST`
- Content-Type : `application/json`
- request body :
  ```json
  {
    "email": "john@gmail.com", // string
    "name": "John Doe", // string
    "password": "johndoe123", string
    "currency": "IDR", // Enum
  }
  ```
- response body :

  - status code : `201`

  ```json
  {
    "status": "Success",
    "message": "Registration User Successfully",
    "data": {
      "id": "user-hdjsd3-hfjei", // string
      "email": "john@gmail.com", // string
      "name": "John Doe", // string
      "currency": "IDR" // Enum
    }
  }
  ```

### 2. Login

- endpoint : `/auth/login`
- method : `POST`
- Content-Type : `application/json`
- request body :

  ```json
  {
    "email": "john@gmail.com", // string
    "password": "johndoe123" // string
  }
  ```

- response body :

  - status code : `200`

  ```json
  {
    "status": "Success",
    "message": "Login Successfully",
    "data": {
      "accessToken": "dhweuidc.ujendchswn4782.48234hjbfdj"
    }
  }
  ```

- response header :

  cookies: `refreshToken`

### 3. refresh token

- endpoint : `/auth/refresh-token`
- method : `POST`
- request header:

  cookies: `refreshToken`

- response body :

  - status code : `200`

  ```json
  {
    "status": "Success",
    "message": "Access Token Fetched Successfully",
    "data": {
      "accessToken": "dhweuidc.ujendchswn4782.48234hjbfdj"
    }
  }
  ```

### 4. logout

- endpoint : `/auth/logout`
- method : `DELETE`
- request header:

  cookies : `refreshToken`

- response status :

  status code : `204`

### 5. forget password (5-7)

- endpoint : `/auth/forget-password`
- method : `POST`
- Content-Type : `application/json`
- request body :
  ```json
  {
    "email": "john@gmail.com" // string
  }
  ```
- response body :

  - status code : `200`

  ```json
  {
    "status": "Success"
    "message": "Otp Send to your email Successfully",
    "data": null
  }
  ```

  note : otp sending in email

### 6. verify otp

- endpoint : `/auth/verify-otp`
- method : `POST`
- Content-Type : `application/json`
- request body :
  ```json
  {
    "otp": "1234" // string
  }
  ```
- response body :

  - status code : `200`

  ```json
  {
    "status": "Success"
    "message": "Otp Verified Successfully",
    "data": null
  }
  ```

### 7. update password

- endpoint : `/auth/user/password`
- method : `PATCH`
- Content-Type : `application/json`
- request body :
  ```json
  {
    "email": "john@gmail.com", // string
    "password": "john123" // string
  }
  ```
- response body :

  - status code : `200`

  ```json
  {
    "status": "Success"
    "message": "Password Updated Successfully",
    "data": null
  }
  ```
