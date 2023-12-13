# Mongoose Express CRUD Mastery

This project is a Node.js Express application with TypeScript, integrating MongoDB with Mongoose for user data and order management. Data integrity is maintained through validation using Joi/Zod.

## Set up the Project

1. Create a new Node.js Express project.
2. Set up a MongoDB database using Mongoose for storing user and order data.

 ## First, run the development server:
npm run start:dev

## Define Data Models

### User Data Model

```json
{
  "userId": "number",
  "username": "string",
  "password": "string",
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  // ... (other fields)
}





