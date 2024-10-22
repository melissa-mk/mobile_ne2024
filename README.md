
## About this Project
This project uses a starter for a native mobile app using React Native, Expo, Tailwind CSS, Express, and Prisma. The project was made as a bare-bones social media platform that allows users to create accounts, sign in, create/view/edit/delete posts, and create/view/edit/delete comments on posts. 

This project was created as part of the 2024 National Exam Practical Assessment of Mobile Application Development.

## Quick Setup Guide
### Backend Setup

#### Environment Variables
1. Create an `.env` file in the `backend` directory.
2. Add a DATABASE_URL and a JWT_SECRET variables and fill in their respective values.

#### Running the Backend
1. Navigate to the `backend` directory.
2. Install the dependencies by running:
   ```sh
   npm install
   ```
3. Push the database schema by running:
   ```sh
   npx prisma db push
   ```
4. Generate Prisma client by running:
   ```sh
   npx prisma generate
   ```
5. Start the backend server by running:
   ```sh
    npm run dev
    ```
6. The backend server should now be running on `http://localhost:8000`.

### Mobile Setup

#### Changing the IP Address
Open the `mobile/lib/axios.config.js` file.
Change the `IP_ADDRESS` variable to your local IP address. This is necessary for the mobile app to communicate with the backend.

#### Running the Mobile App
1. Navigate to the `mobile` directory.
2. Install the dependencies by running:
   ```sh
   npm install
   ```
3. Start the mobile app by running:
   ```sh
    npx expo start
    ```
