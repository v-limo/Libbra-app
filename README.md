# [Library application](https://libbra-frontend.onrender.com/)

# Description

Fullstack platform built with Reactjs, Express, MongoDB & Reduxtoolkit. This app includes authentication, books, bookings, and many more features. Users can view books, log in with google, and login user can borrow, deleted, and update their own profiles.

ps. this project is a solution to intergrify fullstack assignment

## Features

- Users can;

  - log in with google
  - view and borrow books
  - update and or delete their own accounts
  - return borrowed books
  - logout profiles

- Admins can;
  - delete and add books
  - update books
  - delete and or update users
  - delete, update or add authors
- and more...

<br>
<br>

<p align="center">

## Live demo

//image here
<img align>

- ### [api](https://libbra-finnaly.onrender.com/api/v1/books)
  A live demo of the app is hosted on Heroku.

_Due to demo reasons and Heroku free terms, if an app receives no web traffic in a 30-minute period, it will sleep. Therefore, during the first launch, the application may take longer to load than usual, approximately 15 - 20 seconds. So please be patient and wait for the app to launch. Subsequent launches will be relatively fast._

- ### [client](https://libbra.netlify.app/)

_Live demo of the client is hosted on netlify_

## Technology stack

> ### FrontEnd
>
> - React
> - React Hooks
> - React router
> - Redux Toolkit
> - Mui
> - TypeScript
>   <br>

> ### Backend
>
> - Node
> - Express
> - JWT
> - MongoDB with mongoose
> - Heroku hosting
>   <br>

## Usage

Clone this repository to the desired location

```Shell
git clone https://github.com/v-limo/libbra-app.git
```

<br>

### Env Variables

Create a .env file in the api root and add the following

```
NODE_ENV = development
PORT = 5000
SECRET_KEY = your secret key
MONGO_URI = your mongodb uri
CLIENT_ID = your google client id
CLIENT_SECRET =  your google client secret

```

cd to client, create a `.env` file in the root

```
cd client
```

cd to api, create a `.env` file in the root

```
cd api
```

and add the following

```

REACT_APP_API_KEY = google api key
REACT_APP_API_GOOGLE_CLIENT_ID = google client id
REACT_APP_CLIENT_ID=  google client id

```

### Install Dependencies (client & Api)

```
npm install
cd client
npm install

```

### Run

```
# Run Api (:5000)
cd api
npm run start:dev
```

```
# Run client
cd client
npm start
```

## Build & Deploy

```
# Create client prod build
cd client
npm run build
```

### Contributing

Contributions are highly appreciated. In general, I follow the "fork-and-pull" Git workflow.

1. **Fork** this repo
2. **Clone** the project to your own machine
3. **Commit** changes to your own branch
4. **Push** your work back up to your fork
5. **Submit** a Pull request so that I can review your changes

**NOTE:** Be sure to merge the latest from "upstream" before making a pull request!

### License

MIT license
