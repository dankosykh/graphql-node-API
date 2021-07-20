# graphql-node-API

### Installation

1. install dependencies

```bash
npm install
```

2. Set ENV variables

- Using dotenv, set the following variables:

```
PGUSER=<your_pg_username>
PGHOST=localhost
PGPASSWORD=
PGDATABASE=graphql-API
PGPORT=5432
```

- If not using dotenv, set variables in bash:

```bash
export PGUSER=<your_pg_username> \
export PGHOST=localhost \
export PGPORT=5432 \
```

3. Create db if signed in 'to do'

```bash
createdb -h $PGHOST -p $PGPORT -U $PGUSER graphql_API
```

4. Load schema to postgres

```bash
psql -h $PGHOST -d graphql_API -U $PGUSER -p $PGPORT -a -w -f schema.sql
```

### Design Decisions

- Database env variable set for simplicity
- One database created for simplicity. Salt and passwords would be stored on a separate DB.
