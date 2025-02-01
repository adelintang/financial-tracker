## Product Image Endpoint

This is documentations for product image endpoints

### 1. Create Product

- endpoint : `/products-image/:productId/upload`
- method : `POST`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
  - params: `productId`
- request body:
  - type: file (png, jpg, jpeg)
- response body :
  - status code : `201`
  ```json
  {
    "status": "Success",
    "message": "Product Image Uploaded Successfully",
    "data": {
      "id": "product-image-5c4394f7-d3e3",
      "public_id": "products-image/baxgrllhagyln1s60im8",
      "file_url": "https://res.cloudinary.com/dsrocaowx/image/upload/v1733046217/products-image/baxgrllhagyln1s60im8.jpg",
      "filename": "products-image/baxgrllhagyln1s60im8.jpg",
      "size": 6257,
      "product_id": "product-5c4394f7-d3e3"
    }
  }
  ```

### 2. Update Product

- endpoint : `/products-image/:productImageId/upload`
- method : `PATCH`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
  - params: `productId`
- request body:
  - type: file (png, jpg, jpeg)
- response body :
  - status code : `200`
  ```json
  {
    "status": "Success",
    "message": "Product Image Updated Successfully",
    "data": {
      "id": "product-image-5c4394f7-d3e3",
      "public_id": "products-image/baxgrllhagyln1s60im8",
      "file_url": "https://res.cloudinary.com/dsrocaowx/image/upload/v1733046217/products-image/baxgrllhagyln1s60im8.jpg",
      "filename": "products-image/baxgrllhagyln1s60im8.jpg",
      "size": 6257,
      "product_id": "product-5c4394f7-d3e3"
    }
  }
  ```

### 3. Delete Product

- endpoint : `/products-image/:productImageId`
- method : `DELETE`
- Content-Type : `application/json`
- request headers :
  - Authorization: Bearer `accessToken`
  - params: `productImageId`
- response body :
  - status code : `200`
  ```json
  {
    "status": "Success",
    "message": "Product Image Deleted Successfully",
    "data": {
      "id": "product-image-5c4394f7-d3e3",
      "public_id": "products-image/baxgrllhagyln1s60im8",
      "file_url": "https://res.cloudinary.com/dsrocaowx/image/upload/v1733046217/products-image/baxgrllhagyln1s60im8.jpg",
      "filename": "products-image/baxgrllhagyln1s60im8.jpg",
      "size": 6257,
      "product_id": "product-5c4394f7-d3e3"
    }
  }
  ```
