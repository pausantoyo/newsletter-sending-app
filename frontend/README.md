# Frontend - Newsletter App

## Description
This project is the frontend part of the newsletter application. It allows users to create newsletters, subscribe, and unsubscribe.

## Requirements
- Node.js (version 14 or higher)
- npm (version 6 or higher) or yarn (version 1.22 or higher)

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/pausantoyo/newsletter-sending-app.git
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Configure environment variables:
    Create a `.env` file in the project root with the following variables:
    ```env
    API_BASE_URL=http://localhost:8080
    ```

## Running in Development
1. Start the development server:
    ```bash
    npm start
    # or
    yarn start
    ```

2. Open your browser and visit `http://localhost:3000`.

## Docker
### Building the Image
```bash
docker build -t newsletter-frontend .
```

### Running the container
``` bash
docker run -p 3000:3000 newsletter-frontend
```
