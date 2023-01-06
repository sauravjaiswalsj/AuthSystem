# Authentication System Design

## Overview

An authentication system build using express js consists of a user login and register system. The user register to the application for the first time. Their information is captured and stored in the db. User information sucn as password is encrypted and then store. When the user login's next time with the credentials that cred is verified and if successful, the user will be redirected to the dashboard of the application.

## Architecture

![Auth App Architecture](https://user-images.githubusercontent.com/25124428/210890847-5aff3a54-21b7-4a73-afea-271e4e04003b.jpeg)

### Tech spec

1. Expressjs
2. Nodejs
3. Sqlite
4. sequlize
5. nodemailer API

### Solution

- [x] Create a register API for the user to register to the application.
- [x] User information is validated like email and password.
- [x] User password is verified and then stored in the sql db.
- [x] Create a Login API for the user to login to the application.
- [x] User information for the login is verified to check if the provided password is correct or not.
- [x] If information provided is correct then user can login to the application.
- [x] Created forgot user password system.
- [x] When user hits forgot password, email has been sent to user to reset the password.

#### Add Session Layer

1. Add Token based authentication.
2. Add login use google and facebook.
