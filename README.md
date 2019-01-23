# Repertoire

A multi-part project that me and my team at the AUAS created for Repertoire.

## Description of technical functionalities

This repository contains the structure required to create the application for artists themselves. The code for this can be found in the `app` directory.

Not only have we created the application for artists, but we have also created a desktop web-application for the service providers. This platform is set up in a way that all the involved groups, be it PROs or publishers, can use this system.
The code for this rests in the `client` directory.

These two products would be nothing, without the other, to get them to communicate together, I created a server, which is an attempt to mock the blockchain network of Repertoire. The code for the server can be found in the `server` directory.

### What works?

Thanks for asking! A lot of the functionalities in both applications work.

#### Application for artists

* Persistent login system.
* User creation system.
* Creation of song requests.
* Modifying of a song request.

#### Web-application for service providers

* Persistent login system.
* User creation system.
* Viewing of song requests.
* Accepting song requests.
* Sending feedback on song requests.

### What things are not quite finished yet?

Since we only had 5 weeks to set up this project, and I am not a robot, some things unfortunately did not get finished.
That is no problem, since this is only a prototype of the eventual system, but for transparancy purposes here is a list of functionalities that would need to be finished in order for the system to be fully operatable.

* Design implementation in both the application for artists and the web-app for service providers, this includes things like filtering and sorting the song requests.
* Editing the currently logged in user in the web-app.
* Viewing and editing the currently logged in user in the mobile application.
* Sending feedback on a song request is now done by sending a mail, while this would eventually be done by filling out a form on the desktop application itself.
* User validation (to determine who can execute queries and mutations, and which data applies to them, which would cause them to see only things related to them).
* Accurate new user sign up. While it is now possible to create users, in reality the artists that are going to use the system should get an invite from Repertoire.
* Production application is set up on Heroku (server & database), while the two applications are hosted on Netlify. This wouldn't be a problem if the servers were to be paid, resulting in full up-time and a reliable speed, which is not the case at the moment.

## Main technologies used

* [Heroku](https://www.heroku.com).
* [GraphQL](https://graphql.org/learn/).
* [Netlify](https://www.netlify.com).
* [NodeJS](https://nodejs.org/en/).
* [ParcelJS](https://parceljs.org).
* [PostgreSQL](https://www.postgresql.org).
* [React](https://reactjs.org).
* [Sass](https://sass-lang.com).
* [TypeScript](https://www.typescriptlang.org).

## Installation

Make sure you have Google Chrome installed!

* Clone the repository: `git clone git@github.com:Maikxx/repertoire.git`.
* Navigate into the directory: `cd repertoire`.
* Install dependencies: `yarn` or `npm install`.
* Start the server with: `yarn start-server` or `npm run start-server`.
* Start the client with: `yarn start-client` or `npm run start-client`.
* Start the app with: `yarn start-app` or `npm run start-app`.

## Attribution

All of the code written in this repository is created and owned by [Maikel van Veen](https://github.com/maikxx).
Copyrights do apply!

* The logos are created by Repertoire.
* Some icons origin from [flaticon](Flaticon.com), however, most icons are designed and created by Mirre Kerssenberg.

## License

This repository is licensed as [MIT](LICENSE) by [Maikel van Veen](https://github.com/maikxx).