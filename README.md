# screenIT2
## A digital event screen
[![Last Commit][last-commit-shield]][last-commit-url]
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

![Screenshot of screenIT2](images/main-page.png)

<img src="images/upload.png" alt="Screenshot of upload popup" width="30%">
<img src="images/settings.png" alt="Screenshot of settings popup" width="30%">
<img src="images/account.png" alt="Screenshot of account popup" width="30%">


# Getting started

## Installation

1. Clone the repo
    ```sh
    git clone https://github.com/erikpersson0884/screenit-v2
    ```

2. Install dependencies
    ```
    cd screenit2

    npm run install
    ```
3. Set up a development database
    ```sh
    cd server 

    docker run --name screenit2 -e POSTGRES_PASSWORD=secretpassword -e POSTGRES_USER=myuser -e POSTGRES_DB=mydb -p 5432:5432 -d postgres

    npx prisma migrate dev

    npx prisma db push
    ```
4. Set environmental variables

    In `./server/.env` add the following (you can copy from `./server/env.example`):
    ```env
    DATABASE_URL=postgresql://myuser:secretpassword@localhost:5432/mydb?schema=public

    JWT_SECRET=big_secret_key

    GAMMA_CLIENT_ID=SOMETHINGLIKETHISXM4KXNH4DEXXY
    GAMMA_REDIRECT_URI=http://localhost:3000/api/auth/gamma/callback
    GAMMA_CLIENT_SECRET=SOMETHINGLIKETHISJ2DVRRBYMWKJ44Q

    FRONTEND_URL=http://localhost:3000 


    # The following are optional, but can be used to customize the seeded user created when running `npx prisma db seed`. Role is always optional and defaults to "user" if not set.

    SEED_USER_ID=b69a0ccd-01d1-475e-adc5-99ff017b7fd74
    SEED_USER_USERNAME=Göken
    SEED_USER_ROLE=user
    ```
 If you are unsure of how to set up the gamma client, you can read the how to on the chalmers.it wiki: https://wiki.chalmers.it/HowTo:Skapa_Gamma_Clients


## Usage
After installation, you simply run the application with a single command from root.
```sh 
npm run dev
```
This runs concurrently:
- Backend (server) in development mode
- Frontend (client) in development mode

You can also run each part individually:
```sh
npm run server       # Starts backend only (in development mode)
npm run client       # Starts frontend only (in development mode)
```

For production:
```sh

npm run build-server   # Build backend only
npm run build-client   # Build frontend only
npm run build        # Build backend and frontend

npm run start-server   # Run backend only (production)
npm run start-client   # Run frontend only (production)
npm start            # Run production server
```

### Seeding the database
To seed the database with initial data, run the following command from the ./server directory:
```sh
npx prisma db seed
```

# Good to know
* Frontend reloads every 6 hours to clear any potential issues. This can be changed in `./client/src/App.tsx` by modifying the `reloadInterval` variable.
* Posters are also fetched from chalemrs.it, the criteria for events to be included are set in `chalmersITRepository.ts`, and are currently:
    * The newspost must have a connected event
    * The connected event must have a start time, and the start time must be in the future
    * The newspost must have an image (in case of multiple images, the first one in swedish descriptoin is used)

# Contribute
Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue!

Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/myCoolFeature`)
3. Commit your Changes (`git commit -m 'Add a very cool feature!'`)
4. Push to the Branch (`git push origin feature/myCoolFeature`)
5. Open a Pull Request











<!--  CONFIG FOR README.md   -->

<!-- Repo info Shields -->
[last-commit-shield]: https://img.shields.io/github/last-commit/erikpersson0884/screenit2/main?style=for-the-badge&cacheSeconds=30


[last-commit-url]: https://github.com/erikpersson0884/screenit-v2/commits/main
[repo-size-shield]: https://img.shields.io/github/repo-size/erikpersson0884/screenit2?style=for-the-badge&cacheSeconds=60
[repo-size-url]: https://github.com/erikpersson0884/screenit-v2
[author-shield]: https://img.shields.io/badge/Author-Erik%20Persson-purple?style=for-the-badge
[author-url]: https://github.com/erikpersson0884
[stars-shield]: https://img.shields.io/github/stars/erikpersson0884/screenit-v2?style=for-the-badge
[stars-url]: https://github.com/erikpersson0884/screenit-v2/stargazers
[build-shield]: https://img.shields.io/github/actions/workflow/status/erikpersson0884/screenit2/.github/workflows/tests.yml?branch=main&style=for-the-badge
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

