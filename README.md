# Newsletter App

## Description
The newsletter application allows users to create, send, and manage newsletters. It includes functionalities for subscribing and unsubscribing users.

## Project Structure
- **Frontend**: React application for managing newsletters and subscriptions.
- **Backend**: Node.js API with Express for handling newsletter and subscription operations.

## Requirements
- Docker
- Docker Compose

## Setup and Run
1. Clone the repositories:
    ```bash
    git clone https://github.com/pausantoyo/newsletter-sending-app
    cd newsletter-sending-app
    ```
    
2. Change the variable `POSTGRES_PASSWORD` with your password

3. Start the services with Docker Compose:
    ```bash
    docker-compose up --build
    ```

4. Open your browser and visit `http://localhost:3000` to access the frontend application.

## Services
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:8080`
- **Database**: `localhost:5432`
