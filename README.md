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

## Tests BE

Run:

```sh
cd api
npm install
npm run test:cov
```

## Tests FE E2E

> **Note 2:** This script needs to BE and FE servers up and runing.

Run:

```sh
cd app
npm install
npm run cy:run
```
___