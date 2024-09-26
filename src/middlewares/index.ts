import bodyParser from 'body-parser';
import express from 'express';
import { corsObj } from './cors';
import cookieParser from 'cookie-parser';

class Middlewares {

   
   public init(app: express.Application) {

      // Eanble CORS support
      corsObj.init(app);

      // Enable request body parsing
      app.use(
         bodyParser.json({
            limit: '20mb'
         })
      );

      app.use(cookieParser());

   }
}

export const middlewares = new Middlewares();
