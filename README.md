# CI/CD Pipeline with GitHub Actions and Render Deployment

## Overview
This project implements **Continuous Integration (CI) and Continuous Deployment (CD)** using **GitHub Actions**. The CI/CD pipeline ensures that all code changes are automatically tested before being deployed to **Render**.

## Features
- **CI (Continuous Integration)**
  - Runs automated tests on every push and pull request to the `main` branch.
  - Uses **MongoDB** as a service in the workflow for integration testing.
  - Ensures code quality by running tests for authentication, books, and general API functionality.

- **CD (Continuous Deployment)**
  - Automatically deploys the backend to **Render** after successful tests.
  - Displays a link to the deployed backend upon successful deployment.

## Tech Stack
- **Node.js** with **Express.js**
- **MongoDB** for database
- **GitHub Actions** for automation
- **Render** for deployment

## Installation
To set up the project locally, follow these steps:

1. **Clone the repository**
   ```sh
   git clone https://github.com/kidabg548/book-reservation-backend-training.git
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables** (create a `.env` file and add the necessary variables)
   ```
   MONGO_URI=mongodb://localhost:27017/testdb
   JWT_SECRET=your-secret-key
   ```
4. **Run the application**
   ```sh
   npm start
   ```
5. **Run tests**
   ```sh
   npm test
   ```

## GitHub Actions Workflow
The CI/CD workflow is defined in `.github/workflows/test.yml` and includes the following steps:

1. **Checkout Code**: Fetches the latest code from the repository.
2. **Set Up Node.js**: Installs the required Node.js version.
3. **Install Dependencies**: Runs `npm ci` to install dependencies.
4. **Start MongoDB**: Uses MongoDB as a service for integration tests.
5. **Run Tests**: Executes `npm test` to verify the application.
6. **Deploy to Render**: Deploys the application to Render upon successful test completion.

## Files Added/Modified
- **`.github/workflows/test.yml`**: Defines the GitHub Actions workflow for both automated testing (CI) and deployment (CD). It runs tests on every push to the `main` branch and deploys to Render after successful tests.
- **`__tests__/app.test.js`**: Includes basic routing tests for verifying 404s and ensuring the API is working correctly.
- **`__tests__/auth.test.js`**: Contains tests for all authentication endpoints to ensure proper functionality.
- **`__tests__/book.test.js`**: Focuses on end-to-end integration testing for book-related functionality in the app.
- **`app.js`**: Modified to conditionally start the server only when not in a test environment and exports the Express functions for better testing and deployment flexibility.

## Deployment
After successful tests, the application is deployed automatically to **Render**. The deployment status and link are available in the GitHub Actions logs.



