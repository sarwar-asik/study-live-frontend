# Study Live Application



This application is a real-time communication platform built with React, TypeScript, Redux, Socket.IO, WebRTC, and PeerJS. It provides users with messaging, audio, and video call functionalities. The application incorporates a points system to manage user interactions, where points are deducted for each type of interaction, and users can earn points to continue using the service.

## Features

- **Landing Page**: The main entry point of the application with an overview of the service.
- **Users Page**: A list of users available for communication.
- **Video/Audio Chat Page**: Allows authenticated users to initiate and engage in video and audio calls.
- **Authentication**: User authentication is required to access chat and call functionalities.
- **Points System**:
  - Messaging: Deducts 1 point.
  - Audio Call: Deducts 3 points.
  - Video Call: Deducts 5 points.
  - Points Recharge: When a user's points reach zero, an `addPoints` modal is displayed, allowing the user to earn 10 points and continue using the service.

## Tech Stack

- **Frontend**:
  - **React**: UI library for building user interfaces.
  - **TypeScript**: For type safety and enhanced developer experience.
  - **Redux**: State management for handling application state.
  - **Socket.IO**: Real-time, bidirectional communication between the client and server.
  - **WebRTC**: Enables real-time peer-to-peer communication.
  - **PeerJS**: Simplifies WebRTC connections for video and audio calls.
  - **Tailwind CSS**: Utility hte CSS framework for styling.

- **Backend APIs** (Assumed):
  - **Authentication API**: Handles user login and authentication.
  - **Messaging API**: Facilitates sending and receiving messages.
  - **Points Management API**: Manages user points and handles the deduction and addition of points.
  - **Video/Audio Call API**: Manages the setup and execution of video and audio calls.

## Security

- **JWT Authentication**: Ensures that only authenticated users can access the messaging and calling features.
- **CORS Handling**: Configured to restrict cross-origin requests and protect against unauthorized access.
- **Input Validation**: Validates user inputs using Zod, ensuring data integrity and preventing injection attacks.

## API Endpoints (Assumed)

- **/api/auth/login**: User login endpoint.
- **/api/auth/sign-up**: User registration endpoint.
- **/api/users**: get all user.
- **/api/user/:id**: get a user.
- **/api/message?senderId=122&receiverId=12341**: get all message by their id.
- **/api/user/deduct-points**: Deducts points based on the user's action (message, audio call, video call).
- **/api/user/add-points**: Adds points to the user's account after clicking the `addPoints` modal.

## Other Overviews

- **Real-Time Communication**: The application leverages WebRTC and PeerJS to establish direct connections between users for low-latency video and audio communication.
- **Points Management**: A dynamic points system encourages user engagement and controls access to communication features.
- **Responsive UI**: The interface is built with Tailwind CSS, ensuring a responsive and user-friendly experience across devices.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation & run

```bash
git clone https://github.com/sarwar-asik/study-live-frontend

cd study-live-frontend

yarn 

yarn dev

```
