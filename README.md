# Game Library API

## Important

Upon reading the assignment, I misunderstood the instruction "API Subject is established" and thought it meant that I should use the same subject as in the first exam attempt. As a result, my API has a different subject than intended. Unfortunately, I realized this mistake too late to make changes. My apologies.

## Purpose

This project is an API written in JavaScript, designed for users to manage their game library. Users can add games to their library and view the games they've added.

## Getting Started

### Prerequisites

To run this project, you need to have Docker and Docker Compose installed on your machine.

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/EHB-MCT/portfolio-tweede-zit-v2-StephanVanHemelrijck.git
   cd portfolio-tweede-zit-v2-StephanVanHemelrijck
   ```

2. **Choose your environment:**

   The project supports different environments: development, production, and test. Depending on which environment you want to use, you need to copy the appropriate `.env` file:

   - For development:

     ```bash
     cp .env.development.template .env.development
     docker-compose -f docker-compose.dev.yml up --build
     ```

   - For production:

     ```bash
     cp .env.production.template .env.production
     docker-compose -f docker-compose.yml up --build
     ```

   - For testing:

     ```bash
     cp .env.test.template .env.test
     docker-compose -f docker-compose.test.yml up --build
     ```

   We recommend for you to be prepared to use both `development` as `test` environments, since the `test` environment will run all your unit and integration tests. Whilest `development` environment will build your application and make your API accessible.

3. **Running the project:**

   Start the project by running the Docker Compose command appropriate to your chosen environment:

   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

   Replace `docker-compose.dev.yml` with the correct file for production or test environments if needed.

## API Endpoints

### User Endpoints

| Method | Endpoint                     | Description                                 | Request Parameters                       |
| ------ | ---------------------------- | ------------------------------------------- | ---------------------------------------- |
| GET    | /api/users                   | Retrieves all users                         | /                                        |
| GET    | /api/users/{id}              | Retrieves a specific user by ID (UUIDv4)    | params: `id`                             |
| POST   | /api/users/                  | Creates a new user                          | body: `email`, `displayname`, `password` |
| POST   | /api/users/login             | Logs in a user                              | body: `email`, `password`                |
| GET    | /api/{userId}/library        | Retrieves all the games in a user's library | params: `userId`                         |
| POST   | /api/{userId}/library/add    | Add a game to the user's library            | params: {userId} , body: `gameId`        |
| DELETE | /api/{userId}/library/remove | Remove a game from the user's library       | params: {userId}, body: {gameId}         |

### Game Endpoints

| Method | Endpoint        | Description                     | Request Parameters |
| ------ | --------------- | ------------------------------- | ------------------ |
| GET    | /api/games      | Retrieves all games             | /                  |
| GET    | /api/games/{id} | Retrieves a specific game by ID | params: `id`       |

## Status

This project is currently in development. New features and improvements are ongoing.

## Changelog

See what's new in our [changelog](CHANGELOG.md).

## Contributing

Interested in contributing? Check out the [guidelines](CONTRIBUTION_GUIDELINES.md)!

## Questions and Support

If you have any questions or run into any issues, please feel free to open a ticket in the project's issue tracker.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
