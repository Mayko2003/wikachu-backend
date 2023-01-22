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

## Setup database

We are not provide seeders and migrations so you nedd to execute initData.js script which is in utils folder:

```
node ./utils/initData.js
```

Then if you want to poblate your database you need to set the IS_INIT_DB environment var to false, this run initDb.js when start the server so you only need to run it the first time.

In the future we hope that more functionalities will be incorporated so we avoid a lot of configuration
