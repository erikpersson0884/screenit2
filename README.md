# screenIT
## A digital event screen
[![Last Commit][last-commit-shield]][last-commit-url]
[![Build Status][build-shield]][build-url]
[![Repo Size][repo-size-shield]][repo-size-url]
[![Author][author-shield]][author-url]


## Table of Contents
- [About the project](#about-the-project)
- [Features](#features)
- [Screenshots](#screenshots)
- [Built with](#built-with)
- [Getting started](#getting-started)
- [Contribute](#contribute)
- [Acknowledgements](#acknowledgements)

# About the Project


## Built with
![Vite][vite-shield]
![React][react-shield]
![Vitest][vitest-shield]
![Prisma][prisma-shield]
![Docker][docker-shield]
![TypeScript][typescript-shield]
![Express][express-shield]


## Features


## Screenshots


# Getting started

## Installation

1. Clone the repo
    ```sh
    git clone https://github.com/erikpersson0884/screenit-v2
    ```

2. Install dependencies
    ```
    cd screenit-v2

    npm run install
    ```
3. Set up a development database
    ```sh
    cd server 

    docker run --name screenit-v2-dev -e POSTGRES_PASSWORD=secretpassword -e POSTGRES_USER=myuser -e POSTGRES_DB=mydb -p 5432:5432 -d postgres

    npx prisma migrate dev

    npx prisma db push
    ```
4. Set environmental variables

    In `./client/.env`
    ```
    VITE_BASE_URL=http://localhost:3001/api
    ```

    In `./server/.env`
    ```
    DATABASE_URL=postgresql://myuser:secretpassword@localhost:5432/mydb?schema=public

    JWT_SECRET=your_jwt_secret
    ```



## Usage
After installation, you simply run the application with a single command from root.
```sh 
npm run dev
```
This runs concurrently:
- Database container (screenit-v2-dev)
- Backend server (server) in development mode
- Frontend (client) in development mode

You can also run each part individually:
```sh
npm run server       # Starts backend only
npm run client       # Starts frontend only
npm run start-database   # Start DB only
npm run stop-database    # Stop DB only
```

For production:
```sh
npm run build        # Build backend and frontend
cd server
npm start            # Run production server
```


# Contribute
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/myCoolFeature`)
3. Commit your Changes (`git commit -m 'Add a very cool feature!'`)
4. Push to the Branch (`git push origin feature/myCoolFeature`)
5. Open a Pull Request


# Acknowledgements









<!--  CONFIG FOR README.md   -->

<!-- Repo info Shields -->
[last-commit-shield]: https://img.shields.io/github/last-commit/erikpersson0884/screenit-v2.svg?style=for-the-badge
[last-commit-url]: https://github.com/erikpersson0884/screenit-v2/commits/main
[repo-size-shield]: https://img.shields.io/github/repo-size/erikpersson0884/screenit-v2?style=for-the-badge
[repo-size-url]: https://github.com/erikpersson0884/screenit-v2
[author-shield]: https://img.shields.io/badge/Author-Erik%20Persson-blue?style=for-the-badge
[author-url]: https://github.com/erikpersson0884
[stars-shield]: https://img.shields.io/github/stars/erikpersson0884/screenit-v2?style=for-the-badge
[stars-url]: https://github.com/erikpersson0884/screenit-v2/stargazers
[build-shield]: https://img.shields.io/github/actions/workflow/status/erikpersson0884/screenit-v2/.github/workflows/tests.yml?branch=main&style=for-the-badge
[build-url]: https://github.com/erikpersson0884/screenit-v2/actions


<!-- Frameworks & Languages Shields -->
[vite-shield]: https://img.shields.io/badge/Vite-646CFF?logo=Vite&logoColor=white&style=for-the-badge
[react-shield]: https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=for-the-badge
[next-shield]: https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white&style=for-the-badge
[vitest-shield]: https://img.shields.io/badge/Vitest-3E7CFF?logo=vitest&logoColor=white&style=for-the-badge
[prisma-shield]: https://img.shields.io/badge/Prisma-3178C6?logo=prisma&logoColor=white&style=for-the-badge
[docker-shield]: https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=for-the-badge
[typescript-shield]: https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge
[express-shield]: https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white&style=for-the-badge

