# Artemis API

Artemis is a simple project managment tool that I am working on. The idea is for it to be a simple entry point for all kinds of projects. It will allow you to add projects, categorise them as you'd like, take notes, add todos and link to other tools. The need for this arose out of my working on many projects, diverse in nature, with no sustainable way to keep track of them.

## Installation

The API is built with NodeJS, MongoDB and Graphql. To get it running, you'll need a Mongo database (local or remote) and npm. 

+ Run `npm install`
+ Create a `config.js` file in the root directory (using `config.example.js` as a template) and enter your MongoDB connection url.
+ Run `npm run seed:up` - This is still a work in progress, but for now it does some basic validation on collections
+ Run `npm run watch`

To create a user, send a post request to `/register`, with fields `firstname`, `lastname`, `email` and `password`. I recommend [Postman](https://www.getpostman.com/). This will give you a token, which you will use with your GraphQL requests.

To login, send a post request to `/login` with fields `email` and `password`. This will also return a token.
