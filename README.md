# Maharashtra Taekwondo Federation Frontend

This is the frontend of the Maharashtra Taekwondo Federation website built with React.

## Technologies Used

- React.js
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests
- Context API for state management

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository
2. Navigate to the client directory:
   ```bash
   cd taekwondo-website/client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

This will start the React development server and open the website in your default browser at http://localhost:3000.

## Environment Variables

Create a `.env` file in the root of the client directory with the following variables:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from create-react-app (use with caution)

## Folder Structure

- `/public` - Static files like images and HTML
- `/src` - React source code
  - `/api` - API service files
  - `/components` - React components
    - `/admin` - Admin dashboard components
    - `/auth` - Authentication components
    - `/common` - Reusable components
    - `/layout` - Layout components (Header, Footer, etc.)
    - `/pages` - Main page components
  - `/context` - React context providers
  - `/utils` - Utility functions

## Features

- Responsive design for all screen sizes
- Authentication system (login/register)
- Event information and registration
- Gallery of images and videos
- Program information
- Contact form
- Admin dashboard

## Deployment

This frontend is designed to be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

## Learn More

For more information about the technologies used, check out:

- [React documentation](https://reactjs.org/)
- [React Router documentation](https://reactrouter.com/)
- [Tailwind CSS documentation](https://tailwindcss.com/)
- [Axios documentation](https://axios-http.com/)
