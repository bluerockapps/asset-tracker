# FieldAssetPortal

The project consists of a frontend, an API server and a database.
​
The frontend is built with Angular version 8.0.3. `https://angular.io/`. User interface and design is provided by Angular Material `https://material.angular.io/`.
​
The API server is built with NodeJS `https://nodejs.org/en/`.
​
The database is postgreSQL `https://www.postgresql.org/`.
​
Communication from the frontend to the API is accomplished using Angular's HttpClient `https://angular.io/guide/http`.
​
The API server employs ExpressJS `https://expressjs.com/`to facilitate routes and http endpoints to connect the frontend to the database. The interface to the database is provided by node-postgres `https://node-postgres.com/`.
​
Security and authentication is provided by AWS Cognito `https://aws.amazon.com/cognito`.
​
## Deployment
​
The project can be deployed on MAC, Linux, Windows or on a cloud platform including AWS, Azure, Predix or Cloud Foundry. For a list of all libraries used in the frontend please refer to the `package.json` file.
​
## Running the project on your computer
​
The project can be run locally by copying frontend and the API server files into distinct folders on your computer.
​
NodeJS along with NPM (Node Package Manager) will need to be installed on your computer `https://nodejs.org/en/`. 
​
Dependant libraries will need to be installed for both the frontend and the API server. To do this, open a terminal session in each of the folders where the files are installed and type `npm install`.
​
Once completed, you will need to start both the frontend application and the API server. 
​
To start the frontend application run `ng serve` in the folder where the frontend files are. Then you can navigate to `http://localhost:4200/`.
​
To start the API server run `node server` in the folder where the API server files are.
​
In order to properly run the entire application you must have both the frontend and API server running as well as have a valid username and password.
​
Both the API server and the front end can be stopped by holding down the `CTRL` and pressing `c`.
​
## User Management
​
The application is role-based. Currently, there are two roles: `Admin` and `User`. Others can be added. Users are created by administrators. Once a user is created by using the user management interface, the use will be able to login to the application.
​
Users are associated with companies. When a `User` logs in they are only allowed to see their own sites that exist in their company. 
​
Admin users can see all companies and all sites, as well as all application features.