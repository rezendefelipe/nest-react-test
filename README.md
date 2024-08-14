# Description

Project with Back-End with Nest and Front-end with React and Mantine for UI
<!-- , running Cypress tests on GitHub Actions. -->
- [Nest](https://docs.nestjs.com/)
- [React](https://react.dev/)
- [Mantine](https://mantine.dev/)
- [Vite](https://vitejs.dev/)

## Pre-requirements

To run this project, you will need:

- [git](https://git-scm.com/downloads) (I've used version `2.39.3` while writing this doc)
- [Node.js](https://nodejs.org/en/) (I've used version `v18.20.2` while writing this doc)
- npm (I've used version `10.5.0` while writing this doc)

**Note:** When installing Node.js, npm is automatically installed too.

## Installing and starting the servers and the front-end

## How to run it

After cloning the repo ...

### 1) Starting the backend

Open a terminal, go to the root of this repo and:

```sh
cd api
npm install
npm run start
```

The server will be listening on port 3000. If you need to change this, go to `/api/src/main.ts`
and change the port variable value in the first line.

```ts
app.listen(3000);
```

### 2) Starting the frontend

Open a new terminal, go to the root of this repo and:

**Important:** if you changed the backend port number, you will have to change it also on 
`/app/src/shared/constants/urls.ts`, before starting the frontend.

```sh
cd app
npm install
npm run dev
```

Go to a web browser and open `http://localhost:5173/`.

<!-- ## Tests

Run `npm run test:frontend:unit` to run the frontend unit tests.

Run `npm run test:api:with:servers` to run the API tests.

> **Note:** These scripts starts the required servers before-hand, and shuts them down when tests finish running.

Run `npm run test:frontend:with:server` to run the UI tests in headless mode.

> **Note 2:** This script starts the frontend server before-hand, and shuts it down when tests finish running.
>
> **Note 3:** When running in headless mode, if tests fail, Cypress automatically saves screenshots of the failures at `cypress/screenshots/`.

### Interactive mode

1. Run `npm run cy:open:with:servers` to open the Cypress Test Runner to run tests in interactive mode.

> **Note 4:** This script starts the required servers before-hand, and shuts them down after the runner is closed.

2. With the test runner opened, click on the test file you want to test.

___ -->