import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import router from './routes';
import httpContext from 'express-http-context';
import fallback from 'express-history-api-fallback';

const app = express();

app.use(helmet());

app.use(cors());


app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/api/static', express.static(`public/uploads`));

const root = `${__dirname}/public`;

app.use(httpContext.middleware);
app.use((req, res, next) => {
  httpContext.set('request', req);
  next();
});
app.use('/api/v1', router);

app.use(fallback('index.html', { root }));

app.use('*', (req, res) => {
  console.log('ROUTE NOT FOUND');

  if (req.originalUrl.indexOf('api/static') !== -1) {
    return res.redirect(`/api/static/default.png`);
  }
  res.sendStatus(404);
});

export default app;
