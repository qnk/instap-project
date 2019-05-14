# Insatply NodeJS API

  By José Antonio Cuenca

## API structure and information

These are the main techniques of the application:
1. **Authentication/authorization with JWT**
	Used Json Wet Tokne (JWT) for authentication and authorization for users.
	Used the following JWT [online generatior](http://jwtbuilder.jamiekurtz.com/) as reference
2. **Customer queries with Graphql** All requests for a customer are managed under the endpoint `/customers`
3.  **Data schemas**
	In order to accomplish with the requirements to have a basic data schema, it has been used the library `json-schema`, which is inspared on `mongoose` schemas. These schemas are similar to schemas used for `graphql` data.
4. **Login**
  In this case, the `login` endpoint will just get a `user` (a numeric id) and a `password` in the body.  Applying hashing for password is not deployed, so always will pass. Also, the response is hardcoded in this endpoint, but it's usefull for displaying the answer of the login endpoint.  

Thanks to the use of the previous techniques and modularization, the API scales better and it's easier to test and to maintain.

## Endpoints
+ POST to `/login`: To get `authorization_token' as response with a provided user id and a password in the body.
+ POST to `/customers`: To get `Measures` with graphql query:
	+ To get Measures based on clientId and date: Send in the body:
		query: `{ Measure (clientId: 1, date: 123456 )}`
		+ To get Measures history based on a clientId: Send in the body:
		query: `{ Measure (clientId: 1) { values }}`

## Notes about REST APIs spec
Currently, there's not any GET route in the API, which is far from the traditional REST specification.

If we would not use `graphql`, queries to get information should be done with `GET` HTTP verb and using query params. Example for getting a measure based on a day on localhost, the URI could be:
`localhost:3000/api/v1/customers?clientId?1`

## Environment variables
These are the environment variables for the API:
+ SECRET: Secret to decode JWT. Defaults to `'qwertyuiopasdfghjklzxcvbnm123456'`
+ API_VERSION: Api version for URI. Defaults to `v1`
+ PORT: Application port. Defaults to `3000`

In order to improve security and to accomplish with the 12 factor app spec, other necessary environment variables could be `BASE_URL` based on the environment, and also ENV, with possible values: `DEV`, `PROD`.

## JWT structure
JWT for this project includes the user id for simplicity. It is not deployed the creation of a user and the appropiate token based on it id.

An example of a valid token is: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTc3NzQxMDEsImV4cCI6MTU4OTMxMDEwMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXSwiaWQiOiIyIn0.NH1wG_SOqwha5UZys0YjA80M_3uhQoQG_vOWmpacXvg`

This is an example of the previous token decoded:
`{
    "iss": "Online JWT Builder",
    "iat": 1557774101,
    "exp": 1589310101,
    "aud": "www.example.com",
    "sub": "jrocket@example.com",
    "GivenName": "Johnny",
    "Surname": "Rocket",
    "Email": "jrocket@example.com",
    "Role": [
        "Manager",
        "Project Administrator"
    ],
    "id": "2"
}`

### How authentication works with JWT
JWT has information encoded on it and can authenticate a user and even authorizate it because it saves the user role as seen before.
JWT is send in the `Authorization` header.

### Other considerations about JWT
There are a control about valid JWT. For this API, at least the first part must be exatcly 16 charactes long.

## Running steps
Application must be runned on a Windows machine.

These are the **steps to run the API:**
1. Install all dependencies with
`npm install`
2. run application with:
`npm start`

The output for the running application is similar to the following:
`> instaply-api@0.0.0 start C:\Users\Jose\code\instaply\instaply-api`
`> node ./bin/www`
  
## Tests run

Used `jest`as test library.

To run tests, execute the following command_
`npm test`

## Postman collections
Attached Postman collections in file `Instaply.postman_collection.json`

## Error management and status code responses
Error management should be improved and treated as other data, with their own error management service.

For simplicity and following security patters which warns about not giving clues about how the application is designed, return statuses for the application are mainly 200 for success and 401 for many failures.

Traditionally it has being used 404 status code for resource not found, but I've maintained 401 status code as answer for these cases. For the same reason, there are not returning messages with information.

## Pending improvements
+ For simplicity and faster development, data have been tested as a 6 length number and is not an POSIX date standard. Should manage the right values in order to manage real dates on the customer which request the information.
+ There are not async functions (apparting from middlewares managed by Express), due to data is stored on a file.
Include in the `script` method from `package.json` some commands to run depending on the environments. For example, for testing in different environments, could be a `test:dev` script to manage development tests.
+ Currently,  persistent data structure is minimal and should be improved
+  Must work on more tests cases
+ There are other pending functionalities as comments which are marked as `/* TODO */`. In some cases there are some extra expanations.

## Known issues

**Only working on Windows:** Due to a path resolving problem on UNIX systems, the application can't resolve some module dependencies due to a problem with backslashes:

`Error: Cannot find module '/root/instap-project/services/measures\measureForADay.js'`

In spite of the described problem, checked on separated VM that all npm dependencies are donwloaded and installed fine with `npm install`

Based on NodeJS documentation, native `path` module **should fix this problem** with `path.normalize` method, but currently is not working.

Check more details about NodeJS path module in [the official documentation site](https://nodejs.org/api/path.html#path_path_normalize_path)