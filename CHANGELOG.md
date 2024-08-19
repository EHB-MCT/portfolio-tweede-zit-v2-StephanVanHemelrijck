# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

- feat(library): Provide a way to view other libraries.

## [1.0.0] - 2024-08-19

[View Release](https://github.com/EHB-MCT/portfolio-tweede-zit-v2-StephanVanHemelrijck/releases/tag/1.0.0)

### Added

- feat(integration-tests): Added integration tests for all endpoints.
- feat(library): Added remove game from library endpoint.
- feat(library): Added get games from library and add game to library endpoints.
- feat(games): Added games endpoints with unit testing.
- feat(games): Added games table migration and seeder.
- feat(users): Added endpoint to login user.
- feat(users): Added create user endpoint with unit testing.
- feat(users): Added getUserById endpoint supported by unit tests.
- feat(users): Implemented get all users endpoint supported by unit testing.
- feat(database): Added migration, seed, and database connection setup.
- feat(docker): Created development, test, and production containers.
- feat(env-templates): Updated with more descriptive strings.

### Fixed

- fix: Updated .gitignore to include necessary files.
- fix: Ignored .env.production in .gitignore.
- fix: Adjusted env template.

### Merged

- Merge: Pull request #4 from EHB-MCT/feature/docker.
- Merge: Pull request #3 from EHB-MCT/feature/library.
- Merge: Pull request #2 from EHB-MCT/feature/games.
- Merge: Pull request #1 from EHB-MCT/feature/users.
