# BuzzChat

BuzzChat is a real-time chat application that enables users to communicate through private and group messages. It is built using MERN technologies with TypeScript and Socket.io.


## Table of Contents

- [BuzzChat](#buzzchat)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
    - [Usage](#usage)
    - [Demo](#demo)

## Features

- **Real-time messaging** using Socket.io for both private and group chats
- **Private and group chat** functionality with user management
- **User authentication and authorization** with JWT , Redux and Local storage
- **Profile management** to update user information
- **Responsive design** for a seamless experience across devices

## Installation

### Prerequisites

- Node.js 
- npm or yarn
- MongoDB

### Backend Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/buzzchat.git
   cd buzzchat/backend
   ```

2. Install dependencies:

    ```sh
    npm install
    ```


3. Create a .env file in the backend folder with the following variables:

    ```sh
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:
   
    ```sh
    npm start
    ```


### Frontend Setup
1. Navigate to the frontend folder:

    ```sh
    cd ../frontend
    ```
    
2. Install dependencies:
   
    ```sh
    npm install
    ```

3. Start the frontend development server:

    ```sh
    npm run dev
    ```

4. Open the browser at http://localhost:3000 to access the app.



### Usage
- Users can register and log in to BuzzChat.
- After authentication, users can create group chats or engage in direct messaging.
- The app provides real-time chat features through WebSockets.
- Users can manage their profiles and view all their chats.

### Demo
Check out a demo video of BuzzChat in action: [Demo Video](https://drive.google.com/file/d/1Es19Tz3tkwbEigVcnSaajd6YbBpJGuDr/view?usp=sharing)