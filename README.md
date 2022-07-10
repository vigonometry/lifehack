# Instructions on Deployment

## Instructions on Server Deployment

- Navigate to our server directory by running the command `cd server`
- Set environment variable `MONGODB_URI` in a file named `.env` to your MongoDB Atlas Database: "MONGODB_URI="mongodb+srv://admin1:admin123@cluster0.b5nrf.mongodb.net/?retryWrites=true&w=majority"
- Run `npm install` to install required node packages
- Run `npm start` to start Apollo Express Server on `localhost:4001`

## Instructions on Frontend Deployment

- Navigate to our server directory by running the command `cd frontend`
- Run `npm install` to install required node packages
- Run `npm start` to start your React App on `localhost:3000`
