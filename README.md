  # API Documentation

  ## Base URL
  http://localhost:3000

  ## Endpoints

  ### 1. Orders Endpoint

  #### Create Order
  - **URL**: `api/orders`
  - **Method**: `POST`
  - **Description**: Crea una nueva orden y genera un hash de integridad.
  - **Request Body**:
  
    ```json
    {
      "amount": 39400,
      "currency": "COP"
    }
    ```
  - **Success Response**:
    - **Code**: 200
  
    - **Content**:
      ```json
      {
        "success": true,
        "orderId": "ORD_20230604_A1b2C3",
        "hash": "d41d8cd98f00b204e9800998ecf8427e"
      }
      ```
  - **Error Response**:
    - **Code**: 400
  
    - **Content**:
      ```json
      {
        "error": "Amount and currency are required"
      }
      ```

  ### 2. People Endpoint

  #### Create Person
  - **URL**: `api/people`
  - **Method**: `POST`
  - **Description**: Crea una nueva persona.

  - **Request Body**:
    ```json
    {
      "firstName": "Juan",
      "lastName": "Pérez",
      "phoneNumber": "1234567890",
      "email": "juan.perez@example.com",
      "orderId": "ORD_20230604_A1b2C3"
    }
    ```
  - **Success Response**:
    - **Code**: 200
  
    - **Content**:
      ```json
      {
        "success": true,
        "personId": "some-uuid-for-person"
      }
      ```
  - **Error Response**:
    - **Code**: 400

    - **Content**:
      ```json
      {
        "error": "All fields are required"
      }
      ```

  ### 3. Code Endpoint

  #### Generate Unique Code(s)
  - **URL**: `/api/code`
  - **Method**: `GET`
  - **Description**: Genera uno o más códigos únicos.
  - **Query Parameters**:
    - `quantity` (required): Número de códigos únicos a generar.
  - **Success Response**:
    - **Code**: 200

    - **Content**:
      ```json
      {
        "codes": ["1234", "5678", "91011"]
      }
      ```
  - **Error Response**:
    - **Code**: 400

    - **Content**:
      ```json
      {
        "error": "Quantity must be a positive integer"
      }
      ```

  ### 4. Records Endpoint

  #### Create Records
  - **URL**: `api/records`
  - **Method**: `POST`
  - **Description**: Crea múltiples registros para una persona con los códigos proporcionados.
  
  - **Request Body**:
    ```json
    {
      "personId": "51c246ed-ebee-4fb8-af2f-e369b684ba8e",
      "codes": ["3231", "4168"]
    }
    ```
  - **Success Response**:
    - **Code**: 200

    - **Content**:
      ```json
      {
        "success": true,
        "records": [
          { "people_id": "51c246ed-ebee-4fb8-af2f-e369b684ba8e", "number": "3231", "createdAt": "2023-06-04T12:34:56.789Z" },
          { "people_id": "51c246ed-ebee-4fb8-af2f-e369b684ba8e", "number": "4168", "createdAt": "2023-06-04T12:34:56.789Z" }
        ]
      }
      ```
  - **Error Response**:
    - **Code**: 400

    - **Content**:
      ```json
      {
        "error": "Some codes already exist in the database",
        "existingCodes": ["3231", "4168"]
      }
      ```

  ## Error Codes
  - **400**: Bad Request – Your request is invalid.
  - **500**: Internal Server Error – We had a problem with our server. Try again later.