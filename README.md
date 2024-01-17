# Getting Started with Twice Trendy

Twice Trendy is a fullstack application with a front-end utilizing Node.js and Express to create a Single Page Application (SPA), and a back-end built with Maven.

## Prerequisites

Before starting the application, ensure you have the following installed:
- **Node.js**: Download and install from the [Node.js website](https://nodejs.org/).
- **Java Development Kit (JDK)**: Needed to run Maven projects. Download and install from [Oracle JDK](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) or an equivalent.
- **Maven**: Follow the instructions on the [Apache Maven website](https://maven.apache.org/install.html) to install.

## Installation

### Back-End Setup

1. **Navigate to the Back-End Directory**:
cd back-end

2. **Build the Maven Project**:
Execute the following command to build the project:
mvn clean install
This will compile the back-end code and generate the necessary files to run the application.

### Front-End Setup

1. **Navigate to the Front-End Directory**:
cd front-end

2. **Install Node.js Dependencies**:
Run the following command to install all necessary dependencies:
npm install

## Running the Application

### Starting the Back-End Server

1. **Navigate to the Back-End Directory** (if not already there):
cd back-end

2. **Start the Maven Project**:
Use the following command to start the back-end server:
mvn spring-boot:run
This will start the back-end service, typically running on a predefined port (e.g., `8080`).

### Starting the Front-End Server

1. **Navigate to the Front-End Directory** (if not already there):
cd front-end

2. **Start the Node.js Server**:
Run the following command to start the front-end server using `nodemon`:
npm run dev

This will start the front-end server, typically accessible at `http://localhost:3000`.

## Accessing the Application

With both servers running, open your web browser:
- For front-end, go to `http://localhost:3000`.
- The back-end API will be accessible via the port used by Spring Boot (default is usually 8080).

## Navigating the Application
The application's front-end includes a dynamic navigation bar and supports various routes for user interaction. The back-end provides the necessary API endpoints to support front-end functionalities.

### Available Routes

- **Home**: `#/`
  - The landing page of the application.
  
- **Registration**: `#/registration`
  - Allows new users to register. Redirects to the home page if the user is already logged in.
  
- **Login**: `#/login`
  - For user login. Redirects to the home page if the user is already logged in.

- **Products**: `#/products`
  - Displays all products. Users can view products without logging in.

- **Product View**: `#/products/product/{productId}`
  - Detailed view of a specific product, accessible by clicking on a product in the products list.

- **Edit Product**: `#/products/edit/{productId}`
  - Allows editing of a product. Only accessible to the user who created the product.

- **Create Product**: `#/create-product`
  - Allows logged-in users to create a new product.

- **My Products**: `#/my-products`
  - Shows the products created by the logged-in user.

- **Profile**: `#/profile`
  - Allows logged-in users to view and edit their profile.

- **Delete Profile**: `#/delete-profile`
  - Enables users to delete their profile.

- **Logout**: `#/logout`
  - Logs out the current user.

- **Orders**: `#/orders`
  - Displays orders associated with the logged-in user.


## Contributing
If you wish to contribute to the project, please fork the repository and create a pull request with your changes. We welcome all contributions!