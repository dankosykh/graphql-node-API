# graphql-node-API

### Installation

In bash:

1. install dependencies

```bash
npm install
```

2. Set ENV variables

- Create .env file, set the following:

```
PGUSER=<your_pg_username>
PGHOST=localhost
PGPASSWORD=
PGDATABASE=graphql-API
PGPORT=5432

PGMOCKDATABASE=mock_graphql_API

SECRET=graphql
```

- If not using dotenv, set variables in bash:

```bash
export PGUSER=<your_pg_username> \
export PGHOST=localhost \
export PGPORT=5432 \
export PGMOCKDATABASE=mock_graphql_API \
export SECRET=graphql
```

3. Create db if signed in 'to do'

```bash
createdb -h $PGHOST -p $PGPORT -U $PGUSER graphql_API
```

4. Load schema to postgres

```bash
psql -h $PGHOST -d graphql_API -U $PGUSER -p $PGPORT -a -w -f schema.sql
```

5. Schema contains some sample data that can be queried for.
6. Access the API through GraphQL playground, avaiable at (http://localhost:3000/graphql)
7. Some routes require authentiation. To become authenticated, run this example query:

```graphql
mutation {
  signUp(
    input: { email: "dann@gg.com", password: "apple", username: "NewUser" }
  ) {
    token
  }
}
```

8: Retrieve token. Example below.

```
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5LCJ1c2VybmFtZSI6IlVlciIsImlhdCI6MTYyNjkwMDM3OSwiZXhwIjoxNjI2OTAzOTc5fQ.jin2bk8XaBvRx57VrQlwOCnIhAVnJV0xNizvWS-BWTM"
```

9. Add token to http header in GraphQL playground

```JSON
{ "authorization" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5LCJ1c2VybmFtZSI6IlVlciIsImlhdCI6MTYyNjkwMDM3OSwiZXhwIjoxNjI2OTAzOTc5fQ.jin2bk8XaBvRx57VrQlwOCnIhAVnJV0xNizvWS-BWTM" }
```

10. Free to execute queries. Available queries shown in GrpahQL Playground's "Schema" tab Example below:

```graphql
query {
  user(username: "NewUser") {
    email
    username
    user_id
  }
}
```

### Testing

In bash:

1. Create Mock DB

```bash
createdb -h $PGHOST -p $PGPORT -U $PGUSER mock_graphql_API
```

2. Load schema to postgres

```bash
psql -h $PGHOST -d mock_graphql_API -U $PGUSER -p $PGPORT -a -w -f mockSchema.sql
```

3. Run tests

```bash
npm run test
```

### Design Decisions

##### Code Format

1. Code formatted based on Prettier default settings.

##### Authentication

1. Authenication is done at the resolver level in order not to completely shut down the API.
2. An authentication function is added to each necessary resolver. This could've been done using directives, but since there were only a few auth resolvers, this was the simplest solution.
3. Authentication was done by using json web token. JWT would create and sign a hash token using a username and id along with a secret. This would later be decoded and verified also by JWT. The default expiration is set to 1 hour, but this value may be input directly.
4. Upon signUp, a random salt is added to the password and it is hashed and stored in the database. Upon login, a user's password has the salt readded, hashed, and checked against the stored hash.

##### GraphQL

1. Apollo Server Express was used to act as middleware for the express server.
2. The middleware would catch request headers from express and add to them once authenticated.
3. The API endpoint of '/graphql' is set for developement purposes. It would be changed for production.
4. Type User contains multiple unique and required fields. Unique values could all be used for query purposes.
5. GraphQL-tag was used for its clean structure and graphql syntax.
6. All type definitions were placed in one file. This could and would be broken up for larger projects.
7. All query resolvers require authenication to be able to query the database. Username would be pulled from the context object after the json web token is decoded through a verification and translation funcion. Username would not be avaiable on the context object unless the JWT is decoded.
8. SignUp and signIn resolvers could be removed to a utility library if there were more complexity. Both resolvers generate a new token if a user inputs the correct fileds.

##### Postgres

1. Ideally, passwords and salts would be stored on a diffferent database for added security. Setup for siimplicity.
2. Indexes placed in the schema on most commonly queried fields in the resolvers.
3. Post have a reference to users due to one to many relationship.
4. Models include full CRUD, but not all yet implemented for update and delete.
5. Pool was used since graphQL may make multiple database queries.
6. Schema includes some insertion of data to be able to immediately query, though authentication would be needed. See Installation steps 5 through 10 above.

##### env

1. All necessary enviornemnt variables are run using a .env file. Some variables ommitted for developement and simpliciy.

#### Testing

1. Test suite utilizes a mock database that contains the same schema as the main API database.
2. Models were designed with dependency injection to easily pass in a reference to a database at call time, allowing for an easy way to test with a mock database.
3. Testing suite for resolvers in developement.
