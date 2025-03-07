# School Location API

A RESTful API service that manages school locations and provides distance-based school listings.

## Live API Endpoints

Base URL: `https://node-task-j9c8.onrender.com`

### Available Endpoints

1. **API Documentation**

   ```
   GET /
   ```

   Returns the API documentation and available endpoints.

2. **Add School**

   ```
   POST /addSchool
   Content-Type: application/json
   ```

   Adds a new school to the database.

   Request Body:

   ```json
   {
     "name": "School Name",
     "address": "School Address",
     "latitude": 28.7041,
     "longitude": 77.1025
   }
   ```

   Response (201 Created):

   ```json
   {
     "message": "School added successfully",
     "id": 1
   }
   ```

3. **List Schools by Distance**

   ```
   GET /listSchools?latitude=28.7041&longitude=77.1025
   ```

   Returns a list of schools sorted by distance from the given coordinates.

   Query Parameters:

   - `latitude`: Required, decimal
   - `longitude`: Required, decimal

   Response (200 OK):

   ```json
   {
     "schools": [
       {
         "id": 1,
         "name": "School Name",
         "address": "School Address",
         "latitude": 28.7041,
         "longitude": 77.1025,
         "distance": 0
       }
     ],
     "total": 1,
     "query": {
       "latitude": "28.7041",
       "longitude": "77.1025"
     }
   }
   ```

## Testing the API

### Using cURL

1. **Get API Documentation**

   ```bash
   curl https://node-task-j9c8.onrender.com
   ```

2. **Add a School**

   ```bash
   curl -X POST https://node-task-j9c8.onrender.com/addSchool \
   -H "Content-Type: application/json" \
   -d '{
       "name": "Delhi Public School",
       "address": "Delhi, India",
       "latitude": 28.7041,
       "longitude": 77.1025
   }'
   ```

3. **List Schools**
   ```bash
   curl "https://node-task-j9c8.onrender.com/listSchools?latitude=28.7041&longitude=77.1025"
   ```

### Using Postman

Import the Postman collection from the following link:
[School Location API Postman Collection](https://www.postman.com/collections/your-collection-id)

## Error Responses

1. **400 Bad Request**

   ```json
   {
     "error": "All fields are required"
   }
   ```

   or

   ```json
   {
     "error": "Latitude and Longitude are required"
   }
   ```

2. **500 Server Error**
   ```json
   {
     "error": "Database error",
     "details": "Error message",
     "dbConfig": {
       "host": "34.172.223.63",
       "user": "roshan9999",
       "database": "schools",
       "port": 3306
     }
   }
   ```

## Technical Details

- **Framework**: Node.js with Express
- **Database**: MySQL
- **Deployment**: Render
- **API Version**: 1.0.0

## Source Code

The complete source code is available at:
[GitHub Repository](https://github.com/Roshan-b-tech/node_task)

## Contact

For any queries or support, please contact:

- Email: [Your Email]
- GitHub: [Your GitHub Profile]
