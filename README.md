This is a starter project for a native mobile app using React Native, Expo, Tailwind CSS, Express, and Prisma.

# Quick Setup Guide
## Backend Setup

### Environment Variables
1. Create an `.env` file in the `backend` directory.
2. Add a DATABASE_URL and a JWT_SECRET variables and fill in their respective values.

### Running the Backend
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

## Mobile Setup

# Changing the IP Address
Open the `mobile/lib/axios.config.js` file.
Change the `IP_ADDRESS` variable to your local IP address. This is necessary for the mobile app to communicate with the backend.

# Running the Mobile App
1. Navigate to the `mobile` directory.
2. Install the dependencies by running:
   ```sh
   npm install
   ```
3. Start the mobile app by running:
   ```sh
    npx expo start
    ```

Inspired by @Mutesa-Cedric's work!
