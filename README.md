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

10. Free to execute queries. Example below:

```
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

##### Postgres

1. Ideally, passwords and salts would be stored on a diffferent database for added security. Setup for siimplicity.
2. Indexes placed in the schema on most commonly queried fields in the resolvers.
3. Post have a reference to users due to one to many relationship.
4. Models include full CRUD, but not all yet implemented for update and delete.

##### Authentication

1. Authenication is done at the resolver level in order not to completely shut down the API.

#### Testing

1. Test suite utilizes a mock database that contains the same schema as the main API database.
2. Models were designed with dependency injection to easily pass in a reference to a database at call time, allowing for an easy way to test with a mock database.

- Database env variable set for simplicity
- One database created for simplicity. Salt and passwords would be stored on a separate DB.
