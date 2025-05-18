# Taekwondo Website

Maharashtra Taekwondo Federation Website

## Project Structure

```
taekwondo-website/
├── client/             # React frontend
│   ├── public/         # Public assets
│   └── src/            # React source code
└── server/             # Express backend
    ├── config/         # Configuration files
    ├── controllers/    # Route controllers
    ├── middleware/     # Express middleware
    ├── models/         # MongoDB models
    ├── routes/         # API routes
    └── utils/          # Utility functions
```

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm run install-all
   ```
3. Set up environment variables:
   - Create `.env` file in the server directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     EMAIL_USER=your_email
     EMAIL_PASS=your_email_password
     CLIENT_URL=http://localhost:3000
     ```
4. Run the development server:
   ```
   npm run dev
   ```
   Or use the `start-dev.bat` file on Windows

## Deployment Instructions

### Backend Deployment on Render

1. Log in to Render (https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the service:
   - Name: taekwondo-server
   - Environment: Node
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && node index.js`
   - Environment Variables: Add all variables from .env file
5. Deploy

### Frontend Deployment on Hostinger

1. Build the client:
   ```
   cd client && npm run build
   ```
2. Log in to Hostinger
3. Go to Website > File Manager
4. Upload the contents of the `client/build` directory
5. Configure environment variables in Hostinger:
   - In the client directory, create a .env file with:
     ```
     REACT_APP_API_URL=https://your-render-backend-url.com
     ```
6. Save and deploy

Remember to update the API URLs in the front-end code to point to your deployed backend server URL.

## Production Environment Variables

Update the following environment variables for production:

- Server:
  - `CLIENT_URL`: URL of your deployed frontend
  - `NODE_ENV`: Set to "production"

- Client:
  - `REACT_APP_API_URL`: URL of your deployed backend
  - `REACT_APP_ENV`: Set to "production" # taekwondo-frontend-website
