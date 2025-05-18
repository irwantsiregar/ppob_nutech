## Features

- **TypeScript Support**: Leverage TypeScript's static typing for enhanced code quality and developer experience.
- **Express Setup**: Pre-configured with Express for rapid API development.
- **Environment Configuration**: Easily manage environment variables using [dotenv](https://github.com/motdotla/dotenv).
- **ESLint**: Pre-configured for consistent code style and linting.
- **Swagger UI**: Auto-generated API documentation using [Swagger](https://swagger.io/).
- **PostgreSQL**: Pre-configured with PostgreSQL for database integration.
- **Node PG Migrate**: Node.js database migration management built exclusively for postgres.

## Getting Started

Web services or RESTful API for PPOB applications

### Prerequisites

- **Node.js** (>= 18.x recommended)
- **Yarn** or **npm**

### Installation

```bash
# Clone the repository
git clone <url_repository>

# Navigate into the directory
cd <project_name>

# Install dependencies
yarn install
# or
npm install
```

### Running the Application

```bash
# Start the development server
yarn dev
# or
npm run dev
```

The server will start on **http://localhost:3000** by default.

### Building for Production

```bash
yarn build
# or
npm run build
```

## Project Structure

```
src/
│
├── configs/           # Configuration files
├── controllers/       # Route controllers (Controllers layer)
├── models/            # Data models (e.g., Mongoose schemas)
├── routes/            # Express routes
├── services/          # Business logic (Service layer)
├── utils/             # Utility functions and helpers
│
└── index.ts           # Entry point of the application
```

## Configuration

Environment variables are managed using a `.env` file. Here's an example:

```
PORT=3000
NODE_ENV=development

DEV_DATABASE_URL=""
PROD_DATABASE_URL=""

DATABASE_URL=${DEV_DATABASE_URL}


```

## API Documentation

API documentation is automatically generated with Swagger and available at:

```
http://localhost:3000/api-docs
```
