import Express from 'express';
import GraphHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import path from 'path';
import Schema from './schema';

const APP_PORT = process.env.PORT || 4000;
const BUILD_FOLDER = '../build';

const app = Express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(Express.static(BUILD_FOLDER));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.end();
  }
  next();
});
app.use('/graphql', GraphHTTP({
  schema: Schema,
  graphiql: true,
  pretty: true,
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, `../${BUILD_FOLDER}/index.html`));
});

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`); // eslint-disable-line no-console
});
