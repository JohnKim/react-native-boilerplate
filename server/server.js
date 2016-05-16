
import path from 'path';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import Parse from 'parse/node';
import {ParseServer} from 'parse-server';
import ParseDashboard from 'parse-dashboard';

const SERVER_PORT = process.env.PORT || 8080;
const SERVER_HOST = process.env.HOST || 'localhost';
const APP_ID = process.env.APP_ID || 's5trippin-mobile';
const MASTER_KEY = process.env.MASTER_KEY || '70c6093dba5a7e55968a1c7ad3dd3e5a74ef5cac';
const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/s5trippin';
const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const DASHBOARD_AUTH = process.env.DASHBOARD_AUTH;

Parse.initialize(APP_ID);
Parse.serverURL = `http://localhost:${SERVER_PORT}/parse`;
Parse.masterKey = MASTER_KEY;
Parse.Cloud.useMasterKey();

function getSchema() {
  if (!IS_DEVELOPMENT) {
    return Schema;
  }

  delete require.cache[require.resolve('./schema/schema.js')];
  return require('./schema/schema.js').Schema;
}

const server = express();

server.use(
  '/parse',
  new ParseServer({
    databaseURI: DATABASE_URI,
    cloud: path.resolve(__dirname, './cloud/index.js'),
    appId: APP_ID,
    masterKey: MASTER_KEY,
    fileKey: 'f33fc1a9-9ba9-4589-95ca-9976c0d52cd5',
    serverURL: `http://${SERVER_HOST}:${SERVER_PORT}/parse`,
  })
);

if (IS_DEVELOPMENT) {
  let users;
  if (DASHBOARD_AUTH) {
    var [user, pass] = DASHBOARD_AUTH.split(':');
    users = [{user, pass}];
    console.log(users);
  }
  server.use(
    '/dashboard',
    ParseDashboard({
      apps: [{
        serverURL: '/parse',
        appId: APP_ID,
        masterKey: MASTER_KEY,
        appName: 'S5-trippin-mobile',
      }],
      users,
    }, IS_DEVELOPMENT),
  );
}

/*
server.use(
  '/graphql',
  graphQLHTTP((request) => {
    return {
      graphiql: IS_DEVELOPMENT,
      pretty: IS_DEVELOPMENT,
      schema: getSchema(),
      rootValue: Math.random(), // TODO: Check credentials, assign user
    };
  })
);
*/

server.use('/', (req, res) => res.redirect('/graphql'));

server.listen(SERVER_PORT, () => console.log(
  `Server is now running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${SERVER_PORT}`
));
