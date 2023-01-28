# Wikachu API

REST API for [Wikachu APP](https://github.com/Mayko2003/wikachu-frontend).

## Technologies

This project use ExpressJS for server and MongoDB for database.

## Instalation

First you need to install all dependencies

```
   npm i
```

Then you need to initialize your .env file so you can guide with env.example file.

If you don't have firebase credentials, first you need to create a firebase project [Firebase](https://console.firebase.google.com/). Then you can read the following documentation for generate a private key file, [Initialize the SDK in non-Google environments](https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments)

## Setup database

We provide two scripts to fill database, they are initData.js and initdb.js which are located in utils folder.

First you need to create a data folder in root folder.

```
mkdir data
```

Then you need to obtain data from [Pokemon API](https://pokeapi.co/), so you need to run initData.js:

```
node ./utils/initData.js
```

Finally you can run initdb.js for fill your database.

```
node ./utils/initdb.js
```

NOTE: the commands are used if you are in the root folder, otherwise be sure to change the path
