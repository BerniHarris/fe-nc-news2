# NORTHCODERS NEWS UI

A React / Vite / axios project. This is the front end section of a full stack reddit-style / news forum.

## Background

This project is a recreation of the first full stack project I created whilst on my Northcoders bootcamp. It was created during the front-end portion of the course.

I am revisiting the project as I was made redundant and would like to keep and learn new skills in the interim through practice.

The project is created with responsive, mobile first design in mind.

[Original version](https://github.com/BerniHarris/nc-news)

[Recently recreated API](https://github.com/BerniHarris/be-nc-news2)

## .env

Whilst on the bootcamp, we didn't have different testing environments (local, dev, pre-production or prod). As the project is not aiming to be a genuine website, this will be kept, however out of habit and also the possibility of being able to change this in the future I have creaetd a .env file that links to the hosted backend project.

To be able to access the backend, create a file called `.env` in the root directory.

Inside `.env` set the api url to `VITE_API_URL=https://be-nc-news2.onrender.com/api`

An example has been created called `.env-example`.

## Running The Project

To view and run the project locally, use the command `npm run dev`.

This runs on port 5173 and if a window doesn't open automatically, you can view on [http://localhost:5173/](http://localhost:5173/)`

## Testing

Whilst on the bootcamp, testing was done by running the app locally and manually testing. This feels uncomfortable now having used jest / cypress for work and so there will be testing.

As this is a vite / react project, tests will be covered using vitest.

To test, use the command `npm test`.

To testing in watch mode, use the command `npm test -- --watch`.

To view test coverage, use the command `npm run coverage`.
