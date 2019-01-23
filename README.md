# Repertoire

A multi-part project that me and my team at the AUAS created for Repertoire.

## Description of technical functionalities

This repository contains the structure required to create the application for artists themselves. The code for this can be found in the `app` directory.

Not only have we made the application for artists, but we have also made a desktop web-application for the service providers. This platform is created in a way that all the involved groups, be it PROs or publishers, can use this system.
The code for this rests in the `client` directory.

These two products would be nothing, without the other, to get them to communicate together, I created a server, which is an attempt to mock the blockchain network of Repertoire. The code for the server can be found in the `server` directory.

### What works?

Thanks for asking! A lot of the functionalities in both applications work.

#### Application for artists

* Persistent Login system
* User creation system
* Creation of song requests
* Modifying of a song request

#### Web-application for service providers

* Persistent Login system
* User creation system
* Viewing of song requests
* Accepting song requests
* Sending feedback on song requests

### What things are not quite finished yet?

* Design implementation in both the application for artists and the web-app for service providers
* Editing the current logged in user in the web-app
* Viewing and editing the currently logged in user in the mobile application
* Sending feedback on a song request is now done by sending a mail, while this can definately be created better
* User validation (to determine who can execute queries and mutations)

## Main technologies used

* [GraphQL](https://graphql.org/learn/)
* [NodeJS](https://nodejs.org/en/)
* [ParcelJS](https://parceljs.org)
* [PostgreSQL](https://www.postgresql.org)
* [React](https://reactjs.org)
* [Sass](https://sass-lang.com)
* [TypeScript](https://www.typescriptlang.org)

## Installation

Make sure you have Google Chrome installed installed!

* Clone the repository: `git clone git@github.com:Maikxx/repertoire.git`
* Navigate into the directory: `cd repertoire`
* Install dependencies: `yarn` or `npm install`
* Start the server with: `yarn start-server` or `npm run start-server`
* Start the client with: `yarn start-client` or `npm run start-client`
* Start the app with: `yarn start-app` or `npm run start-app`

## Attribution

All of the code written in this repository is created and owned by Maikel van Veen. Copyrights apply.

## License

This repository is licensed as [MIT](LICENSE) by [Maikel van Veen](https://github.com/maikxx).