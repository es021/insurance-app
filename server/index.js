const connect = require("connect");
const query = require("qs-middleware");
const ApiBuilder = require("./lib/ApiBuilder");
const { jwtAuthentication } = require("./lib/Authentication");
const DB = require("./lib/DB");
const bodyParser = require('body-parser');

const PORT = "4040";
const GRAPHQL_PATH = "/graphql";

const DATABASE_NAME = "insurance_app";

// only column of type string or text is allowed
const ANY_QUERY_MATCHING = {
  client: ["first_name", "last_name", "email"]
}

const ATTR_FOREIGN = {
  client: {
    agent: {
      table: "agent",
      getArgs: (d) => {
        return { ID: d.agent_id }
      }
    }
  },

  // self_table: {
  //   entity_created_in_query: {
  //     table: "foreign_table",
  //     getArgs: (d) => {
  //       return { foreign_table_column: d["self_table_column"] }
  //     }
  //   }
  // },
}

var app = connect();
app.use(query());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(jwtAuthentication({
  PORT: PORT,
  GRAPHQL_PATH: GRAPHQL_PATH
}));

const db = new DB("DEV", DATABASE_NAME);
const apiBuilder = new ApiBuilder({
  db: db,
  databaseName: DATABASE_NAME,
  additionalAttrForeign: ATTR_FOREIGN,
  anyQueryMatching: ANY_QUERY_MATCHING,
  finishHandler: (server) => {
    server.applyMiddleware({ app, GRAPHQL_PATH });
    app.listen({ port: PORT }, () =>
      console.log(
        `Server ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    );
  }
});
apiBuilder.init();


