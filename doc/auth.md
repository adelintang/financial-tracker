## Authentication Endpoint

This is documentations for authentication endpoints

### 1. Register

- endpoint : `/auth/register`
- method : `POST`
- Content-Type : `application/json`
- request body :
  ```json
  {
    "email": string // john@gmail.com
    "name": string // John Doe
    "password": string // johndoe123
    "role": Enum([RESELLER, DELIVERER, USER]) // USER
    "address": string // Jl. Pemuda, jakarta utara, indonesia
  }
  ```
- response body :

  - status code : `201`

  ```json
  {
    "status": "Success",
    "message": "Registration User Successfully",
    "data": {
      "id": string // user-hdjsd3-hfjei
      "email": string // john@gmail.com
      "name": string // John Doe
      "role": Enum([RESELLER, DELIVERER, USER]) // USER
      "address": string // Jl. Pemuda, jakarta utara, indonesia
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
    "email": string // john@gmail.com
    "password": string // johndoe123
  }
  ```

- response body :

  - status code : `200`

  ```json
  {
    "status": "Success",
    "message": "Login Successfully",
    "data": {
      "accessToken": string // dhweuidc.ujendchswn4782.48234hjbfdj
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
      "accessToken": string // dhweuidc.ujendchswn4782.48234hjbfdj
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
    "email": string // john@gmail.com
  }
  ```
- response body :

  - status code : `200`

  ```json
  {
    "status": "Success"
    "message": "Otp created successfully",
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
    "otp": string // 1234
  }
  ```
- response body :

  - status code : `200`

  ```json
  {
    "status": "Success"
    "message": "Otp verified successfully",
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
    "email": string // john@gmail.com
    "password": string // john123
  }
  ```
- response body :

  - status code : `200`

  ```json
  {
    "status": "Success"
    "message": "Password updated successfully",
    "data": null
  }
  ```
